import useSWR from "swr";

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Nie udało się pobrać danych.");
    }
    return res.json();
  });

export function useAchievements(userId, limit) {
  const { data, error, isLoading, mutate } = useSWR(
    userId
      ? `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/achievements?userId=${userId}${limit ? `&limit=${limit}` : ""}`
      : null,
    fetcher
  );

  return {
    achievements: data,
    isLoading,
    isError: error,
    mutate,
  };
}
