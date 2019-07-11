import React, { Component } from "react";
import data from '../data/data.json';
import { Button } from 'primereact/button';
import { Redirect } from 'react-router-dom'

class Lesson extends Component {

    state = {
        redirect: false
    }

    setRedirect() {
        this.setState({
            redirect: true
        })
    }

    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to={'/curse/' + this.props.curseId + '/group/' + this.props.groupId + '/lesson/' + this.props.lessonId + '/test'} />
        }
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
                this.setState({ data: lesson, redirect: false });
            })
            .catch(e => console.log(e));
    }

    render() {
        return this.state.data ? (
            <div className="lesson">
                {this.renderRedirect()}
                <h1>{this.state.data.title}</h1>
                <div className="lesson-content">{this.state.data.content}</div>
                <Button label="Test yourself" onClick={()=>this.setRedirect()} />
            </div>
        ) : <div />;
    }
}

export default Lesson;