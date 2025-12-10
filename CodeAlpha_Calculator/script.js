let display = document.getElementById("display");

function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteChar() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
}

// Keyboard support
window.addEventListener("keydown", function (e) {
  if (/^[0-9+\-*/.]$/.test(e.key)) {
    appendValue(e.key);
  }
  if (e.key === "Enter") calculate();
  if (e.key === "Backspace") deleteChar();
  if (e.key === "Escape") clearDisplay();
});
