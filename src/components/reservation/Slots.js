import { useState } from "react";
import { useEffect } from "react";
import Card from "../UI/Card";
import "./Slots.css";

const Slots = (props) => {
  //we have the access of ue_name as ue_id;
  const [slotList, setSlotList] = useState([]);
  useEffect(async () => {
    try {
      const response = await fetch("http://localhost:1337/api/getslots", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ue_name: props.ue_name,
        }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setSlotList(data.slots);
    } catch (e) {
      console.log(e.message);
    }
  }, [setSlotList]);
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
  if (slotList.length === 0) {
    return <h2>No slots available</h2>;
  }
  return (
    <Card className="slots">
      <h2>Pick a time slot:</h2>
      {slotList.map((slot) => (
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
