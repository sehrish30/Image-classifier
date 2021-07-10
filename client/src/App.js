import ImageList from "./components/ImageList/ImageList";
import Navigation from "./components/Navigation/Navigation";
import Classifier from "./components/Classifer/Classifier";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import "./components/Classifer/Classifier.css";

function App() {
  return (
    <Router>
      <Navigation />
      <div className="App">
        <Switch>
          <Route exact path="/" component={Classifier} />
          <Route path="/list" component={ImageList} />
          <Route exact path="*" component={Classifier} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
