import React, { Component } from "react";
import data from '../data/data.json';
import Hamburger from './Hamburger';
import Lesson from './Lesson';
import { Route, NavLink, HashRouter } from "react-router-dom";

class Curse extends Component {

  state = {
  }

  componentDidMount() {
    Promise.resolve(data)
      .then(res => {
        let id = Number.parseInt(this.props.id);
        let curse = res.find(e => e.id === id);
        this.setState({ data: curse });
      })
      .catch(e => console.log(e));
  }

  render() {
    return this.state.data ? (
      <div className="curse">
        <Hamburger data={this.state.data.lessongroups} curseId={this.props.id} />
        <div className="content">
        <Route path="/curse/:curseId/lesson/:lessonId" component={({ match, location }) => {
            const { params: { curseId, lessonId } } = match;
            console.log('routing to lesson ' + lessonId + ' in curse ' + curseId);
            return (<Lesson curseId={curseId} lessonId={lessonId} />);
          }} />
          <Route path="/curse/:curseId/group/:groupId/lesson/:lessonId" component={({ match, location }) => {
            const { params: { curseId, groupId, lessonId } } = match;
            console.log('routing to lesson ' + lessonId + ' in curse ' + curseId);
            return (<Lesson curseId={curseId} lessonId={lessonId} groupId={groupId}/>);
          }} />
        </div>
      </div>
    ) : <div />;
  }
}

export default Curse;