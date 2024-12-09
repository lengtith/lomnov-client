import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_ENDPOINTS } from './const/api-endpoints';
interface FailedRequests {
  resolve: (value: AxiosResponse) => void;
  reject: (value: AxiosError) => void;
  config: AxiosRequestConfig;
  error: AxiosError;
}
// A flag indicating if the token is being refreshed
let isTokenRefreshing = false;
let failedRequestsQueue: FailedRequests[] = [];
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // http://localhost:4000
  withCredentials: true, // Include cookies in the request
});

const isServer = typeof window === 'undefined';

async function getServerCookies(): Promise<string | undefined> {
  if (isServer) {
    const { cookies } = (await import("next/headers"));
    // console.log(cookies);

    const cookieStore = cookies();
    return cookieStore.getAll().map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
  }
  return undefined; // On the client side, cookies are automatically sent
}

async function refreshToken(): Promise<{ accessToken: string; idToken: string }> {
  try {
    const headers = isServer ? { Cookie: await getServerCookies() } : {};

    const response = await axiosInstance.post(
      `${API_ENDPOINTS.REFRESH_TOKEN}`, null, {
      withCredentials: true,
      headers,
    }
    );

    // console.log('response::: ', response.data)

    const { accessToken, idToken } = extractTokensFromResponse(response);
    return { accessToken, idToken };

  } catch (error) {
    // console.error("Error refreshing token:", error);
    throw error;
  }
}
function extractTokensFromResponse(response: AxiosResponse): { accessToken: string; idToken: string } {
  let accessToken = '';
  let idToken = '';

  const setCookieHeaders = response.headers['set-cookie'];
  if (setCookieHeaders) {
    setCookieHeaders.forEach((cookie) => {
      const [cookieName, cookieValue] = cookie.split(';')[0].split('=');
      if (cookieName === 'accessToken') {
        accessToken = cookieValue;
      } else if (cookieName === 'idToken') {
        idToken = cookieValue;
      }
    });
  }

  return { accessToken, idToken };
}


// TODO: handle axios interceptors for refresh token
// STEP 1: Intercept the response and check if 401, the request hasn't been retried yet, handle the refresh token
// STEP 1.1: If the token is being refreshed, add the failed request to the queue
// STEP 1.2: If the token is not being refreshed, made refresh token
// STEP 1.3: Retry the original request with the new tokens included in headers
// STEP 1.4: If the refresh token fails, reject all the failed requests
axiosInstance.interceptors.response.use(
  (response) => response,
  async function (error) {
    // console.log(error);
    
    const { response, config: originalRequest } = error;
    // console.log('2.:::', response)
    const status = response?.status;
    // console.log('1.:::', status)
    // 1.
    if (status === 401 && !originalRequest._retry) {
      // 1.1
      if (isTokenRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject, config: originalRequest, error });
        });
      }

      // 1.2
      originalRequest._retry = true;
      isTokenRefreshing = true;

      try {
        const { accessToken, idToken } = await refreshToken();

        // 1.3
        const newConfig = {
          ...originalRequest,
          withCredentials: true,
          headers: {
            ...originalRequest.headers,
            ...(isServer ? { Cookie: `${await getServerCookies()}; accessToken=${accessToken}; idToken=${idToken}` } : {}),
          },
        };

        failedRequestsQueue.forEach(({ resolve, reject, config }) => {
          axiosInstance({ ...config, headers: newConfig.headers })
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        });

        return axiosInstance(newConfig);

      } catch (error) {
        // 1.4
        failedRequestsQueue.forEach(({ reject, error }) => reject(error));
        return Promise.reject(error);

      } finally {
        isTokenRefreshing = false;
        failedRequestsQueue = [];
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;


// ref: https://blog.stackademic.com/refresh-access-token-with-axios-interceptors-in-react-js-with-typescript-bd7a2d035562