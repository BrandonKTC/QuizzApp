import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import StartScreen from "./components/StartScreen";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Question from "./components/Question";

export interface State {
  questions: QuestionShape[];
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: string;
  index: number;
  answer: null | number;
  points: number;
  highscore: number;
  secondsRemaining: null;
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
      return { ...state, status: "active" };
    case "newAnswer":
      return { ...state, answer: action.payload };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    default:
      throw new Error("Action Unknow");
  }
}

export default function App() {
  const [{ status, questions, index, answer }, dispatch] = useReducer(
    reduce,
    initialState
  );
  const numQuestions = questions.length;

  useEffect(() => {
    fetch("http://localhost:3000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
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
          <Question
            question={questions[index]}
            answer={answer}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
