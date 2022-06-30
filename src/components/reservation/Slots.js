import Card from "../UI/Card";
import "./Slots.css";

const Slots = (props) => {
  const DUMMY_SLOTS = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  const bookSlotHandler = async (event) => {
    console.log(event.target.value);
    console.log(props.ue_name);
    console.log(props.date);
    //send the http request
    try {
      const response = await fetch("http://localhost:1337/api/reserve", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ue_name: props.ue_name,
          date: props.date,
          time: event.target.value,
        }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      alert(data.message);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <Card className="slots">
      <h2>Pick a time slot:</h2>
      {DUMMY_SLOTS.map((slot) => (
        <button
          className="btn"
          type="button"
          key={slot}
          onClick={bookSlotHandler}
          value={slot}
        >
          {`${slot}:00 to ${(slot + 1) % 24}:00`}
        </button>
      ))}
    </Card>
  );
};

export default Slots;
