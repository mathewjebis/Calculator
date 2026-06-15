let expression = "";

const resultDisplay = document.getElementById("result");
const expressionDisplay = document.getElementById("expression");

function updateDisplay(value) {
  resultDisplay.textContent = value;
  resultDisplay.classList.remove("error");
}

function addValue(value) {
  // Prevent multiple decimals in same number
  if (value === ".") {
    let parts = expression.split(/[\+\-\*\/]/);
    let lastPart = parts[parts.length - 1];
    if (lastPart.includes(".")) return;
  }

  // Prevent starting with operator
  if (expression === "" && ["/", "*", "+"].includes(value)) return;

  // Prevent double operators
  let lastChar = expression.slice(-1);
  if (["/", "*", "+", "-"].includes(lastChar) && ["/", "*", "+", "-"].includes(value)) {
    expression = expression.slice(0, -1);
  }

  expression += value;
  expressionDisplay.textContent = formatExpression(expression);
  updateDisplay(expression);
}

function formatExpression(exp) {
  return exp
    .replace(/\//g, " ÷ ")
    .replace(/\*/g, " × ")
    .replace(/\+/g, " + ")
    .replace(/-/g, " − ");
}

function clearDisplay() {
  expression = "";
  expressionDisplay.textContent = "";
  updateDisplay("0");
}

function deleteLast() {
  expression = expression.slice(0, -1);
  expressionDisplay.textContent = formatExpression(expression);
  updateDisplay(expression || "0");
}

function calculate() {
  if (expression === "") return;
  try {
    let result = Function('"use strict"; return (' + expression + ')')();
    // Handle division by zero
    if (!isFinite(result)) {
      resultDisplay.textContent = "Error";
      resultDisplay.classList.add("error");
      expression = "";
      return;
    }
    // Round to avoid floating point issues
    result = parseFloat(result.toFixed(10));
    expressionDisplay.textContent = formatExpression(expression) + " =";
    expression = String(result);
    updateDisplay(result);
  } catch (error) {
    resultDisplay.textContent = "Error";
    resultDisplay.classList.add("error");
    expression = "";
    expressionDisplay.textContent = "";
  }
}

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") addValue(e.key);
  else if (e.key === "+") addValue("+");
  else if (e.key === "-") addValue("-");
  else if (e.key === "*") addValue("*");
  else if (e.key === "/") { e.preventDefault(); addValue("/"); }
  else if (e.key === "%") addValue("%");
  else if (e.key === ".") addValue(".");
  else if (e.key === "Enter" || e.key === "=") calculate();
  else if (e.key === "Backspace") deleteLast();
  else if (e.key === "Escape") clearDisplay();
});