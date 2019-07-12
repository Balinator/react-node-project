import React, { Component } from "react";
import data from '../data/data.json';
import Hamburger from './Hamburger';
import Lesson from './Lesson';
import Test from './Test';
import { Route } from "react-router-dom";
import { ScrollPanel } from 'primereact/scrollpanel';

class TestResult extends Component {

    state = {
    }

    getFileName() {
        let name = this.props.curseId + '-' + this.props.groupId;
        if (this.props.lessonId) {
            name += '-' + this.props.lessonId;
        }
        return name + '-test-results.json';
    }

    /**
     * 
     */
    componentDidMount() {
        Promise.resolve(window.localStorage.getItem(this.getFileName()))
            .then(res => {
                this.setState({ data: res });
            })
            .catch(e => console.log(e));
    }

    render() {
        return this.state.data ? (
            <div className="testResults">
                <pre>
                    {JSON.stringify(this.state.data, null, 2)}
                </pre>
            </div>
        ) : <div />;
    }
}

export default TestResult;