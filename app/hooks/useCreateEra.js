export function useCreateEra() {
  const createEra = async ({ title, description, imageUrl }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/eras/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Nie udało się utworzyć ery.");
      }

      return result;
    } catch (error) {
      throw error;
    }
  };

  return { createEra };
}
