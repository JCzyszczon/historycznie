export const useEditLesson = () => {
  const editLesson = async ({ id, title, description }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lessons/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      }
    );

    if (!response.ok) {
      throw new Error("Nie udało się zaktualizować lekcji.");
    }

    return response.json();
  };

  return { editLesson };
};
