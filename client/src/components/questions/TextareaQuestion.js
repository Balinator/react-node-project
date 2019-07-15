import React from "react";
import Question from './Question';
import { InputTextarea } from 'primereact/inputtextarea';

class TextareaQuestion extends Question {

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
            <div className="question-textarea">
                <h3>{this.props.question}</h3>
                <InputTextarea value={this.state.value} onChange={(e) => this.handleChange(e.target.value)}/>
            </div>
        );
    }
}

export default TextareaQuestion;