import React, { Component } from "react";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { Redirect } from 'react-router-dom'
import { ScrollPanel } from 'primereact/scrollpanel';

class Hamburger extends Component {

    state = {
        redirect: false,
        test: false,
        id: null
    }
    setRedirect(lessonId, groupId, test) {
        this.setState({
            redirect: true,
            test: test,
            groupId: groupId,
            lessonId: lessonId
        })
    }
    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to={'/curse/' + this.props.curseId + '/group/' + this.state.groupId + (this.state.test ? '/test' : '/lesson/' + this.state.lessonId)} />
        }
    }
    componentDidMount() {
    }

    render() {
        return (
            <div className="hamburger">
                {this.renderRedirect()}
                <ScrollPanel className="scroll">
                    <Accordion multiple={true}>
                        {this.generateAccordions()}
                    </Accordion>
                </ScrollPanel>
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
                            {this.generateLessons(lessonGroup.lessons, lessonGroup.id)}
                        </div>
                        {lessonGroup.test !== null ?
                            <div><Button label={lessonGroup.test.title} onClick={() => this.setRedirect(lessonGroup.id, lessonGroup.id, true)}></Button></div> : <div />
                        }
                    </AccordionTab>
                );
            });
        }
        return accordionTabs;
    }

    generateLessons(lessons, groupId) {
        let accordionTabs = [];
        let key = 0;
        lessons.forEach(lesson => {
            accordionTabs.push(
                <Button key={++key} label={lesson.title} onClick={() => this.setRedirect(lesson.id, groupId, false)} />
            );
        });
        return accordionTabs;
    }
}

export default Hamburger;