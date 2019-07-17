import React, { Component } from "react";
import Foundation from 'react-foundation';
// Add Foundation to index.js
import './foundation/node_modules/foundation-sites/dist/css/foundation.min.css';

// import components
import { Button, Colors } from 'react-foundation';

class Curses extends Component {
  render() {
    return (
      <div>
        <h2>Home</h2>
        <div className="button-basics-example">
        <Button color={Colors.SUCCESS}>Submit</Button>
        </div>
      </div>
    );
  }
}

export default Curses;