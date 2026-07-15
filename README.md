# Glassmorphism Calculator

A responsive web calculator built with vanilla HTML, CSS, and JavaScript — no frameworks, no libraries. Focused on a clean glassmorphism UI and a JavaScript layer that handles the edge cases a basic calculator usually gets wrong.

## Live Demo

[View Live Demo](https://mathewjebis.github.io/Calculator/)

## Features

- **Standard operations**: addition, subtraction, multiplication, division, modulo (`%`)
- **Full keyboard support**: number keys, operators, `Enter`/`=` to calculate, `Backspace` to delete, `Escape` to clear
- **Safe expression evaluation**: uses `Function('"use strict"; return (...)')()` in a strict, isolated scope instead of `eval()`, so user input never runs in the surrounding page's scope
- **Division-by-zero handling**: shown as a styled "Error" state instead of `Infinity`
- **Floating-point rounding**: results are rounded to 10 decimal places to avoid results like `0.1 + 0.2 = 0.30000000000000004`
- **Input guarding**:
  - Prevents a second decimal point in the same number (`1.2.3` isn't possible)
  - Swaps a duplicate operator instead of creating an invalid expression (`5+*` becomes `5*`)
  - Still allows a `-` right after an operator so you can multiply/divide by a negative number (`5 * -3` works correctly)
  - Strips a redundant leading zero in a number (typing `0` then `5` gives `5`, not `05` — which matters because `05` interpreted literally would be an invalid octal literal in strict mode)
- **Event delegation**: a single click listener on the button container handles all 17 buttons via `data-value`/`data-action` attributes, instead of an inline handler on each button

## Technologies Used

- HTML5
- CSS3 (Grid layout, `backdrop-filter` for the glass effect, custom transitions)
- Vanilla JavaScript (event delegation, keyboard events, strict-mode function evaluation)

## Project Structure

```
├── index.html   # Calculator markup and button grid
├── index.css    # Glassmorphism styling, layout, responsive breakpoints
└── index.js     # Calculation logic, input validation, keyboard support
```

## Getting Started

No build step required — open `index.html` directly in a browser, or serve it locally:

```bash
git clone https://github.com/mathewjebis/Calculator.git
cd Calculator
npx serve .
```

## Author

**S. Mathew Jebis**

- GitHub: [mathewjebis](https://github.com/mathewjebis)
