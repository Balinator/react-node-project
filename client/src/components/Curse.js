import React, { Component } from "react";
import Hamburger from './Hamburger';
import Lesson from './Lesson';
import Test from './Test';
import { Route } from "react-router-dom";
import { ScrollPanel } from 'primereact/scrollpanel';
import TestResult from './TestResult';

class Curse extends Component {

  state = {
  }

  /**
   * 
   */
  componentDidMount() {
    fetch("http://localhost:3000/api/data")
      .then(async res => {
        let json = await res.json();
        let id = Number.parseInt(this.props.id);
        let curse = json.find(e => e.id === id);
        this.setState({ data: curse });
      })
      .catch(e => console.log(e));
  }

  render() {
    return this.state.data ? (
      <div className="curse">
        <Hamburger data={this.state.data.lessongroups} curseId={this.props.id} />
        <div className="content">
          <ScrollPanel className="scroll">
            <Route exact path="/curse/:curseId/group/:groupId/lesson/:lessonId" component={({ match, location }) => {
              const { params: { curseId, groupId, lessonId } } = match;
              return (<Lesson curseId={curseId} groupId={groupId} lessonId={lessonId} />);
            }} />
            <Route exact path="/curse/:curseId/group/:groupId/test" component={({ match, location }) => {
              const { params: { curseId, groupId } } = match;
              return (<Test curseId={curseId} groupId={groupId} />);
            }} />
            <Route exact path="/curse/:curseId/group/:groupId/lesson/:lessonId/test" component={({ match, location }) => {
              const { params: { curseId, groupId, lessonId } } = match;
              return (<Test curseId={curseId} groupId={groupId} lessonId={lessonId} />);
            }} />
            <Route exact path="/curse/:curseId/group/:groupId/lesson/:lessonId/test/result" component={({ match, location }) => {
              const { params: { curseId, groupId, lessonId } } = match;
              return (<TestResult curseId={curseId} groupId={groupId} lessonId={lessonId} />);
            }} />
            <Route exact path="/curse/:curseId/group/:groupId/test/result" component={({ match, location }) => {
              const { params: { curseId, groupId } } = match;
              return (<TestResult curseId={curseId} groupId={groupId} />);
            }} />
          </ScrollPanel>
        </div>
      </div>
    ) : <div />;
  }
}

export default Curse;