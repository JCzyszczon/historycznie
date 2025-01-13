import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

export const useCheckTopicResult = (topicId, userId) => {
  const { data, error } = useSWR(
    topicId && userId
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/topic-results/${topicId}/${userId}`
      : null,
    fetcher
  );

  return {
    isPassed: data?.isPassed,
    isLoading: !data && !error,
    isError: error,
  };
};
