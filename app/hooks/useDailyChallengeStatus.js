import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export function useDailyChallengeStatus(userId) {
  const { data, error } = useSWR(
    () =>
      userId
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/daily-challenges/status?userId=${userId}`
        : null,
    fetcher
  );

  return {
    streak: data?.streak,
    challengeUnlocked: data?.challengeUnlocked,
    nextAvailableChallenge: data?.nextAvailableChallenge,
    isLoading: !data && !error,
    isError: error,
  };
}
