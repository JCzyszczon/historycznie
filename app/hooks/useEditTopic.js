export const useEditTopic = () => {
  const editTopic = async ({ id, title, description }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/topics/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      }
    );

    if (!response.ok) {
      throw new Error("Nie udało się zaktualizować tematu.");
    }

    return response.json();
  };

  return { editTopic };
};
