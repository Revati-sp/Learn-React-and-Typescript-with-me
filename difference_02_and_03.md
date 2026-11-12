# Plain TypeScript vs React: What's the Difference?

[Step 2 (plain TypeScript)](02-calculator/) and [Step 3 (React)](03-calculator-react/) **look and work exactly the same** on screen. The user can't tell them apart.

The difference is in **how the code is written**, like two houses that look identical from outside but were built differently.

---

## 1. Who updates the screen?

**Step 2 (plain TypeScript):** you do it by hand.
```ts
function inputDigit(digit: string) {
  state.current = state.current + digit;   // 1. change the data
}
// ...then in the click handler:
inputDigit(value);
render();                                   // 2. YOU must remember to update the screen

function render() {
  displayEl.textContent = state.current;    // 3. YOU find each element and change it
  historyEl.textContent = ...;
}
```

**Step 3 (React):** React does it for you.
```tsx
setState((prev) => pressKey(prev, value));  // change the data. That's all.

return <Display value={state.current} />;   // you describe what the screen should look like
```
In React, you never touch the page directly. You say *"the display shows `state.current`"* once. React keeps the page matching your data from then on.

> **Step 2 = giving directions:** "turn left, then right, then stop"
> **Step 3 = giving the address:** "I want to be here". React works out the route.

---

## 2. How the buttons are made

**Step 2:** 18 hand-written lines in HTML
```html
<button data-value="7">7</button>
<button data-value="8">8</button>
<button data-value="9">9</button>
... 15 more
```

**Step 3:** one reusable `Button` component, plus a list of data
```tsx
{BUTTONS.map((btn) => <Button key={btn.value} label={btn.label} ... />)}
```
To change every button, for example to add a sound or an animation, Step 2 means editing many places. In Step 3 you edit `Button.tsx` once.

---

## 3. Bugs we actually hit

In Step 2 we ran into the `name` and `history` clash **twice**, because everything shared one global space with the browser (`window.name`, `window.history`).

In React, each file is its own **module**, so that kind of bug can't happen.

---

## Side-by-side summary

| | Step 2 (plain TS) | Step 3 (React) |
|---|---|---|
| Update the screen | Call `render()` yourself, every time | **Automatic** when state changes |
| Find elements | `document.querySelector(...)` | Not needed |
| Buttons | 18 `<button>` lines in HTML | 1 `Button` component + an array |
| Change state | Change the object directly | Create a new object (`{ ...state }`) |
| Code organisation | One big file | Small components in separate files |
| Global name clashes | 🐛 Hit them twice | Can't happen (modules) |
| Running it | `npx tsc` then open `index.html` | `npm run dev` (instant live updates) |
| Math logic | `calculate`, `Operator`, `isOperator` | **Almost identical** |

---

## So why does it matter if they look the same?

For a **calculator**, Step 2 is fine. The difference shows up as an app **grows**. Imagine adding:
- a history panel listing past calculations
- a light/dark theme switch
- a "memory" (M+) display

With **Step 2**, every change needs more `querySelector`s and more `render()` code, and more chances to forget to update something. One missed update and the screen shows **old, wrong data**.

With **React**, you add a piece of state and describe how it should look. The screen can't fall out of sync with your data.

**That's why apps like Facebook, Instagram and Netflix use React.** It doesn't make a calculator look different. It keeps big apps manageable.

---

## What stayed the same

The math logic is **almost identical** in both steps. React only changes **how the screen is built**. Your TypeScript knowledge carries over.

---

## 👀 Try it yourself

Add the same small feature to both versions: **show "Last: 19" under the display after pressing `=`**.

- **Step 2** needs new HTML, a new `querySelector`, a change to the state, and a change to `render()`
- **Step 3** needs one `useState` and one line of JSX

Doing it in both is the quickest way to *feel* the difference.
