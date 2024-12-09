export const formatDate = (dateString?: string): string => {
    if (!dateString) return "Unknown date"; // Fallback for undefined
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };