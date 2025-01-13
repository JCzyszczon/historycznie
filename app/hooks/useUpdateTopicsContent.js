export function useUpdateTopicsContent() {
  const updateContent = async (topicId, newContent) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/topics/${topicId}/content`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContent),
      }
    );

    if (!response.ok) {
      throw new Error("Nie udało się zaktualizować zawartości.");
    }

    return response.json();
  };

  return { updateContent };
}
