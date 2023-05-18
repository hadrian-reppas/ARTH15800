import React, { Component } from 'react';
import Form from './Form';
import WeekBar from './WeekBar.js';

import art from './art.json';
import images from './img/images.js';

class App extends Component {
  state = {
    index: 0,
    order: shuffle(Array.from(Array(art.length).keys())),
    extra: [],
    check: false,
    weeks: new Array(8).fill(true)
  };

  render() {
    const id = this.state.order[this.state.index];
    const { title, artist, range } = art[id];

    return (
      <div className="flex h-screen">
        <div className="max-w-6xl m-auto">
          <div className="flex">
            <img className="h-96 mb-8 mx-auto" alt="" src={images[id]} />
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
    console.log(this.state.extra);
    if (this.state.check) {
      if (correct) {
        const { extra, order, index } = this.state;
        if (extra.length > 0 && extra[0] !== order[index] && Math.random() < 0.25) {
          const new_id = extra[0];
          const new_extra = shuffle(extra.slice(1));
          const new_order = shuffle(order);
          this.setState({
            index: new_order.indexOf(new_id),
            extra: new_extra,
            order: new_order,
            check: false
          });
          return;
        }

        var new_index = index + 1;
        while (true) {
          new_index = new_index + 1;
          if (new_index === art.length) {
            this.setState({
              order: shuffle(this.state.order)
            });
            new_index = 0;
          } else if (this.state.weeks[art[order[new_index]].week - 1]) {
            this.setState({
              index: new_index,
              check: false
            });
            return;
          }
        }
      } else {
        const new_extra = [...this.state.extra, this.state.order[this.state.index]];
        this.setState({ check: false, extra: new_extra });
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
