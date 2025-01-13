export function useGenerateAIQuestions() {
  const generateQuestions = async (topicId, htmlContent) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/generate-questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ topicId, htmlContent }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Nie udało się wygenerować pytań.");
      }

      return result.questions;
    } catch (error) {
      throw error;
    }
  };

  return { generateQuestions };
}
