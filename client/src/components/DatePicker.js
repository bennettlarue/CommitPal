import React, { useState } from "react";
import { ReactDOM } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DatePicker = ({ handleDateChange }) => {
    const [date, setDate] = useState(new Date());
    const onDateChange = (newDate) => {
        setDate(newDate);
        handleDateChange(newDate);
        //console.log(newDate);
    };
    return (
        <Calendar
            onChange={onDateChange}
            value={date}
            showNeighboringMonth={false}
            locale={"en-US"}
        />
    );
};

export default DatePicker;
