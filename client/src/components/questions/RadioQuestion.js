import { RadioButton } from 'primereact/radiobutton';
import Question from './Question';
import React from 'react';

class RadioQuestion extends Question {

    constructor(props) {
        super(props);
        this.state = {
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(answer) {
        this.setState({value: answer})
        this.props.onChange(this.props.id, answer);
    }

    render() {
        return (
            <div className="question-radio">
                <h3>{this.props.question}</h3>
                <div className="buttons">
                    {this.getButtons()}
                </div>
            </div>
        );
    }

    getButtons() {
        let buttons = [];
        let key = 0;
        this.props.answers.forEach(a => {
            let id = 'radio' + key;
            buttons.push(
                <div key={++key}>
                    <RadioButton inputId={id} name={a.answer} onChange={() => this.handleChange(a.answer)} checked={this.state.value === a.answer} />
                    <label htmlFor={id}>{a.answer}</label>
                </div>
            );
        });
        return buttons;
    }
}

export default RadioQuestion;