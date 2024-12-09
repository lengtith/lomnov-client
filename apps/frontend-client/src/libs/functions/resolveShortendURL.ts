export async function resolveShortenedUrl(url: string): Promise<string | null> {
    try {
        const response = await fetch(`https://your-backend-api/resolve-url`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
        });
        const data = await response.json();
        return data.fullUrl || null;
    } catch (error) {
        console.error('Error resolving shortened URL:', error);
        return null;
    }
}
