import { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import './datePicker.css'

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface DatePickerComponentProps {
  value: Value;
  onChange: (value: Value) => void;
  showIcon?: boolean;
  minDate?: Date;
  maxDate?: Date;
  placeholderText?: string;
  addClassStyle?: string
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  addClassStyle
}) => {
  return (
    <div className="w-full">
      <DatePicker
        onChange={onChange}
        value={value}
        minDate={minDate}
        maxDate={maxDate}
        className={`xplorer-date-picker ${addClassStyle}`}
      />
    </div>
  );
};

export default DatePickerComponent;
