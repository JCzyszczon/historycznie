export function useGuessWhoFinish() {
  const finishGuessWhoGame = async (gameId, userId, remainingLives) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/guess-who-games/finish`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gameId, userId, remainingLives }),
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

  return { finishGuessWhoGame };
}
