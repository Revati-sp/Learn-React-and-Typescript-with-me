// A COMPONENT is a function that returns what should appear on screen (JSX).
// PROPS are the inputs to a component, like function arguments.

// We describe the props with a TypeScript type:
type DisplayProps = {
  value: string;
  history: string;
};

// { value, history } "destructures" the props object
export default function Display({ value, history }: DisplayProps) {
  return (
    <div className="screen">
      <div className="history">{history}</div>
      {/* { } inside JSX = "put a JavaScript value here" */}
      <div className="display">{value}</div>
    </div>
  );
}
