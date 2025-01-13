export function useCreateLesson() {
  const createLesson = async ({ title, description, eraId }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lessons/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            eraId,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Nie udało się utworzyć lekcji.");
      }

      return result;
    } catch (error) {
      throw error;
    }
  };

  return { createLesson };
}
