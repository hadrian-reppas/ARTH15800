import React, { Component } from 'react';
import Form from './Form';
import WeekBar from './WeekBar.js';

import art from './art.json';
import images from './img/images.js';

class App extends Component {
  state = {
    index: Math.floor(Math.random() * art.length),
    check: false,
    weeks: new Array(8).fill(true)
  };

  render() {
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
          <div className="flex bp-1">
            <WeekBar weeks={this.state.weeks} handleWeek={this.handleWeek} />
          </div>
        </div >
      </div >
    );
  }

  handleSubmit = (correct) => {
    if (this.state.check) {
      if (correct) {
        var new_index = Math.floor(Math.random() * art.length);
        while (!this.state.weeks[art[new_index].week - 1] || new_index === this.state.index) {
          new_index = Math.floor(Math.random() * art.length);
        }
        this.setState({
          index: new_index,
          check: false
        });
      } else {
        this.setState({ check: false });
      }
    } else {
      this.setState({ check: true });
    }
  }

  handleWeek = (week) => {
    var weeks = [...this.state.weeks];
    weeks[week] = !weeks[week];
    if (!weeks.every(x => x === false)) {
      this.setState({ weeks: weeks });
    }
  }
}

export default App;
