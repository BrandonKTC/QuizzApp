import { Action } from "../App";

interface FinishScreenProps {
  points: number;
  maxPossiblePoints: number;
  dispatch: React.Dispatch<Action>;
}
export default function FinishScreen({
  points,
  maxPossiblePoints,
  dispatch,
}: FinishScreenProps) {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <div>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </div>
  );
}
