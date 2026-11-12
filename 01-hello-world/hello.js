"use strict";
// Step 1: Hello World in TypeScript
// A variable with a TYPE annotation.
// ": string" tells TypeScript this variable can only hold text.
// (We call it "userName", not "name", because browsers already have a
//  built-in global called "name" — TypeScript warned us about the clash!)
const userName = "Revati";
// A function with typed input and typed output.
// (person: string) -> the input must be a string
// : string after the () -> the function must return a string
function greet(person) {
    return `Hello, ${person}! Welcome to TypeScript 🎉`;
}
console.log(greet(userName));
