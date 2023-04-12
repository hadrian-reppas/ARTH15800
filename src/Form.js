import React, { Component } from 'react';

class Form extends Component {
  initialState = {
    title: '',
    artist: '',
    year: ''
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

    var title_msg, title_style;
    var artist_msg, artist_style;
    var year_msg, year_style;
    var button_msg, input_style, input_style_small;
    if (this.props.check) {
      // TODO
      title_style = red;
      artist_style = red;
      title_msg = this.props.title[0];
      artist_msg = this.props.artist[0];

      const lo = this.props.range[0], hi = this.props.range[1];
      if (lo === hi) {
        year_msg = `${lo}`;
      } else {
        year_msg = `${lo}-${hi}`;
      }

      if (lo <= parseInt(year) && parseInt(year) <= hi) {
        year_style = green;
      } else {
        year_style = red;
      }

      const ntitle = JSON.stringify(normalize(title));
      for (var i = 0; i < this.props.title.length; i++) {
        if (ntitle === JSON.stringify(normalize(this.props.title[i]))) {
          title_style = green;
          break;
        }
      }

      const nartist = JSON.stringify(normalize(artist));
      for (var j = 0; j < this.props.artist.length; j++) {
        if (nartist === JSON.stringify(normalize(this.props.artist[j]))) {
          artist_style = green;
          break;
        }
      }

      button_msg = 'Next';
      input_style = disabled_input;
      input_style_small = disabled_input_small;
    } else {
      title_msg = 'Actual title'
      title_style = gray;
      artist_msg = 'Actual artist';
      artist_style = gray;
      year_msg = 'Actual year';
      year_style = gray;
      button_msg = 'Check';
      input_style = active_input;
      input_style_small = active_input_small;
    }

    return (
      <form className="grid grid-cols-4 gap-x-8 gap-4 mx-36" autocomplete="off">
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          className={input_style}
          placeholder="Title"
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
          placeholder="Artist"
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
          placeholder="Year"
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
    }
    this.props.handleSubmit(this.state);
  }
}

function normalize(s) {
  const split = s.split(/[ ,\-'#:]/);
  const normalized = split.filter(s => s !== '').map(s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
  return normalized;
}

export default Form;
