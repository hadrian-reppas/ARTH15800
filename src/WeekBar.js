const WeekBar = (props) => {
  const active_style = 'block rounded-md bg-sky-500 text-white hover:bg-sky-700';
  const disabled_style = 'block py-1.9 rounded-md bg-gray-300 text-black hover:bg-gray-400';
  return (
    <div className="grid w-full grid-cols-9 gap-x-4 mx-36 my-4 pt-3">
      <input
        className={props.weeks[0] ? active_style : disabled_style}
        type="button"
        value="Week 1"
        onClick={() => { props.handleWeek(0); }}
        tabindex="-1"
      />
      <input
        className={props.weeks[1] ? active_style : disabled_style}
        type="button"
        value="Week 2"
        onClick={() => { props.handleWeek(1); }}
        tabindex="-1"
      />
      <input
        className={props.weeks[2] ? active_style : disabled_style}
        type="button"
        value="Week 3"
        onClick={() => { props.handleWeek(2); }}
        tabindex="-1"
      />
      <input
        className={props.weeks[3] ? active_style : disabled_style}
        type="button"
        value="Week 4"
        onClick={() => { props.handleWeek(3); }}
        tabindex="-1"
      />
      <input
        className={props.weeks[4] ? active_style : disabled_style}
        type="button"
        value="Week 5"
        onClick={() => { props.handleWeek(4); }}
        tabindex="-1"
      />
      <input
        className={props.weeks[5] ? active_style : disabled_style}
        type="button"
        value="Week 6"
        onClick={() => { props.handleWeek(5); }}
        tabindex="-1"
      />
    </div >
  );
};

export default WeekBar;