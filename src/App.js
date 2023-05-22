import React, { Component } from 'react';
import Form from './Form';
import WeekBar from './WeekBar.js';

import art from './art.json';
import images from './img/images.js';

class App extends Component {
  state = {
    index: Math.floor(Math.random() * art.length),
    extra: [],
    check: false,
    weeks: new Array(8).fill(true)
  };

  render() {
    const { index } = this.state;
    const { title, artist, range } = art[index];

    return (
      <div className="flex h-screen">
        <div className="max-w-6xl m-auto">
          <div className="flex">
            <img className="h-96 mb-8 mx-auto" alt="" src={images[index]} />
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
        const { extra, index, weeks } = this.state;
        if (extra.length > 0 && extra[0] !== index && Math.random() < 0.33) {
          const new_index = extra[0];
          const new_extra = shuffle(extra.slice(1));
          this.setState({
            index: new_index,
            extra: new_extra,
            check: false
          });
          console.log(this.state.extra.map(id => art[id].title[0]));
          return;
        }

        var new_index = Math.floor(Math.random() * art.length);
        while (!weeks[art[new_index].week - 1] || new_index === index) {
          new_index = Math.floor(Math.random() * art.length);
        }
        this.setState({
          index: new_index,
          check: false
        });
        console.log(this.state.extra.map(id => art[id].title[0]));
      } else {
        const new_extra = [...this.state.extra, this.state.index];
        this.setState({ check: false, extra: new_extra });
        console.log(this.state.extra.map(id => art[id].title[0]));
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

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export default App;
