// Pure calculator logic: NO React, NO HTML here.
// Almost the same as Step 2, with one big difference:
//   Step 2 CHANGED the state directly:   state.current = "5"
//   Here we RETURN A NEW state object:   return { ...state, current: "5" }
// React needs a new object to notice that something changed.

export type Operator = "+" | "-" | "*" | "/";

export interface CalculatorState {
  current: string;
  previous: string;
  operator: Operator | null;
}

export const initialState: CalculatorState = {
  current: "0",
  previous: "",
  operator: null,
};

export function isOperator(value: string): value is Operator {
  return value === "+" || value === "-" || value === "*" || value === "/";
}

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

function evaluate(state: CalculatorState): CalculatorState {
  if (state.operator === null || state.previous === "") return state;

  const result = calculate(parseFloat(state.previous), parseFloat(state.current), state.operator);

  if (result === null) return { current: "Error", previous: "", operator: null };
  return { current: String(parseFloat(result.toFixed(10))), previous: "", operator: null };
}

// The ONE function the UI calls: (old state, key pressed) => new state
export function pressKey(state: CalculatorState, key: string): CalculatorState {
  const isError = state.current === "Error";

  // Digits 0-9
  if (/^[0-9]$/.test(key)) {
    const current = state.current === "0" || isError ? key : state.current + key;
    return { ...state, current }; // "...state" copies all the other fields
  }

  if (key === ".") {
    if (isError) return { ...initialState, current: "0." };
    if (state.current.includes(".")) return state;
    return { ...state, current: state.current + "." };
  }

  if (isOperator(key)) {
    if (isError) return state;
    // finish any waiting calculation first (e.g. "5 + 3" then "-")
    const base = state.operator !== null ? evaluate(state) : state;
    return { current: "0", previous: base.current, operator: key };
  }

  if (key === "=") return evaluate(state);

  if (key === "C") return initialState;

  if (key === "DEL") {
    if (isError || state.current.length === 1) return { ...state, current: "0" };
    return { ...state, current: state.current.slice(0, -1) };
  }

  return state; // unknown key: nothing changes
}
