/*import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/user";

const withAuthRedirect = (Component: React.ComponentType) => {
  return (props: any) => {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (isAuthenticated || user) {
        router.push("/"); // Redirect to home if already logged in
      }
    }, [isAuthenticated, user, router]);

    return !isAuthenticated && !user ? <Component {...props} /> : null;
  };
};

export default withAuthRedirect;
*/
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/user";

const withAuthRedirect = (Component: React.ComponentType) => {
  const WrapperComponent = (props: any) => {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (isAuthenticated || user) {
        router.push("/"); // Redirect to home if already logged in
      }
    }, [isAuthenticated, user, router]);

    return !isAuthenticated && !user ? <Component {...props} /> : null;
  };

  // Set display name for the HOC
  WrapperComponent.displayName = `withAuthRedirect(${Component.displayName || Component.name || "Component"})`;

  return WrapperComponent;
};

export default withAuthRedirect;
