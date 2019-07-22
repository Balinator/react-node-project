import React, { Component } from "react";
import CourseSmall from './CourseSmall';
import '../css/style.scss';
import {Accordion,AccordionTab} from 'primereact/accordion';

import fetchFromHost from '../FetchFromServer';

class Courses extends Component {
  constructor() {
    super();
    this.state = { data: [], activeIndex: 0 };
  }

  render() {
    return (
      <div className="coursesPage">
        <h1>Courses</h1>
        <Accordion activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({activeIndex: e.index})}>
          <AccordionTab header='Courses'>
            <div className="courses">
              {this.state.data}
            </div>
          </AccordionTab>
        </Accordion>

      </div>
    );
  }

  componentDidMount() {
    fetchFromHost("/api/course")
      .then(async res => {
        let json = await res.json();
        let list = [];
        json.forEach(course => {
          list.push(<CourseSmall key={course._id} data={course} />);
        });
        this.setState({ data: list, activeIndex: 0 });
      })
      .catch(e => console.log(e));
  }
}

export default Courses;