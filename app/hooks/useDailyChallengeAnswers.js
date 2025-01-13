import { useCallback } from "react";

export function useDailyChallengeAnswers() {
  const saveAnswersBeforeUnload = useCallback(async (userId, answers) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/daily-challenges/answers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            answers,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Nie udało się zapisać odpowiedzi.");
      }

      return result;
    } catch (error) {
      console.error("Błąd podczas zapisywania odpowiedzi:", error);
    }
  }, []);

  return { saveAnswersBeforeUnload };
}
