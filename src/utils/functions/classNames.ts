export const classNames = (classes: Record<string, boolean | undefined | null>): string => {
  return Object.entries(classes)
    .filter(([, value]) => Boolean(value))
    .map(([key]) => key)
    .join(" ");
};
