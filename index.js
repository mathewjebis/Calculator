let expression = "";

const resultDisplay = document.getElementById("result");
const expressionDisplay = document.getElementById("expression");
const OPERATORS = ["/", "*", "+", "-"];

function updateDisplay(value) {
  resultDisplay.textContent = value;
  resultDisplay.classList.remove("error");
}

function formatExpression(exp) {
  return exp
    .replace(/\//g, " ÷ ")
    .replace(/\*/g, " × ")
    .replace(/\+/g, " + ")
    .replace(/-/g, " − ");
}

function addValue(value) {
  const isDigit = value >= "0" && value <= "9";

  // Prevent multiple decimals in the current number segment
  if (value === ".") {
    let parts = expression.split(/[+\-*/]/);
    let lastPart = parts[parts.length - 1];
    if (lastPart.includes(".")) return;
  }

  // Prevent starting with an operator (but "-" is allowed, for negative numbers)
  if (expression === "" && ["/", "*", "+"].includes(value)) return;

  let lastChar = expression.slice(-1);

  if (OPERATORS.includes(lastChar) && OPERATORS.includes(value)) {
    // Allow a "-" right after another operator so you can type things like
    // 5 * -3. Any other operator-after-operator replaces the previous one.
    if (!(value === "-" && lastChar !== "-")) {
      expression = expression.slice(0, -1);
    }
  } else if (isDigit) {
    // Strip a redundant leading zero in the current number segment
    // (0 then 5 becomes "5", not "05" — and "05" would actually be an
    // invalid octal literal in strict mode, causing a false "Error").
    let parts = expression.split(/[+\-*/]/);
    let lastPart = parts[parts.length - 1];
    if (lastPart === "0") {
      if (value === "0") return; // ignore repeated leading zeros
      expression = expression.slice(0, -1);
    }
  }

  expression += value;
  expressionDisplay.textContent = formatExpression(expression);
  updateDisplay(expression);
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
    let result = Function('"use strict"; return (' + expression + ")")();
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
  } catch {
    resultDisplay.textContent = "Error";
    resultDisplay.classList.add("error");
    expression = "";
    expressionDisplay.textContent = "";
  }
}

// Single delegated listener instead of an onclick on every button —
// one place to handle all button clicks, and new buttons work automatically.
document.getElementById("buttons").addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button) return;

  const action = button.dataset.action;
  if (action === "clear") clearDisplay();
  else if (action === "delete") deleteLast();
  else if (action === "calculate") calculate();
  else if (button.dataset.value !== undefined) addValue(button.dataset.value);
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") addValue(e.key);
  else if (e.key === "+") addValue("+");
  else if (e.key === "-") addValue("-");
  else if (e.key === "*") addValue("*");
  else if (e.key === "/") {
    e.preventDefault();
    addValue("/");
  } else if (e.key === "%") addValue("%");
  else if (e.key === ".") addValue(".");
  else if (e.key === "Enter" || e.key === "=") calculate();
  else if (e.key === "Backspace") deleteLast();
  else if (e.key === "Escape") clearDisplay();
});
