export function usePurchaseAvatar() {
  const purchaseAvatar = async (userId, avatarId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/avatars/purchase`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, avatarId }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Nie udało się kupić awatara.");
      }

      return result;
    } catch (error) {
      throw error;
    }
  };

  return { purchaseAvatar };
}
