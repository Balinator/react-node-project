import React, { Component } from "react";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { Redirect } from 'react-router-dom'
import { ScrollPanel } from 'primereact/scrollpanel';
import fetchFromHost from "../FetchFromServer";

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
            return <Redirect exact strict to={'/course/' + this.props.courseId + '/group/' + this.state.groupId + (this.state.test ? '/test' : '/lesson/' +
                this.state.lessonId)} />
        }
    }

    render() {
        return (
            this.state.lessons && this.state.tests ?
                <div className="hamburger">
                    {this.renderRedirect()}
                    <ScrollPanel className="scroll">
                        <Accordion multiple={true}>
                            {this.generateAccordions()}
                        </Accordion>
                    </ScrollPanel>
                </div>
                : <div></div>);
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
                            {this.generateLessons(lessonGroup.lessons, lessonGroup._id)}
                        </div>
                        {lessonGroup.test ?
                            <div><Button label={this.getTest(lessonGroup.test).title} onClick={() => this.setRedirect(lessonGroup._id, lessonGroup._id, true)}></Button></div> : <div />
                        }
                    </AccordionTab>
                );
            });
        }
        return accordionTabs;
    }

    componentDidMount() {
        fetchFromHost("/api/lesson").then(async res => {
            let json = await res.json();
            this.setState({ lessons: json });
        }).catch(e => console.log(e));
        fetchFromHost("/api/test").then(async res => {
            let json = await res.json();
            this.setState({ tests: json });
        }).catch(e => console.log(e));
    }

    getTest(testId) {
        return this.state.tests.find(test => test._id === testId);
    }

    generateLessons(lessons, groupId) {
        let accordionTabs = [];
        let key = 0;
        lessons.forEach(async lessonId => {
            let lesson = this.state.lessons.find(lessonTemp => lessonTemp._id === lessonId);
            if (lesson) {
                accordionTabs.push(
                    <Button key={++key} label={lesson.title} onClick={() => this.setRedirect(lesson._id, groupId, false)} />
                );
            }
        });
        return accordionTabs;
    }
}

export default Hamburger;