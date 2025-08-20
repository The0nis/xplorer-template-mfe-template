import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerComponentProps {
  value: Date | null;
  onChange: (value: Date | null) => void;
  showTimeSelect?: boolean;
  minDate?: Date;
  maxDate?: Date;
  placeholderText?: string;
  addClassStyle?: string;
}

const DateTimePickerComponent: React.FC<DatePickerComponentProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  addClassStyle,
  showTimeSelect = false,
  placeholderText
}) => {
  return (
    <div className="w-full">
      <DatePicker
        selected={value ? new Date(value) : null}
        onChange={onChange}
        showTimeSelect={showTimeSelect}
        // dateFormat={showTimeSelect ? "Pp" : "P"}
        timeIntervals={5} // Optional: time step in minutes
        timeCaption="Time"
        dateFormat={showTimeSelect ? "MMMM d, yyyy h:mm aa" : "MMMM d, yyyy"}
        minDate={minDate}
        maxDate={maxDate}
        placeholderText={placeholderText}
        className={`xplorer-date-picker ${addClassStyle}`}
      />
    </div>
  );
};

export default DateTimePickerComponent;
