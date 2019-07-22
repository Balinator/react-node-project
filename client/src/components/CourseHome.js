import React, { Component } from "react";
import HideShowTextArea from './HideShowTextArea';
import Course from './Course';

class CourseHome extends Component {

    render() {
        return (
            <div>
                <div><HideShowTextArea courseId={this.props.courseId}></HideShowTextArea></div>
                
            </div>
        );
    }
}

export default CourseHome;