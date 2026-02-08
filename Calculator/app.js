//Used for reading and writing values in the display section
const display = document.getElementById("display");

function lastCharIsOperator() {
  const lastChar = display.value.slice(-1);
  return ["+", "-", "*", "/", "%"].includes(lastChar);
}

// Append values to the display
function appendToDisplay(value) {
  const lastChar = display.value.slice(-1);
  const operators = ["+", "-", "*", "/", "%"];

  // Prevent starting with operators except minus
  if (display.value === "" && ["+", "*", "/", "%"].includes(value)) return;

  // Prevent consecutive operators
  if (operators.includes(value) && operators.includes(lastChar)) return;

  // Prevent multiple decimals in one number
  if (value === ".") {
    const parts = display.value.split(/[\+\-\*\/\%]/);
    const currentNum = parts[parts.length - 1];
    if (currentNum.includes(".")) return;
  }

  display.value += value;
}

// Used to clear all values in the display
function clearAll() {
  display.value = "";
}

// Partial clear of values in the display
function partialClear() {
  display.value = display.value.slice(0, -1);
}

// Calculate
function calculate() {
  try {
    // Prevent division by zero
    if (/\/0/.test(display.value)) {
      display.value = "Error";
      return;
    }

    // Replace % with modulo
    const expression = display.value.replace(/(\d+)%(\d+)/g, "($1%$2)");
    display.value = eval(expression);
  } catch {
    display.value = "Error";
  }
}

// Get numbers from document and then append to display
document
  .getElementById("num0")
  .addEventListener("click", () => appendToDisplay("0"));
document
  .getElementById("num1")
  .addEventListener("click", () => appendToDisplay("1"));
document
  .getElementById("num2")
  .addEventListener("click", () => appendToDisplay("2"));
document
  .getElementById("num3")
  .addEventListener("click", () => appendToDisplay("3"));
document
  .getElementById("num4")
  .addEventListener("click", () => appendToDisplay("4"));
document
  .getElementById("num5")
  .addEventListener("click", () => appendToDisplay("5"));
document
  .getElementById("num6")
  .addEventListener("click", () => appendToDisplay("6"));
document
  .getElementById("num7")
  .addEventListener("click", () => appendToDisplay("7"));
document
  .getElementById("num8")
  .addEventListener("click", () => appendToDisplay("8"));
document
  .getElementById("num9")
  .addEventListener("click", () => appendToDisplay("9"));
document
  .getElementById("decimal")
  .addEventListener("click", () => appendToDisplay("."));

// Get the operators from document and then append to display
document
  .getElementById("add")
  .addEventListener("click", () => appendToDisplay("+"));
document
  .getElementById("subtract")
  .addEventListener("click", () => appendToDisplay("-"));
document
  .getElementById("multiply")
  .addEventListener("click", () => appendToDisplay("*"));
document
  .getElementById("divide")
  .addEventListener("click", () => appendToDisplay("/"));
document
  .getElementById("modulo")
  .addEventListener("click", () => appendToDisplay("%"));

// Equals
document.getElementById("equals").addEventListener("click", calculate);

// Clear
document.getElementById("clear").addEventListener("click", partialClear);
document.getElementById("all-clear").addEventListener("click", clearAll);
