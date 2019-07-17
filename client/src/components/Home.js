import React, { Component } from "react";
import { Panel } from 'primereact/panel';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import CurseSmall from './CurseSmall';
import { Accordion, AccordionTab } from 'primereact/accordion';
import fetchFromHost from '../FetchFromServer';

class Home extends Component {
  i = 1;
  constructor() {
    super();
    this.state = { data: [], activeIndex: 0 };
  }

  render() {
    const header = (
      <img alt="Card" src='https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2018/05/Wyvern-programming-languages-in-one.jpg' height="150" width="80" />
    );
    const footer = (
      <span>
        <Button label="Start" icon="pi pi-check" />
        <Button label="Continue" icon="pi pi-times" />
      </span>
    );
    return (

      <div>
        <div className="content-section introduction">
          <div className="feature-intro">
            <h1>The mastery of E-learning</h1>
          </div>
        </div>

        <div className="content-section implementation">
          <Panel header="Description" style={{ marginTop: '2em' }} toggleable={true}>
            <p>Here we come with this brand new E-learning style, where everybody can find their intrested areas and learn about it.
              This site give you a chanche to learn new stuff, mainly thoose informations what can not be found anywhere else and maybe
              it is the most important part of the learning, thoose informations which are going to help you to find your place in work,
              in society and most important in life.
              We dont share thoose irrelevant informations which would slow your progression but on the contrary we are reducing the mass
              of information.
                        </p>
          </Panel>

          <Panel header="Why should I use it?" style={{ marginTop: '2em' }} toggleable={true}>
            <p>First of all this page isn't a simple e-learning page which only gives you information to improve yourself alone but on the
              contrary it gives you chanche to colaborate with other professors, to gain information about the latest researches and together
              improve yourself.
              This will change everything, e-learning won't be anymore that annoying but so much fun, together, with a new society, with a new
              source of information which we will get from teachers.
              This site gonna be an virtual university just like in the reality but you won't need to go to the university's place, you should not
              get up early morning tired and bored. You could learn whenever you want, u colud take the testes whenever you have time for it.
              So why u woulnd't choose the simply way of learning?
                        </p>
          </Panel>
        </div>
        <div>
          <h2>Trendy Courses</h2>
        </div>
        <div className="cursesPage">
          <Accordion activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({ activeIndex: e.index })}>
            <AccordionTab header='Curses'>
              <div className="curses">
                  { this.state.data }
              </div>
            </AccordionTab>
          </Accordion>

        </div>
      </div>
    )
  }
  componentDidMount() {
    fetchFromHost("/api/data")
      .then(async res => {
        let json = await res.json();
        let list = [];
        json.forEach(curs => {
          list.push(<CurseSmall key={curs.id} data={curs} />);
        });
        this.setState({ data: list, activeIndex: 0 });
      })
      .catch(e => console.log(e));
  }
}


export default Home;