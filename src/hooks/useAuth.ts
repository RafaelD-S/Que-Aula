export function useAuth() {
  const token = localStorage.getItem("SelectedClasses");
  const hasSavedClasses = Boolean(token);

  return {
    hasSavedClasses,
    token,
  };
}
