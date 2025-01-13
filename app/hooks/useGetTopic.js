import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const useGetTopic = (topicId) => {
  const { data, error, mutate } = useSWR(
    topicId
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/topics/${topicId}`
      : null,
    fetcher
  );

  return {
    topic: data,
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
};
