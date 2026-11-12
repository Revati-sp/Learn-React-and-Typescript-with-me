// Step 2: Calculator in plain TypeScript (no React)

// ---------- 1. TYPES ----------

// A "union type": Operator can ONLY be one of these four strings.
// If you try to use "%" somewhere, TypeScript will show an error.
type Operator = "+" | "-" | "*" | "/";

// An "interface" describes the shape of an object.
// This is everything our calculator needs to remember.
interface CalculatorState {
  current: string;            // number being typed right now (kept as text, e.g. "12.5")
  previous: string;           // number typed before the operator
  operator: Operator | null;  // chosen operator, or null if none yet
}

// ---------- 2. STATE ----------

// "let" because we replace the state each time something changes.
let state: CalculatorState = {
  current: "0",
  previous: "",
  operator: null,
};

// ---------- 3. PURE LOGIC (no HTML here) ----------

// Takes two numbers and an operator, returns the answer.
// Returns null for divide-by-zero so the caller must handle that case.
function calculate(a: number, b: number, op: Operator): number | null {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? null : a / b;
  }
}

// ---------- 4. ACTIONS (each one updates the state) ----------

function inputDigit(digit: string): void {
  if (state.current === "Error") state.current = "0";
  // Replace the leading "0", otherwise add the digit to the end
  state.current = state.current === "0" ? digit : state.current + digit;
}

function inputDecimal(): void {
  if (!state.current.includes(".")) {
    state.current += ".";
  }
}

function chooseOperator(op: Operator): void {
  if (state.current === "Error") return;
  // If an operation is already waiting (e.g. "5 + 3" and then "-"), finish it first
  if (state.operator !== null && state.previous !== "") {
    evaluate();
  }
  state.previous = state.current;
  state.current = "0";
  state.operator = op;
}

function evaluate(): void {
  if (state.operator === null || state.previous === "") return;

  const a: number = parseFloat(state.previous);
  const b: number = parseFloat(state.current);
  const result = calculate(a, b, state.operator); // type is inferred: number | null

  // Type narrowing: inside the "if", TypeScript knows result is null
  if (result === null) {
    state = { current: "Error", previous: "", operator: null };
  } else {
    // ...and here TypeScript knows result is a number
    // Round to avoid float noise like 0.1 + 0.2 = 0.30000000000000004
    state = { current: String(parseFloat(result.toFixed(10))), previous: "", operator: null };
  }
}

function clearAll(): void {
  state = { current: "0", previous: "", operator: null };
}

function deleteLast(): void {
  if (state.current === "Error") return clearAll();
  state.current = state.current.length > 1 ? state.current.slice(0, -1) : "0";
}

// ---------- 5. CONNECT TO THE PAGE (the DOM) ----------

// "as HTMLDivElement" tells TypeScript what kind of element this is.
// The "!" in querySelector(...)! means "I promise this element exists".
const displayEl = document.querySelector("#display") as HTMLDivElement;
const historyEl = document.querySelector("#history") as HTMLDivElement;
const buttons = document.querySelector(".buttons")!;

// Draw the current state on the screen.
// Without React, YOU must remember to call this after every change!
function render(): void {
  displayEl.textContent = state.current;
  historyEl.textContent = state.operator ? `${state.previous} ${state.operator}` : "";
}

// Type guard: checks at runtime whether a string is a valid Operator.
// If it returns true, TypeScript treats the value as type Operator.
function isOperator(value: string): value is Operator {
  return value === "+" || value === "-" || value === "*" || value === "/";
}

// One click listener for all buttons ("event delegation")
buttons.addEventListener("click", (event: Event) => {
  const target = event.target as HTMLElement;
  if (!(target instanceof HTMLButtonElement)) return; // ignore clicks between buttons

  const value: string = target.dataset.value ?? ""; // ?? = use "" if undefined

  if (/^[0-9]$/.test(value)) inputDigit(value);
  else if (value === ".") inputDecimal();
  else if (isOperator(value)) chooseOperator(value); // value is now type Operator
  else if (value === "=") evaluate();
  else if (value === "C") clearAll();
  else if (value === "DEL") deleteLast();

  render();
});

// Bonus: keyboard support
document.addEventListener("keydown", (event: KeyboardEvent) => {
  const key: string = event.key;

  if (/^[0-9]$/.test(key)) inputDigit(key);
  else if (key === ".") inputDecimal();
  else if (isOperator(key)) chooseOperator(key);
  else if (key === "Enter" || key === "=") evaluate();
  else if (key === "Escape") clearAll();
  else if (key === "Backspace") deleteLast();
  else return; // ignore other keys

  render();
});

render(); // draw the first screen
