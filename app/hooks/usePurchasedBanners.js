import useSWR from "swr";

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Nie udało się pobrać danych.");
    }
    return res.json();
  });

export function usePurchasedBanners(userId) {
  const { data, error, isLoading, mutate } = useSWR(
    userId
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}/purchased-banners`
      : null,
    fetcher
  );

  return {
    banners: data,
    isLoading,
    isError: error,
    mutate,
  };
}
