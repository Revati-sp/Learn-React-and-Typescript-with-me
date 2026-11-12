# Step 1: Hello World in TypeScript ✅

Output:
```
Hello, Revati! Welcome to TypeScript 🎉
```

## What is TypeScript?
TypeScript is **JavaScript with types added**. You say what kind of value each thing holds, such as text, a number or true/false. TypeScript then checks your code for mistakes **before** it runs.

Browsers and Node.js can't run TypeScript directly, so we convert it to JavaScript first:

```
hello.ts  --(tsc compiler)-->  hello.js  --(node)-->  output
```

## The code: [hello.ts](hello.ts)

```ts
const userName: string = "Revati";

function greet(person: string): string {
  return `Hello, ${person}! Welcome to TypeScript 🎉`;
}

console.log(greet(userName));
```

| Piece | Meaning |
|---|---|
| `const userName` | Creates a variable that can't be reassigned |
| `: string` | **Type annotation**: this variable can only hold text |
| `(person: string)` | The function's input must be text |
| `): string` | The function must return text |
| `` `Hello, ${person}!` `` | A template string that puts the value inside the text |

## The key idea
Open the compiled [hello.js](hello.js). **All the types are gone.** Types are only used for checking while you write code. The program that actually runs is plain JavaScript.

## TypeScript already caught a bug 🐛
The first version named the variable `name`, and TypeScript gave an error. Browsers already have a global variable called `name`, so ours clashed with it. Plain JavaScript would have stayed silent. Catching mistakes like this early is the main reason people use TypeScript.

## How to run it
```bash
cd 01-hello-world
npx tsc hello.ts     # convert TypeScript → JavaScript
node hello.js        # run the JavaScript
```

## 🏋️ Exercise
1. Change `greet(userName)` to `greet(42)` and run `npx tsc hello.ts`. Read the error you get.
2. Undo that change. Then add a variable `const age: number = 25;` and print it with `console.log`.
3. Change `age` to hold `"twenty"`. What does TypeScript say?

**Next → Step 2:** basic types (`string`, `number`, `boolean`, arrays) and type inference.
