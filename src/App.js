import React, { Component } from 'react';
import Form from './Form'

import art from './art.json';
import images from './img/images.js';

class App extends Component {
  state = {
    index: Math.floor(Math.random() * art.length),
    check: false,
  };

  render() {
    console.log('index: ' + this.state.index);
    const { title, artist, range } = art[this.state.index];

    return (
      <div className="flex h-screen">
        <div className="max-w-6xl m-auto">
          <div className="flex">
            <img className="h-96 mb-8 mx-auto" alt="" src={images[this.state.index]} />
          </div>
          <div className="flex bp-1">
            <Form handleSubmit={this.handleSubmit} title={title} artist={artist} range={range} check={this.state.check} />
          </div>
        </div >
      </div >
    );
  }

  handleSubmit = (guess) => {
    if (this.state.check) {
      this.setState({
        index: Math.floor(Math.random() * art.length),
        check: false
      });
    } else {
      this.setState({ check: true });
    }
  }
}

export default App;
