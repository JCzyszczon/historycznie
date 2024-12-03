export function useUpdateUser() {
  const updateUser = async (userId, updatedData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Nie udało się zaktualizować danych użytkownika."
        );
      }

      return result;
    } catch (error) {
      throw error;
    }
  };

  return { updateUser };
}
