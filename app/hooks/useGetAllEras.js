import useSWR from "swr";

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Nie udało się pobrać danych.");
    }
    return res.json();
  });

export function useGetAllEras() {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/eras`,
    fetcher
  );

  return {
    eras: data,
    isLoading,
    isError: error,
    mutate,
  };
}
