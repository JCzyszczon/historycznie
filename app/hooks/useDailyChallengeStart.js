export function useDailyChallengeStart() {
  const startChallenge = async (userId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/daily-challenges/start`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Nie udało się rozpocząć wyzwania.");
      }

      return result;
    } catch (error) {
      console.error("Błąd w funkcji startChallenge:", error.message);
      throw error;
    }
  };

  return { startChallenge };
}
