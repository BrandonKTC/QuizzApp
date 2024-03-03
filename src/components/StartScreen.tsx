import { Action } from "../App";

interface StartScreenProps {
  numQuestions: number;
  dispatch: React.Dispatch<Action>;
}

export default function StartScreen({
  numQuestions,
  dispatch,
}: StartScreenProps) {
  return (
    <div className="start">
      <h2>Welcome to The Quiz App!</h2>
      <h3>{numQuestions} question to test your Knowledge</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}
