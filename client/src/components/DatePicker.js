import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

/* 
This component is a calendar from which a date can be selected.
It is used when creating goals with the "PostForm" component.
*/

const DatePicker = ({ handleDateChange }) => {
    const [date, setDate] = useState(new Date());
    const onDateChange = (newDate) => {
        setDate(newDate);
        handleDateChange(newDate);
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
