export function useGuessWhoStart() {
  const startGuessWhoGame = async (userId, category) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/guess-who-games/start`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, category }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Nie udało się wystartować gry.");
      }

      return result;
    } catch (error) {
      throw error;
    }
  };

  return { startGuessWhoGame };
}
