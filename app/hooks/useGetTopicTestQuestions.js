import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }
  return response.json();
};

function useGetTopicTestQuestions(topicId) {
  const { data, error, isLoading } = useSWR(
    topicId
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/topics/${topicId}/testQuestions`
      : null,
    fetcher
  );

  return {
    questions: data,
    isLoading,
    isError: error,
  };
}

export default useGetTopicTestQuestions;
