import React, { Component } from 'react';

class Form extends Component {
  initialState = {
    title: '',
    artist: '',
    year: '',
    correct_title: false,
    correst_artist: false,
    correct_year: false,
    all_correct: false
  };

  state = this.initialState;

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { title, artist, year } = this.state;
    const gray = 'flex col-span-2 w-full rounded-md pl-3 pr-3 border border-gray-300 text-gray-400';
    const green = 'flex col-span-2 w-full rounded-md pl-3 pr-3 border border-green-500 bg-green-300';
    const red = 'flex col-span-2 w-full rounded-md pl-3 pr-3 border border-rose-500 bg-rose-300 align-middle';
    const active_input = 'col-span-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600';
    const disabled_input = 'col-span-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 pointer-events-none';
    const active_input_small = 'block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600';
    const disabled_input_small = 'block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 pointer-events-none';

    const button_msg = this.props.check ? 'Next' : 'Check';
    const input_style = this.props.check ? disabled_input : active_input;
    const input_style_small = this.props.check ? disabled_input_small : active_input_small;
    const title_msg = this.props.check ? this.props.title[0] : 'Actual title';
    const title_style = this.props.check ? this.state.correct_title ? green : red : gray;
    const artist_msg = this.props.check ? this.props.artist[0] : 'Actual artist';
    const artist_style = this.props.check ? this.state.correct_artist ? green : red : gray;
    const year_style = this.props.check ? this.state.correct_year ? green : red : gray;
    var year_msg = 'Actual year';
    if (this.props.check) {
      if (this.props.range[0] === this.props.range[1]) {
        year_msg = `${this.props.range[0]}`;
      } else {
        year_msg = `${this.props.range[0]}-${this.props.range[1]}`;
      }
    }

    return (
      <form className="grid grid-cols-4 gap-x-8 gap-4 mx-36" autocomplete="off">
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          className={input_style}
          placeholder="Guess title"
          onChange={this.handleChange}
        />
        <div className={title_style}>
          <div className="my-auto whitespace-nowrap truncate">
            {title_msg}
          </div>
        </div>
        <input
          type="text"
          name="artist"
          id="artist"
          value={artist}
          className={input_style}
          placeholder="Guess artist"
          onChange={this.handleChange}
        />
        <div className={artist_style}>
          <div className="my-auto whitespace-nowrap truncate">
            {artist_msg}
          </div>
        </div>
        <input
          type="text"
          name="year"
          id="year"
          value={year}
          className={input_style_small}
          placeholder="Guess year"
          onChange={this.handleChange}
        />
        <input
          className="block px-3 py-1.9 rounded-md bg-sky-500 text-white hover:bg-sky-700"
          type="button"
          value={button_msg}
          onClick={this.submitForm}
        />
        <div className={year_style}>
          <div className="my-auto whitespace-nowrap truncate">
            {year_msg}
          </div>
        </div>
      </form>
    );
  }

  submitForm = () => {
    if (this.props.check) {
      this.setState(this.initialState);
    } else {
      const { title, artist, year } = this.state;
      const lo = this.props.range[0], hi = this.props.range[1];
      const correct_year = lo <= parseInt(year) && parseInt(year) <= hi;

      var correct_title = false;
      const ntitle = JSON.stringify(normalize(title));
      for (var i = 0; i < this.props.title.length; i++) {
        if (ntitle === JSON.stringify(normalize(this.props.title[i]))) {
          correct_title = true;
          break;
        }
      }

      var correct_artist = false;
      const nartist = JSON.stringify(normalize(artist));
      for (var j = 0; j < this.props.artist.length; j++) {
        if (nartist === JSON.stringify(normalize(this.props.artist[j]))) {
          correct_artist = true;
          break;
        }
      }
      this.setState({
        correct_title: correct_title,
        correct_artist: correct_artist,
        correct_year: correct_year,
        correct: correct_title && correct_artist && correct_year
      });
    }
    this.props.handleSubmit(this.state.correct);
  }
}

function normalize(s) {
  const split = s.split(/[ ,\-'#:]/);
  const normalized = split.filter(s => s !== '').map(s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
  return normalized;
}

export default Form;
