export function usePurchaseBanner() {
  const purchaseBanner = async (userId, bannerId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/banners/purchase`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, bannerId }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Nie udało się kupić baneru.");
      }

      return result;
    } catch (error) {
      throw error;
    }
  };

  return { purchaseBanner };
}
