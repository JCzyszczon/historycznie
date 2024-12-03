import useSWR from "swr";

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Nie udało się pobrać danych.");
    }
    return res.json();
  });

export function useUserBadges(userId) {
  const { data, error, isLoading, mutate } = useSWR(
    userId
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/badges?userId=${userId}`
      : null,
    fetcher
  );

  return {
    badges: data?.badges || [],
    isLoading,
    isError: error,
    mutate,
  };
}
