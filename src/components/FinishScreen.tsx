interface FinishScreenProps {
  points: number;
  maxPossiblePoints: number;
}
export default function FinishScreen({
  points,
  maxPossiblePoints,
}: FinishScreenProps) {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <div>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>
    </div>
  );
}
