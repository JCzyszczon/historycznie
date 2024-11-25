import useSWR from "swr";

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Nie udało się pobrać danych.");
    }
    return res.json();
  });

export function useUserPoints(userId) {
  const { data, error, isLoading, mutate } = useSWR(
    userId
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}/points`
      : null,
    fetcher,
    {
      refreshInterval: 5000,
      dedupingInterval: 4000,
    }
  );

  return {
    points: data?.points,
    isLoading,
    isError: error,
    mutate,
  };
}
