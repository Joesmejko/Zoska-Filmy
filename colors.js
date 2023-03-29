function changeColor(color) {
  // Set the CSS variable in the root element to the color input
  document.documentElement.style.setProperty('--blue', color);
  window.sessionStorage.setItem('blueColor', color);
  const storedColor = window.sessionStorage.getItem('blueColor');
}

function changeBackground(color) {
  document.documentElement.style.setProperty('--pozadie', color);
  window.sessionStorage.setItem('PozadieColor', color);
  const storedBackground = window.sessionStorage.getItem('PozadieColor');
}

const storedColor = window.sessionStorage.getItem('blueColor');
if (storedColor) {
  document.documentElement.style.setProperty('--blue', storedColor);
}

const storedBackground = window.sessionStorage.getItem('PozadieColor');
if (storedBackground) {
  document.documentElement.style.setProperty('--pozadie', storedBackground);
}