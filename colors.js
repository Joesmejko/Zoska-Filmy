function changeColor(color) {
  // Set the CSS variable in the root element to the color input
  document.documentElement.style.setProperty('--blue', color);

  // Store the color value in local storage to persist across all pages
  sessionStorage.setItem('blueColor', color);
}

// Check if a color is stored in local storage and set it as the CSS variable
const storedColor = sessionStorage.getItem('blueColor');
if (storedColor) {
  document.documentElement.style.setProperty('--blue', storedColor);
}