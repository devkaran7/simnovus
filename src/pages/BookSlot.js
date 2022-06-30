import isAuth from "../isAuth";
import { useHistory } from "react-router-dom";
import "./BookSlot.css";
import { useState } from "react";
import Dropdown from "../components/UI/Dropdown";
import DatePicker from "../components/UI/DatePicker";
import Slots from "../components/reservation/Slots";

const BookSlot = (props) => {
  const history = useHistory();
  if (!isAuth()) {
    history.replace("/login");
  }
  const [ueId, setUeId] = useState("none");
  const [pickedDate, setPickedDate] = useState("");
  const DUMMY_UE = ["ue_1", "ue_2", "ue_3", "ue_4"];

  return (
    <div className="centered">
      <form className="form-control-bookslot">
        <Dropdown
          id="ue"
          options={DUMMY_UE}
          label="Select an UE "
          onOptionChange={setUeId}
          name={ueId}
        />
        {ueId !== "none" && (
          <DatePicker
            id="date"
            label="Date "
            onDateChange={setPickedDate}
            gap="0"
          />
        )}
        {pickedDate && (
          <Slots ue_name = {ueId} date = {pickedDate}/>
        )}
      </form>
    </div>
  );
};

export default BookSlot;
