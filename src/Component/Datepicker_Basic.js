import React from "react";
import { ko } from "date-fns/esm/locale";
/** CSS Import */
import "react-datepicker/dist/react-datepicker.css";
/** Components Import */
import DatePicker from "react-datepicker";

function BasicDatepicker({
  portalId,
  popperClassName,
  style,
  inputStyle,
  showIcon,
  selected,
  onChange,
  dateFormat,
  disabled,
  className,
  startDate,
  endDate,
  minDate,
  maxDate,
  excludeDateIntervals = [],
  defaultValue,
  readOnly,
  timeFormat,
  timeIntervals,
  timeCaption,
  showTimeSelect,
}) {
  const ChangeDatapicker = (e) => {
    onChange(e);
  };

  return (
    <div style={style}>
      <DatePicker
        style={inputStyle}
        portalId={portalId}
        popperClassName={popperClassName}
        className={className}
        locale={ko}
        showIcon={showIcon}
        selected={selected}
        onChange={ChangeDatapicker}
        dateFormat={dateFormat}
        disabled={disabled}
        startDate={startDate}
        endDate={endDate}
        minDate={minDate}
        maxDate={maxDate}
        excludeDateIntervals={excludeDateIntervals}
        defaultValue={defaultValue}
        readOnly={readOnly}
        showTimeSelect={showTimeSelect}
        timeFormat={timeFormat}
        timeIntervals={timeIntervals}
        timeCaption={timeCaption}
        // withPortal
      />
    </div>
  );
}

BasicDatepicker.defaultProps = {
  style: {
    width: "200px",
    margin: "0px 5px",
  },
  showIcon: false,
  dateFormat: "yyyy-MM-dd",
  disabled: false,
};

export default BasicDatepicker;
