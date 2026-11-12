# Step 3: Calculator with React + TypeScript ⚛️

The same calculator as [Step 2](../02-calculator/README.md), rebuilt in **React**.
Compare the two to see what React does for you.

## How to run it
```bash
cd 03-calculator-react
npm install        # first time only: downloads React, Vite, TypeScript
npm run dev        # start the dev server, then open http://localhost:5173
```
Edit any file and save. The browser updates **instantly** (Hot Module Replacement).
Press `Ctrl + C` in the terminal to stop the server.

Other commands:
- `npm run build` type-checks with TypeScript and creates a production version in `dist/`

## Project structure
```
03-calculator-react/
├── index.html              ← one tiny page with <div id="root">
├── src/
│   ├── main.tsx            ← starts React and puts <App /> inside #root
│   ├── App.tsx             ← ⭐ main component: state + layout
│   ├── components/
│   │   ├── Display.tsx     ← shows the number
│   │   └── Button.tsx      ← one reusable button
│   ├── calculatorLogic.ts  ← pure logic (no React!)
│   ├── App.css / index.css ← styles
├── package.json            ← project info + scripts
└── tsconfig*.json          ← TypeScript settings
```

**`.ts` vs `.tsx`:** use `.tsx` when the file contains JSX (HTML-like code). Use `.ts` for plain logic.

---

## New React concepts

### 1. Components are functions that return UI
```tsx
export default function Display({ value, history }: DisplayProps) {
  return <div className="display">{value}</div>;
}
```
Component names start with a **Capital letter**, and you use them like HTML tags: `<Display />`.

### 2. JSX: HTML-like code inside TypeScript
- `{ }` puts a JavaScript value into the markup: `<div>{value}</div>`
- Write `className`, not `class`
- Write `onClick={...}` and pass a **function**, not a string

### 3. Props are inputs to a component, typed with TypeScript
```tsx
type ButtonProps = {
  label: string;
  value: string;
  variant?: "fn" | "op" | "eq" | "zero";   // ? = optional
  onPress: (value: string) => void;        // a function as a prop
};
```
Forget a prop, or pass the wrong type, and TypeScript shows an error **before you run the app**.

### 4. `useState`: memory that redraws the screen
```tsx
const [state, setState] = useState<CalculatorState>(initialState);
setState((prev) => pressKey(prev, value));  // React re-renders automatically
```

### 5. Immutability: return new objects, don't change the old one
```ts
// Step 2 (changed the object directly):  state.current = "5";
// Step 3 (creates a new object):         return { ...state, current: "5" };
```
React compares the old and new state to decide if it should redraw. If you change the old object directly, React may not notice the change.

### 6. Rendering lists with `.map()` and `key`
```tsx
{BUTTONS.map((btn) => <Button key={btn.value} {...} />)}
```
18 buttons come from one array. `key` helps React track each item.

### 7. `useEffect`: side effects plus cleanup
```tsx
useEffect(() => {
  document.addEventListener("keydown", onKeyDown);
  return () => document.removeEventListener("keydown", onKeyDown);
}, []);   // [] = run once, when the component appears
```

### 8. Derived values: compute instead of storing
```tsx
const history = state.operator ? `${state.previous} ${state.operator}` : "";
```

---

## 🆚 Step 2 vs Step 3

| | Step 2 (plain TS) | Step 3 (React) |
|---|---|---|
| Update the screen | Call `render()` yourself, every time | **Automatic** when state changes |
| Buttons | 18 `<button>` lines in HTML | 1 `Button` component + an array |
| Find elements | `document.querySelector(...)` | Not needed |
| Change state | Change the object directly | Create a new object |
| Logic | Mixed with page code | Separate `calculatorLogic.ts` |
| Global name clashes (`name`, `history`) | 🐛 Hit them twice! | Gone: each file is a **module** |

The core math (`calculate`, `Operator`, `isOperator`) is almost identical in both steps. **React changes how the UI is built, not your TypeScript logic.**

---

## 🏋️ Exercises
1. Add a `%` button. You only need to change `calculatorLogic.ts` (`Operator` + `calculate`) and add one entry to `BUTTONS`.
2. In `App.tsx`, remove `onPress={handlePress}` from `<Button>`. Read the TypeScript error.
3. Add a "last result" line: store it in a new `useState` and show it under the display.
4. Make a `±` button that flips the sign.
5. Put a `console.log("App rendered")` at the top of `App()` and watch the browser console as you click. Every state change runs the function again. That's a **re-render**.
