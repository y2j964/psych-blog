const getElAbsolutePosition = (el) => {
  const rect = el.getBoundingClientRect();
  const verticalPosition = rect.top + window.scrollY;
  const horizontalPosition = rect.left + window.scrollX;
  return [horizontalPosition, verticalPosition];
};

export default getElAbsolutePosition;
