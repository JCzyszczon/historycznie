export function useRemoveActiveBadge(mutateActiveBadges) {
  const removeActiveBadge = async (userId, badgeId) => {
    if (!userId || !badgeId) {
      throw new Error("Nie podano wymaganych danych.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/active-badges`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, badgeId }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Nie udało się usunąć odznaki.");
    }

    mutateActiveBadges();
    return response.json();
  };

  return { removeActiveBadge };
}
