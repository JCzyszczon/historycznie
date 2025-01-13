import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export function useDailyChallengeQuestions() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/daily-challenges/questions`,
    fetcher
  );
  return {
    questions: data?.questions,
    isLoading: !data && !error,
    isError: error,
  };
}
