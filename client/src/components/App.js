import React from 'react';
import Courses from './Courses';
import Home from './Home';
import Contact from './Contact';
import Course from './Course';
import { Route, NavLink, HashRouter } from "react-router-dom";

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../css/style.scss';

function App() {
  return (
    <div>
      <HashRouter>
        <nav className="navbar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/contacts">Contact</NavLink>
        </nav>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/courses" component={Courses} />
          <Route path="/contacts" component={Contact} />
          <Route path="/course/:courseId" component={({ match, location }) => {
            const { params: { courseId } } = match;
            return (<Course id={courseId}/>);
            }} /> 
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
