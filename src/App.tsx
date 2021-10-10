import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import MicroFrontend from './MicroFrontend';
import { MainComponent } from './MainComponent';

function App() {

  const [textValue, setTextValue] = useState("");

  // @ts-ignore
  const WebApp1 = ({ textValue, setTextValue }) => (
    <MicroFrontend name="web-app-1" textValue={textValue} setTextValue={setTextValue} />
  );
  // @ts-ignore
  const WebApp2 = ({ textValue, setTextValue }) => (
    <MicroFrontend name="web-app-2" textValue={textValue} setTextValue={setTextValue} />
  );

  return (
    <BrowserRouter>
      <React.Fragment>
        <div className="app-header">
          <div className="flex-items">
            <h5>Tech Sharing</h5>
            <Link to="/web-app-1">Web App 1</Link>
            <Link to="/web-app-2">Web App 2</Link>
          </div>
          <div>
            <input type="text" value={textValue} onChange={(e) => setTextValue(e.target.value)} />
          </div>
        </div>

        <div className="app-container">
          <Switch>
            <Route exact path="/" component={MainComponent} />
            <Route exact path="/web-app-1" component={() => <WebApp1 textValue={textValue} setTextValue={setTextValue} />} />
            <Route exact path="/web-app-2" component={() => <WebApp2 textValue={textValue} setTextValue={setTextValue} />} />
          </Switch>
        </div>
        <div className="app-footer">Footer</div>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
