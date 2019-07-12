import React from "react";
import TextareaQuestion from './TextareaQuestion';
import RadioQuestion from './RadioQuestion';

class QuestionFactory {
    static create(question, handle) {
        switch (question.type) {
            case 'textarea':
                return <TextareaQuestion id={question.id} question={question.question} answer={question.answer} onChange={handle}/>;
            case 'radio':
                return <RadioQuestion id={question.id} question={question.question} answers={question.answers} answer={question.answer} onChange={handle}/>
            default:
                return undefined;
        }
    }
}

export default QuestionFactory;