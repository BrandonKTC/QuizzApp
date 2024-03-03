interface ProgressProps {
  idx: number;
  numQuestions: number;
  answer: null | number;
  points: number;
  maxPossiblePoints: number;
}

export default function Progress({
  idx,
  numQuestions,
  points,
  maxPossiblePoints,
  answer,
}: ProgressProps) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={idx + Number(answer !== null)} />
      <p>
        Question {idx + 1} / {numQuestions}
      </p>
      <p>
        {points} / {maxPossiblePoints}
      </p>
    </header>
  );
}
