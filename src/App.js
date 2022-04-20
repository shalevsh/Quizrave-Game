import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import ScrollToTop from "./jsx/Components/helperComponents/ScrollToTop";
import QuizApp from "./jsx/Pages/quiz";
import GameStart from "./jsx/Pages/gameStart";
import Settings from "./jsx/Pages/Settings";
import { TransitionGroup } from "react-transition-group";
import { Result } from "./jsx/Pages/quiz/Result";

export default function App() {
  // All the routes are defined here for the whole application
  // the default route of the application is GameStart
  const location = useHistory();
  return (
    <div>
      <Router>
        <ScrollToTop />
        <TransitionGroup>
            <Switch>
              <Route exact path={"/"} component={GameStart} />
              <Route exact path={"/settings"} component={Settings} />
              <Route exact path={"/quiz"} component={QuizApp} />
              <Route exact path={"/result/:progress/:score"} component={Result} />
            </Switch>
        </TransitionGroup>
      </Router>
    </div>
  );
}
