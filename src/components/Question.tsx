import { Action, QuestionShape } from "../App";
import Option from "./Option";

interface QuestionProps {
  question: QuestionShape;
  answer: null | number;
  dispatch: React.Dispatch<Action>;
}

export default function Question({
  question,
  answer,
  dispatch,
}: QuestionProps) {
  return (
    <div>
      <h3>{question.question}</h3>
      <Option question={question} answer={answer} dispatch={dispatch} />
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    </div>
  );
}
