export function useSetActiveBanner(userId, mutateUser) {
  const setActiveBanner = async (bannerId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}/active-banner`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bannerId }),
        }
      );

      if (!response.ok) {
        throw new Error("Nie udało się ustawić aktywnego banera.");
      }

      const data = await response.json();
      if (mutateUser) {
        mutateUser(
          (user) => ({
            ...user,
            activeBanner: data.activeBanner,
          }),
          false
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { setActiveBanner };
}
