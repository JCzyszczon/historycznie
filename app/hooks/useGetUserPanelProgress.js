import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }
  return response.json();
};

export const useGetUserPanelProgress = (userId) => {
  const { data, error, mutate } = useSWR(
    userId
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/eras/progress/${userId}`
      : null,
    fetcher
  );

  return {
    progress: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
