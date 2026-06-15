# Modern Glassmorphism Web Calculator

A sleek, responsive, and minimalist **Web Calculator** application built with semantic HTML5, pure CSS3 layout engines, and native JavaScript. It features a contemporary **Glassmorphism UI** layered over a dark multi-stop linear gradient background and implements robust mathematical edge-case sanitization alongside physical hardware keyboard bindings.

## 🚀 Live Demo

Check out the live application here: **[Live Demo Link](https://mathewjebis.github.io/Calculator/)** 

## 🛠️ Built With

- **HTML5**: Structured semantic layout matching user arithmetic grids.
- **CSS3 Variables & Grid**: Powered by CSS Grid layout architectures, hardware-accelerated transitions, alpha-channel translucency, and frosted-glass filters.
- **JavaScript (ES6+)**: Custom string parsers, strict evaluation environments, calculation sanitizers, and comprehensive global keyboard hook maps.

## ✨ Features

### ⚙️ JavaScript Mathematical Sanitization Logic

- **Floating-Point Precision Fix**: Automatically strips deep floating-point anomalies (such as `0.1 + 0.2`) by clamping and rounding complex evaluation answers down precisely to a maximum of 10 decimal boundaries (`parseFloat(result.toFixed(10))`).
- **Smart Decimal Guard**: Parses the active string dynamically upon every dot interaction to prevent invalid duplicate floating points (`1.2.3`) within a single numerical section.
- **Double Operator Prevention**: Intelligently swaps arithmetic markers out automatically if you type a second operator directly over an old one, avoiding expression crashes.
- **Zero Division Safeties**: Catches division by zero strings seamlessly using dynamic checks (`!isFinite(result)`). It displays a stylized crimson red error alert state instead of outputting `Infinity`.
- **Sandboxed Expression Processing**: Executes mathematical operations securely inside an isolated execution container (`Function('"use strict"; return ...')()`), entirely avoiding dangerous global evaluations (`eval()`).

### ⌨️ Full Physical Keyboard Support

The application features a global window keyboard tracking loop that captures, intercepts, and redirects physical hardware keyboard inputs natively:

- **Numbers & Arithmetic**: Mapped cleanly to `0` - `9`, `+`, `-`, `*`, `/`, `%`, and `.`.
- **Execution & Evaluation**: Tap `Enter` or `=` to process strings asynchronously.
- **Corrections & Flushing**: Tap `Backspace` to delete a single trailing digit, or `Escape` to instantly clear out the entire dashboard history.

### 💎 Glassmorphism Interface & Visual Details

- **Translucent Layering**: The calculator body utilizes backdrop-filtering (`backdrop-filter: blur(20px)`) combined with subtle alpha-channel translucent borders to simulate frosted glass.
- **Color-Coded Interaction Grid**: Clean `repeat(4, 1fr)` CSS layout system separates numerical buttons from operators (ambient blue highlights), actions (amber triggers), and clear keys (crimson themes).
- **Tactile Transitions**: Hover properties lift elements up slightly (`translateY(-1px)`), while active click engagements trigger a compressed micro-scaling framework (`scale(0.96)`) to simulate real mechanical keys.
- **Micro Viewport Breakpoints**: Elements fluidly rescale font sizes, internal paddings, and button grid layouts downward at mobile sizes (`max-width: 400px`) to shield the app from element overflow clipping.

## 📦 Project Structure

```text
├── index.html          # Element structures, operator layouts, and DOM bounds
├── index.css           # Glassmorphism parameters, CSS grid maps, and animations
└── index.js            # Validation algorithms, string slicing, and keyboard loops
```

## 💻 Setup & Installation

To run this project locally, simply follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mathewjebis/Calculator.git
   ```

2. **Navigate to the project folder:**

   ```bash
   cd your-repository-name
   ```

3. **Open the project:**
   - Double-click `index.html` to execute directly inside your preferred modern web browser.
   - Alternatively, right-click and use the **Live Server** extension in VS Code for real-time live-reloading code changes.
