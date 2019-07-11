import React, { Component } from "react";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { Redirect } from 'react-router-dom'

class Hamburger extends Component {

    state = {
        redirect: false,
        test: false,
        id: null
    }
    setRedirect(id, test) {
        this.setState({
            redirect: true,
            test: test,
            id: id
        })
    }
    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to={'/curse/' + this.props.curseId + (this.state.test ? '/groupTest/' : '/lesson/') + this.state.id} />
        }
    }
    componentDidMount() {
    }

    render() {
        return (
            <div className="hamburger">
                {this.renderRedirect()}
                <Accordion multiple={true}>
                    {this.generateAccordions()}
                </Accordion>
            </div>
        );
    }

    generateAccordions() {
        let accordionTabs = [];
        let key = 0;
        if (this.props.data) {
            this.props.data.forEach(lessonGroup => {
                accordionTabs.push(
                    <AccordionTab key={++key} header={lessonGroup.name}>
                        <p>{lessonGroup.description}</p>
                        <div>
                            {this.generateLessons(lessonGroup.lessons)}
                        </div>
                        {lessonGroup.test !== null ?
                            <div><Button label={lessonGroup.test.title} onClick={() => this.setRedirect(lessonGroup.test.id, true)}></Button></div> : <div />
                        }
                    </AccordionTab>
                );
            });
        }
        return accordionTabs;
    }

    generateLessons(lessons) {
        let accordionTabs = [];
        let key = 0;
        lessons.forEach(lesson => {
            accordionTabs.push(
                <Button key={++key} label={lesson.title} onClick={() => this.setRedirect(lesson.id, false)} />
            );
        });
        return accordionTabs;
    }
}

export default Hamburger;