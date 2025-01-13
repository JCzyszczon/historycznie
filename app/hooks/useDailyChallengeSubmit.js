export function useSubmitChallenge() {
  const submitChallenge = async (userId, answers) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/daily-challenges/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, answers }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Nie udało się przesłać odpowiedzi.");
      }

      return result;
    } catch (error) {
      throw error;
    }
  };

  return { submitChallenge };
}
