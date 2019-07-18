import React, { Component } from "react";
import { Button } from 'primereact/button';
import { Redirect } from 'react-router-dom';
import fetchFromHost from '../FetchFromServer';

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
            return <Redirect to={'/course/' + this.props.courseId + '/group/' + this.props.groupId + '/lesson/' + this.props.lessonId + '/test'} />
        }
    }

    componentDidMount() {
        fetchFromHost("/api/lesson/" + this.props.lessonId)
            .then(async res => {
                let data = await res.json();
                console.log(data)
                this.setState({ data: data, redirect: false });
            })
            .catch(e => console.log(e));
    }

    render() {
        console.log('s')
        return this.state.data ? (
            <div className="lesson">
                {this.renderRedirect()}
                <h1>{this.state.data.title}</h1>
                <div className="lesson-content">{this.state.data.content}</div>
                <Button label="Test yourself" onClick={() => this.setRedirect()} />
            </div>
        ) : <div />;
    }
}

export default Lesson;