import useSWR, { mutate } from "swr";

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Nie udało się pobrać danych.");
    }
    return res.json();
  });

export function useNotifications(userId) {
  const { data, error, isLoading, mutate } = useSWR(
    userId
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications/${userId}`
      : null,
    fetcher,
    {
      refreshInterval: 5000,
      dedupingInterval: 4000,
    }
  );

  const markAllAsRead = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications/mark-all-read/${userId}`,
        {
          method: "PUT",
        }
      );
      mutate();
    } catch (error) {
      console.error("Error updating notifications:", error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications/mark-read/${notificationId}`,
        {
          method: "PUT",
        }
      );
      mutate();
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  return {
    notifications: data,
    isLoading,
    isError: error,
    markAllAsRead,
    markAsRead,
    mutate,
  };
}
