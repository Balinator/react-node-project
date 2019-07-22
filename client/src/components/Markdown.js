import React, { Component } from 'react';
import TextInput from './TextInput';
import TextOutput from './TextOutput';
import {Button} from 'primereact/button';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            userOutput: '',
            isPreview: false
        };
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(e) {
        this.setState({
            userInput: e.target.value
        });
        this.props.setData(e.target.value);
        //console.log(this.state.userInput);
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    {
                        !this.state.isPreview ?
                            <TextInput handleInput={this.handleUserInput} value={this.state.userInput} /> :
                            <TextOutput input={this.state.userInput} />
                    }
                    <Button label='Preview' onClick={()=>this.setState(old=>{return {isPreview: !old.isPreview}})} />
                </div>
            </div>
        );
    }
}

export default App;