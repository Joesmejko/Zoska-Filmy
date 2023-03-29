function changeColor(color) {
  // Set the CSS variable in the root element to the color input
  document.documentElement.style.setProperty('--blue', color);

  // Store the color value in local storage to persist after refresh
  window.localStorage.setItem('blueColor', color);
  const storedColor = window.localStorage.getItem('blueColor');
}

// Check if a color is stored in local storage and set it as the CSS variable
const storedColor = window.localStorage.getItem('blueColor');
if (storedColor) {
  document.documentElement.style.setProperty('--blue', storedColor);
}