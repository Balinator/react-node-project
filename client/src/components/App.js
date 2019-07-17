import React from "react";
import Curses from "./Curses";
import Home from "./Home";
import Contact from "./Contact";
import Curse from "./Curse";
import CreateCourse from "./CreateCurse";
import { Route, NavLink, HashRouter } from "react-router-dom";

import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../css/style.scss";

function App() {
  return (
    <div>
      <HashRouter>
        <nav className="navbar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/curses">Curses</NavLink>
          <NavLink to="/createcurse">Create Course</NavLink>
          <NavLink to="/contacts">Contact</NavLink>
        </nav>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/curses" component={Curses} />
          <Route path="/contacts" component={Contact} />
          <Route path="/createcurse" component={CreateCourse} />
          <Route
            path="/curse/:curseId"
            component={({ match, location }) => {
              const {
                params: { curseId }
              } = match;
              return <Curse id={curseId} />;
            }}
          />
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
