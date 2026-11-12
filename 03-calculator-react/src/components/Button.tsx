// One reusable button. Step 2 needed 18 almost-identical <button> lines in HTML;
// here we write ONE component and reuse it.

type ButtonProps = {
  label: string;                                  // what the user sees, e.g. "÷"
  value: string;                                  // what the logic gets, e.g. "/"
  variant?: "fn" | "op" | "eq" | "zero";          // "?" = optional prop
  onPress: (value: string) => void;               // a FUNCTION passed in as a prop
};

export default function Button({ label, value, variant, onPress }: ButtonProps) {
  return (
    // className, not class (because "class" is a reserved word in JavaScript)
    // onClick receives a function. React calls it when the button is clicked.
    <button className={variant} onClick={() => onPress(value)}>
      {label}
    </button>
  );
}
