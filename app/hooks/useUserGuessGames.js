import useSWR from "swr";

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Nie udało się pobrać danych.");
    }
    return res.json();
  });

export function useUserGuessGames(userId) {
  const { data, error, isLoading, mutate } = useSWR(
    userId
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/guess-who-games/results?userId=${userId}`
      : null,
    fetcher
  );

  return {
    gameResults: data,
    isLoading,
    isError: error,
    mutate,
  };
}
