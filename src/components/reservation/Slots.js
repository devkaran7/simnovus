import { useState } from "react";
import { useEffect } from "react";
import Card from "../UI/Card";
import "./Slots.css";

const Slots = (props) => {
  //we have the access of ue_name as ue_id;
  const allSlots = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23,
  ];
  const [slotList, setSlotList] = useState([]);
  useEffect(() => {
    const func = async () => {
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
    };
    func();
  }, [setSlotList, props.ue_name]);
  const bookSlotHandler = async (event) => {
    // console.log(slotList);
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
    setSlotList((prev) => {
      return prev.filter((s) => s !== +event.target.value);
    });
  };
  if (slotList.length === 0) {
    return <h2> No slots available </h2>;
  }
  console.log(slotList);

  return (
    <Card className="slots">
      <h2> Pick a time slot: </h2>
      {allSlots.map((slot) => (
        <button
          className={`btn ${
            !slotList.find((s) => s === slot) && "btn-disabled"
          }`}
          type="button"
          key={slot}
          onClick={bookSlotHandler}
          value={slot}
          disabled={!slotList.find((s) => s === slot)}
        >
          {`${slot}:00 to ${(slot + 1) % 24}:00`}
        </button>
      ))}
    </Card>
  );
};

export default Slots;
