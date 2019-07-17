import React, { Component } from "react";
import { Button } from 'primereact/button';
import { Redirect } from 'react-router-dom';
import fetchFromHost from '../FetchFromServer';
import QuestionFactory from './questions/QuestionFactory';

class Test extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };

        this.handleValueChange = this.handleValueChange.bind(this);
    }

    questionObjects = [];

    componentDidMount() {
        if (this.props.lessonId) {
            fetchFromHost("/api/lesson/" + this.props.lessonId)
            .then(async res => {
                let json = await res.json();
                fetchFromHost("/api/test/" + json.test).then(async test => {
                    this.setState({ data: await test.json() });
                })
                
            })
            .catch(e => console.log(e));
        } else {
            fetchFromHost("/api/course/" + this.props.curseId)
                .then(async res => {
                    let json = await res.json();
                    let testSource = json.lessongroups.find(group => group._id === this.props.groupId);
                    fetchFromHost("/api/test/" + testSource.test).then(async test => {
                        this.setState({ data: await test.json() });
                    })
                })
                .catch(e => console.log(e));
        }
    }

    render() {
        return this.state.data ? (
            <div className="test">
                {this.renderRedirect()}
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

    /**
     * 
     * @param {*} values 
     */
    validate(values) {
        let answers = {};
        if (!values) {
            console.log('Please anwser all the questions!');
            return;
        } else {
            let validate = true;
            this.state.data.questions.forEach(question => {
                if (!values[question.id]) {
                    console.log(question.id + '. question is not answerd!');
                    validate = false;
                    return;
                }
            });
            if (!validate) {
                return;
            }
        }
        this.state.data.questions.forEach(question => {
            let val = values[question.id];
            if (!Array.isArray(val)) {
                answers[question.id] = (question.correct.includes(val));
            }
        });
        this.saveTo(answers);
        this.setRedirect();
    }

    setRedirect() {
        this.setState({
            redirect: true
        });
    }
    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect exact strict to={'/curse/' + this.props.curseId + '/group/' + this.props.groupId + (this.props.lessonId ? '/lesson/' + this.props.lessonId : '') + '/test/result'} />
        }
    }

    getFileName() {
        let name = this.props.curseId + '-' + this.props.groupId;
        if (this.props.lessonId) {
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

    /**
     * bajskfaslkfjlaks
     * 
     * @param {*} question fjsdhfjksdhfjkshd
     * @param {*} key 
     * @returns kljdskgljdslkgjsdg
     */
    keyWrap(question, key) {
        if (key && question) {
            return <div key={key}>{question}</div>;
        }
        return question;
    }
}

export default Test;