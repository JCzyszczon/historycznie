export function useSetTopicTestResult() {
  const setTopicTestResult = async (userId, topicId, userAnswers) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/topic-results`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, topicId, userAnswers }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Nie udało się zapisać wyniku testu.");
      }

      return result;
    } catch (error) {
      throw error;
    }
  };

  return { setTopicTestResult };
}
