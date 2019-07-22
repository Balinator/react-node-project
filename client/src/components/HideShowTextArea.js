import React, { Component } from 'react';
import Markdown from './Markdown';
import { Button } from 'primereact/button';
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
      return <Button onClick={async () => {
        console.log(this.state.userInput)
        fetchFromHost('/api/course/' + this.props.courseId + '/homepage', {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'no-cors', // no-cors, cors, *same-origin
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: "anyad"
        }).catch(e=>console.debug(e));
        this.operation();
      }} label='Finish'></Button>;
  }

  render() {
    return (
      <div>
        {
          this.state.showMe ?
            <div>

              <Markdown setData={e => {
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