import { useEffect } from "react";
import { Action } from "../App";

interface TimerProps {
  dispatch: React.Dispatch<Action>;
  secondsRemaining: null | number;
}

export default function Timer({ dispatch, secondsRemaining }: TimerProps) {
  const mins = secondsRemaining && Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining && secondsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(() => dispatch({ type: "tick" }), 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins !== null && mins < 10 && "0"} {mins}:
      {seconds !== null && seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
