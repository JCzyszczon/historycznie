import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const useGetLesson = (lessonId) => {
  const { data, error, mutate } = useSWR(
    lessonId
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lessons/${lessonId}`
      : null,
    fetcher
  );

  return {
    lesson: data,
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
};
