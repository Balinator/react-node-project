import React, { Component } from "react";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Redirect } from 'react-router-dom'

class CurseSmall extends Component {

  state = {
    redirect: false
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={'/curse/' + this.props.data._id} />
    }
  }

  render() {
    return (
      <div className="smallCurs">
        {this.renderRedirect()}
        <Card title={this.props.data.name} footer={<Button label='Learn more' onClick={this.setRedirect} />}>
          <p>{this.props.data.description}</p>
        </Card>
      </div>
    );
  }
}

export default CurseSmall;