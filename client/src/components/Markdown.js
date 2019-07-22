import React, { Component } from 'react';
import TextInput from './TextInput';
import TextOutput from './TextOutput';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: ''
        };
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(e) {
        this.setState({
            userInput: e.target.value
        });
        this.props.fgh(e.target.value);
        console.log(this.state.userInput);
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <TextInput handleInput={this.handleUserInput} value={this.state.userInput} />
                    <TextOutput input={this.state.userInput} />
                </div>
            </div>
        );
    }
}

export default App;