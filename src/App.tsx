import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import StartScreen from "./components/StartScreen";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Question from "./components/Question";
import Progress from "./components/Progress";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import FinishScreen from "./components/FinishScreen";

const POINTS = 10;
const TIMER = 600;
export interface State {
  questions: QuestionShape[];
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: string;
  index: number;
  answer: null | number;
  points: number;
  highscore: number;
  secondsRemaining: null | number;
}
export interface QuestionShape {
  question: string;
  options: [];
  correctOption: number;
  id: string;
}

export interface Action {
  type: string;
  payload?: any;
}

const initialState: State = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reduce(state: State, action: Action): State {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active", secondsRemaining: TIMER };
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === state.questions[state.index].correctOption
            ? state.points + POINTS
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining && state.secondsRemaining - 1,
        status: state.secondsRemaining <= 0 ? "finished" : state.status,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };

    default:
      throw new Error("Action Unknow");
  }
}

export default function App() {
  const [
    { status, questions, secondsRemaining, index, points, answer },
    dispatch,
  ] = useReducer(reduce, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = POINTS * questions.length;

  useEffect(() => {
    fetch("https://brandonktc.github.io/QuizzApp/questions.json")
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: "dataReceived", payload: data.questions })
      )
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              idx={index}
              numQuestions={numQuestions}
              answer={answer}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            dispatch={dispatch}
            maxPossiblePoints={maxPossiblePoints}
          />
        )}
      </Main>
    </div>
  );
}
