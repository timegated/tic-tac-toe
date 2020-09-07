export const playersFactory = (name, marker, type) => {
  const display = document.getElementById(marker);
  display.textContent = name;

  const getName = () => name;
  const getMarker = () => marker;
  const isHuman = () => type;

  const toggleActiveStyle = () => {
    display.classList.toggle('turn');
  };

  const removeActiveStyle = () => {
    display.classList.remove('turn');
  };

  return {
    getName,
    getMarker,
    isHuman,
    toggleActiveStyle,
    removeActiveStyle
  };
};