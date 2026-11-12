import { useEffect, useState } from "react";
import Display from "./components/Display";
import Button from "./components/Button";
import { initialState, pressKey, type CalculatorState } from "./calculatorLogic";
import "./App.css";

// The button layout as DATA. React turns this array into buttons with .map()
type ButtonConfig = {
  label: string;
  value: string;
  variant?: "fn" | "op" | "eq" | "zero";
};

const BUTTONS: ButtonConfig[] = [
  { label: "C", value: "C", variant: "fn" },
  { label: "⌫", value: "DEL", variant: "fn" },
  { label: "÷", value: "/", variant: "op" },
  { label: "×", value: "*", variant: "op" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "−", value: "-", variant: "op" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "+", value: "+", variant: "op" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "=", value: "=", variant: "eq" },
  { label: "0", value: "0", variant: "zero" },
  { label: ".", value: "." },
];

// Map physical keyboard keys to our calculator keys
const KEYBOARD_MAP: Record<string, string> = {
  Enter: "=",
  Escape: "C",
  Backspace: "DEL",
};

export default function App() {
  // ⭐ useState: React remembers this value between renders.
  //    state    = the current value
  //    setState = the function to change it. Calling it makes React RE-DRAW the screen.
  //    <CalculatorState> = the TypeScript type of the state
  const [state, setState] = useState<CalculatorState>(initialState);

  // Called by every button. "prev => ..." gives us the latest state safely.
  function handlePress(value: string) {
    setState((prev) => pressKey(prev, value));
    // 👆 No render() call here! In Step 2 we had to call it ourselves.
  }

  // ⭐ useEffect: runs code AFTER the component appears on screen.
  //    We use it to add a keyboard listener, and to remove it on cleanup.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const key = KEYBOARD_MAP[event.key] ?? event.key;
      setState((prev) => pressKey(prev, key));
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown); // cleanup
  }, []); // [] = run this only once, when the component first appears

  // "Derived" value: calculated from the state on every render, not stored separately
  const history = state.operator ? `${state.previous} ${state.operator}` : "";

  // The UI is a description of the state. React makes the page match it.
  return (
    <div className="calculator">
      <Display value={state.current} history={history} />

      <div className="buttons">
        {BUTTONS.map((btn) => (
          // "key" helps React keep track of each item in a list
          <Button
            key={btn.value}
            label={btn.label}
            value={btn.value}
            variant={btn.variant}
            onPress={handlePress}
          />
        ))}
      </div>
    </div>
  );
}
