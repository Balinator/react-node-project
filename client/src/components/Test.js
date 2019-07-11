import React, { Component } from "react";
import data from '../data/data.json';
import { Button } from 'primereact/button';
import { Redirect } from 'react-router-dom'
import { ScrollPanel } from 'primereact/scrollpanel';

class Test extends Component {

    state = {
    }

    componentDidMount() {
        Promise.resolve(data)
            .then(res => {
                let curseId = Number.parseInt(this.props.curseId);
                let groupId = Number.parseInt(this.props.groupId);

                let test = res.find(e => e.id === curseId)
                    .lessongroups.find(g => g.id === groupId).test;
                this.setState({ data: test });
            })
            .catch(e => console.log(e));
    }

    render() {
        return this.state.data ? (
            <ScrollPanel className="scroll">
                <div className="test">
                    {JSON.stringify(this.state.data)}
                </div>
            </ScrollPanel>
        ) : <div />;
    }
}

export default Test;