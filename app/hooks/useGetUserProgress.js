import useSWR from "swr";

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Nie udało się pobrać danych.");
    }
    return res.json();
  });

export function useGetErasContent(eraId, userId) {
  const { data, error, isLoading, mutate } = useSWR(
    eraId && userId
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/eras/${eraId}/progress?userId=${userId}`
      : null,
    fetcher
  );

  return {
    progress: data,
    isLoading,
    isError: error,
    mutate,
  };
}
