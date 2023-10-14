export const capitalizeString = (s: string) => {
  const firstLetter = s[0];
  const stringWithoutFirstLetter = s.slice(1, s.length);

  return `${firstLetter.toUpperCase()}${stringWithoutFirstLetter}`;
};
