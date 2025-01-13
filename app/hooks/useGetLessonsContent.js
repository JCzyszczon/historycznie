import useSWR from "swr";

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Nie udało się pobrać danych.");
    }
    return res.json();
  });

export function useGetLessonsContent(lessonId) {
  const { data, error, isLoading, mutate } = useSWR(
    lessonId
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lessons/${lessonId}/content`
      : null,
    fetcher
  );

  return {
    content: data,
    isLoading,
    isError: error,
    mutate,
  };
}
