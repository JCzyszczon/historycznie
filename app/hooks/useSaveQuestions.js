export function useSaveQuestions() {
  const saveQuestions = async (topicId, questions) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/topics/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ topicId, questions }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Nie udało się zapisać pytań.");
      }

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { saveQuestions };
}
