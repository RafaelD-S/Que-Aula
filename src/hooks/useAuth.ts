export function useAuth() {
  const token = localStorage.getItem("chosenClasses");
  const hasSavedClasses = Boolean(token);

  return {
    hasSavedClasses,
    token,
  };
}
