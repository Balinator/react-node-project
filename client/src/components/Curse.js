import React, { Component } from "react";
import { Card } from 'primereact/card';
import data from '../data.json';

class Curse extends Component {

  state = {
    data: {
      name: ""
    }
  }

  componentDidMount() {
    Promise.resolve(data)
      .then(res => {
        console.log(this.props.id);
        console.log(res);
        let curse = res.find(e=>e.id == this.props.id);
        console.log(curse);
        this.setState({ data: curse});
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <div className="curse">
        <Card title={this.state.data.name}>
          <p>{JSON.stringify(this.state.data, null, 4)}</p>
        </Card>
      </div>
    );
  }
}

export default Curse;