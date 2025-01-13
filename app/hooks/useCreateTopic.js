export function useCreateTopic() {
  const createTopic = async ({ title, description, lessonId }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/topics/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            lessonId,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Nie udało się utworzyć tematu.");
      }

      return result;
    } catch (error) {
      throw error;
    }
  };

  return { createTopic };
}
