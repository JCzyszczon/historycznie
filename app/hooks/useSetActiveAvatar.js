export function useSetActiveAvatar(userId, mutateUser) {
  const setActiveAvatar = async (avatarId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}/active-avatar`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ avatarId }),
        }
      );

      if (!response.ok) {
        throw new Error("Nie udało się ustawić aktywnego avatara.");
      }

      const data = await response.json();
      if (mutateUser) {
        mutateUser(
          (user) => ({
            ...user,
            activeAvatar: data.activeAvatar,
          }),
          false
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { setActiveAvatar };
}
