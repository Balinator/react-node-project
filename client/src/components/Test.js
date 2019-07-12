import React, { Component } from "react";
import data from '../data/data.json';
import { Button } from 'primereact/button';
import { Redirect } from 'react-router-dom';
import { ScrollPanel } from 'primereact/scrollpanel';
import QuestionFactory from './questions/QuestionFactory';

class Test extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };

        this.handleValueChange = this.handleValueChange.bind(this);
    }

    questionObjects = [];

    componentDidMount() {
        Promise.resolve(data)
            .then(res => {
                let curseId = Number.parseInt(this.props.curseId);
                let groupId = Number.parseInt(this.props.groupId);

                let testSource = res.find(c => c.id === curseId)
                    .lessongroups.find(g => g.id === groupId);

                if (this.props.lessonId) {
                    let lessonId = Number.parseInt(this.props.lessonId);
                    testSource = testSource.lessons.find(l => l.id === lessonId);
                }

                this.setState({ data: testSource.test });
            })
            .catch(e => console.log(e));
    }

    render() {
        return this.state.data ? (
            <div className="test">
                <div>
                    <h1>{this.state.data.title}</h1>
                    <p>{this.state.data.description}</p>
                </div>
                <form className="questions">
                    {this.getQuestions()}
                </form>
                <Button label="Finish testing" onClick={() => this.validate(this.state.values)} />
            </div>
        ) : <div />;
    }

    validate(values) {
        let answers = {};
        if (!values) {
            console.log('Please anwser all the questions!');
            return;
        } else {
            this.state.data.questions.forEach(question => {
                if (!values[question.id]) {
                    console.log(question.id + '. question is not answerd!');
                }
            });
        }
        this.state.data.questions.forEach(question => {
            if (values[question.id]) {
                let val = values[question.id];
                answers[question.id] = (val === question.answer);
            }
        });
        this.saveTo(answers);
        
    }

    getFileName(){
        let name = this.props.curseId + '-' + this.props.groupId;
        if(this.props.lessonId) {
            name += '-' + this.props.lessonId;
        }
        return name + '-test-results.json';
    }

    saveTo(answers) {
        window.localStorage.setItem(
            this.getFileName(),
            JSON.stringify(answers)
        )
    }

    handleValueChange(field, value) {
        this.setState(old => {
            if (!old.values) {
                old.values = [];
            }
            old.values[field] = value;
            return {
                values: old.values
            };
        });
    }

    getQuestions() {
        let questions = [];
        let key = 0;
        this.state.data.questions.forEach(question => {
            let questionObject = QuestionFactory.create(question, this.handleValueChange);
            this.questionObjects.push(questionObject);
            questions.push(this.keyWrap(questionObject, ++key));
        });
        questions = questions.filter(q => q);

        return questions;
    }

    keyWrap(question, key) {
        if (key && question) {
            return <div key={key}>{question}</div>;
        }
        return question;
    }
}

export default Test;