import getDate from "../../util/getDate";

const DatePicker = (props) => {
  const pickedDateChangeHandler = (event) => {
    props.onDateChange(event.target.value);
  };
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type="date"
        id={props.id}
        name={props.id}
        onChange={pickedDateChangeHandler}
        min={getDate()}
        max={getDate(props.gap)} // 4 days gap
      />
    </div>
  );
};

export default DatePicker;
