import React, { Component } from "react";
import Hamburger from './Hamburger';
import Lesson from './Lesson';
import Test from './Test';
import { Route } from "react-router-dom";
import { ScrollPanel } from 'primereact/scrollpanel';
import TestResult from './TestResult';
import fetchFromHost from '../FetchFromServer';
import CourseHome from './CourseHome';

class Course extends Component {

  state = {
  }

  /**
   * 
   */
  componentDidMount() {
    fetchFromHost("/api/course")
      .then(async res => {
        let json = await res.json();
        let id = this.props.id;
        let curse = json.find(course => course._id === id);
        this.setState({ data: curse });
      })
      .catch(e => console.log(e));
  }

  render() {
    return this.state.data ? (
      <div className="course">
        <Hamburger data={this.state.data.lessongroups} courseId={this.props.id} />
        <div className="content">
          <ScrollPanel className="scroll">
            <Route exact path="/course/:courseId/group/:groupId/lesson/:lessonId" component={({ match, location }) => {
              const { params: { courseId, groupId, lessonId } } = match;
              return (<Lesson courseId={courseId} groupId={groupId} lessonId={lessonId} />);
            }} />
            <Route exact path="/course/:courseId/group/:groupId/test" component={({ match, location }) => {
              const { params: { courseId, groupId } } = match;
              return (<Test courseId={courseId} groupId={groupId} />);
            }} />
            <Route exact path="/course/:courseId/group/:groupId/lesson/:lessonId/test" component={({ match, location }) => {
              const { params: { courseId, groupId, lessonId } } = match;
              return (<Test courseId={courseId} groupId={groupId} lessonId={lessonId} />);
            }} />
            <Route exact path="/course/:courseId/group/:groupId/lesson/:lessonId/test/result" component={({ match, location }) => {
              const { params: { courseId, groupId, lessonId } } = match;
              return (<TestResult courseId={courseId} groupId={groupId} lessonId={lessonId} />);
            }} />
            <Route exact path="/course/:courseId/group/:groupId/test/result" component={({ match, location }) => {
              const { params: { courseId, groupId } } = match;
              return (<TestResult courseId={courseId} groupId={groupId} />);
            }} />
            <Route exact path="/course/:courseId" component={({ match, location }) => {
              const { params: { courseId} } = match;
              return (<CourseHome courseId={courseId} />);
            }} />
          </ScrollPanel>
        </div>
      </div>
    ) : <div />;
  }
}

export default Course;