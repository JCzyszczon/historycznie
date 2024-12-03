export function usePurchaseBadge() {
  const purchaseBadge = async (userId, badgeId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/badges/purchase`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, badgeId }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Nie udało się kupić odznaki.");
      }

      return result;
    } catch (error) {
      throw error;
    }
  };

  return { purchaseBadge };
}
