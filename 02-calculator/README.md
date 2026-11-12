# Step 2: Calculator in Plain TypeScript (no React) 🧮

A working calculator in the browser, built with **only TypeScript + HTML + CSS**.

## Files

| File | What it does |
|---|---|
| [index.html](index.html) | The page structure: display + buttons |
| [style.css](style.css) | How it looks |
| [calculator.ts](calculator.ts) | **The logic, written in TypeScript** ← study this one |
| `calculator.js` | Created by the compiler. The browser runs this file. Don't edit it! |
| [tsconfig.json](tsconfig.json) | Settings for the TypeScript compiler |

## How to run it
```bash
cd 02-calculator
npx tsc              # compile (reads tsconfig.json, so no filename needed)
open index.html      # open in your browser
```
Tip: `npx tsc --watch` recompiles automatically every time you save.

Keyboard works too: digits, `+ - * /`, `Enter`, `Backspace`, `Escape`.

---

## New TypeScript concepts in this step

### 1. Union types: "one of these values"
```ts
type Operator = "+" | "-" | "*" | "/";
```
A variable of type `Operator` can only hold one of these 4 strings. `"%"` would be an error.

### 2. Interfaces describe the shape of an object
```ts
interface CalculatorState {
  current: string;
  previous: string;
  operator: Operator | null;   // an Operator OR nothing
}
```

### 3. Return types that can be "nothing"
```ts
function calculate(a: number, b: number, op: Operator): number | null
```
Dividing by zero returns `null`. Because of the type, TypeScript **forces** the caller to handle that case.

### 4. Type narrowing
```ts
const result = calculate(a, b, op);   // number | null
if (result === null) {
  // here TypeScript knows: result is null
} else {
  result.toFixed(10);                 // here it knows: result is a number ✅
}
```

### 5. Type guards: your own narrowing checks
```ts
function isOperator(value: string): value is Operator { ... }
```
After `if (isOperator(value))`, TypeScript treats `value` as an `Operator`.

### 6. DOM types
```ts
const displayEl = document.querySelector("#display") as HTMLDivElement;
```
- `as HTMLDivElement` tells TypeScript what kind of element this is (a "type assertion")
- `"DOM"` in `tsconfig.json` gives us these browser types

### 7. Type inference
You don't always have to write the type. TypeScript works it out for you:
```ts
const result = calculate(a, b, op);   // TypeScript knows it's number | null
```

---

## 🐛 Same bug as Step 1!
The first draft used `const history = ...`. But `history` is a built-in browser global (`window.history`), just like `name`. We renamed it to `historyEl`.

## 💡 Why this matters for React
Look at the `render()` function. Every time the state changes, **we must manually update the page** and remember to call `render()`. In a bigger app, forgetting one call means the screen shows stale data.

**React solves exactly this:** you change the state, and React updates the screen for you. Keep this calculator, because we'll rebuild it in React later and compare the two.

## Note on behaviour
This works like a simple pocket calculator and evaluates **left to right**:
`5 + 3 × 2` = `8 × 2` = **16** (not 11).

---

## 🏋️ Exercises
1. Add a `%` operator. Notice where TypeScript shows errors once you add it to the `Operator` type: the `switch` in `calculate`, and `isOperator`.
2. Remove the `if (result === null)` check in `evaluate()` and compile. What error appears?
3. Add a `±` button that flips the sign of the current number.
4. In `tsconfig.json`, set `"strict": false` and see which errors disappear. Then set it back to `true`!
