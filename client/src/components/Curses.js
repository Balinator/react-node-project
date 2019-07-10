import React, { Component } from "react";
import data from '../data.json';
import CurseSmall from './CurseSmall';
import '../css/style.scss';
import {Accordion,AccordionTab} from 'primereact/accordion';

class Curses extends Component {
  constructor() {
    super();
    this.state = { data: [], activeIndex: 0 };
  }

  render() {
    return (
      <div className="cursesPage">
        <h1>Curses</h1>
        <Accordion activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({activeIndex: e.index})}>
          <AccordionTab header='Curses'>
            <div className="curses">
              {this.state.data}
            </div>
          </AccordionTab>
        </Accordion>

      </div>
    );
  }

  componentDidMount() {
    Promise.resolve(data)
      .then(res => {
        let list = [];
        res.forEach(curs => {
          list.push(<CurseSmall key={curs.id} data={curs} />);
        });
        this.setState({ data: list, activeIndex: 0 });
      })
      .catch(e => console.log(e));
  }
}

export default Curses;