export function useRoomPassword() {
  const joinRoom = async (password, roomId) => {
    try {
      const passwordToSend = password?.trim() ? password : null;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/rooms/join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: passwordToSend, roomId }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Nie udało się dołączyć do pokoju.");
      }

      return result;
    } catch (error) {
      throw error;
    }
  };

  return { joinRoom };
}
