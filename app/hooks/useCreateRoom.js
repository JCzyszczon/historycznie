export function useCreateRoom() {
  const createRoom = async ({
    name,
    hostId,
    gameMode,
    questionsCount,
    category,
    password,
  }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/rooms/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            hostId,
            gameMode,
            questionsCount,
            category,
            password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Nie udało się utworzyć pokoju.");
      }

      return result;
    } catch (error) {
      throw error;
    }
  };

  return { createRoom };
}
