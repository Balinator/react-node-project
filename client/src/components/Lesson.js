import React, { Component } from "react";
import data from '../data/data.json';
import { Button } from 'primereact/button';
import { Redirect } from 'react-router-dom'
import { ScrollPanel } from 'primereact/scrollpanel';

class Lesson extends Component {

    state = {
    }

    componentDidMount() {
        Promise.resolve(data)
            .then(res => {
                let curseId = Number.parseInt(this.props.curseId);
                let groupId = Number.parseInt(this.props.groupId);
                let lessonId = Number.parseInt(this.props.lessonId);

                let lesson = res.find(e => e.id === curseId)
                    .lessongroups.find(g => g.id === groupId)
                    .lessons.find(l => l.id === lessonId);
                this.setState({ data: lesson });
            })
            .catch(e => console.log(e));
    }

    render() {
        return this.state.data ? (
            <ScrollPanel className="scroll">
                <div className="lesson">
                    <h1>{this.state.data.title}</h1>
                    <div className="lesson-content">{this.state.data.content}</div>
                    <Button label="Test yourself" />
                </div>
            </ScrollPanel>
        ) : <div />;
    }
}

export default Lesson;