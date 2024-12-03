export function useSetActiveBadge(mutateActiveBadges) {
  const setActiveBadge = async (userId, badgeId) => {
    if (!userId || !badgeId) {
      throw new Error("Nie podano wymaganych danych.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/active-badges`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, badgeId }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Nie udało się dodać odznaki.");
    }

    if (mutateActiveBadges) {
      mutateActiveBadges();
    }

    return response.json();
  };

  return { setActiveBadge };
}
