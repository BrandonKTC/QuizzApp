import { Action, QuestionShape } from "../App";

interface OptionProps {
  question: QuestionShape;
  answer: null | number;
  dispatch: React.Dispatch<Action>;
}

export default function Option({ question, answer, dispatch }: OptionProps) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, idx) => (
        <button
          key={idx}
          className={`btn btn-option ${idx === answer ? "answer" : ""} ${
            hasAnswered
              ? idx === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: idx })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
