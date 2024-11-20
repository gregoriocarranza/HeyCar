export const Capitalize = (text) => {
  if (!text) return ""; // Manejo de cadenas nulas o vacías
  return text.charAt(0).toUpperCase() + text.slice(1);
};
