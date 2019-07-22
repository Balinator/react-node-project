import React, { Component } from 'react';
import Markdown from './Markdown';
import { Button } from 'primereact/button';
import TextInput from './TextInput';
import TextOutput from './TextOutput';
import fetchFromHost from '../FetchFromServer';

class HideShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMe: false
    }
  }
  operation() {
    this.setState({
      showMe: !this.state.showMe
    })
  }

  ButtonName() {
    if (this.state.showMe == false)
      return <Button onClick={() => this.operation()} label='Edit'></Button>;
    else
      return <Button onClick={() => this.operation()} label='Finish'></Button>;
  }

  render() {
    return (
      <div>
        {
          this.state.showMe ?
            <div>

              <Markdown fgh={e => {
                fetchFromHost('/api/course/' + this.props.coursId + '/homepage', {
                  method: 'POST', // *GET, POST, PUT, DELETE, etc.
                  mode: 'cors', // no-cors, cors, *same-origin
                  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                  credentials: 'same-origin', // include, *same-origin, omit
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  redirect: 'follow', // manual, *follow, error
                  referrer: 'no-referrer', // no-referrer, *client
                  body: JSON.stringify({
                    data: e
                  })
              });
                this.setState({ userInput: e })
              }
              }></Markdown>
            </div>
            : this.state.userInput ? <TextOutput input={this.state.userInput} /> : null
        }
        <Button label={this.ButtonName()}></Button>
      </div>
    )
  }
}

export default HideShow;