import React from "react";
import TextareaQuestion from './TextareaQuestion';
import RadioQuestion from './RadioQuestion';

class QuestionFactory {
    static create(question, handle) {
        switch (question.questionType) {
            case 'textarea':
                return <TextareaQuestion id={question.id} question={question.question} answer={question.correct[0]} onChange={handle}/>;
            case 'radio':
                return <RadioQuestion id={question.id} question={question.question} answers={question.answers} answer={question.correct[0]} onChange={handle}/>
            default:
                return undefined;
        }
    }
}

export default QuestionFactory;