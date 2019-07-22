import React, { Component } from "react";
import HideShowTextArea from './HideShowTextArea';
import {Button} from 'primereact/button';

class CourseHome extends Component {

    render() {
        return (
            <div>
                <div><HideShowTextArea courseId={1}></HideShowTextArea></div>
                
            </div>
        );
    }
}

export default CourseHome;