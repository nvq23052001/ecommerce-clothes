/* eslint-disable */
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './index.scss';
import moment from 'moment';
import { TextField } from '@mui/material';

const FORMAT_DATE = 'DD/MM/YYYY';

function buildFormatLongFn(args) {
  return (options = {}) => {
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}

const CustomInput = forwardRef(
  (
    {
      onClick,
      fullWidth,
      date,
      format,
      label,
      handleClear,
      disabled,
      placeholder,
      disableClear,
      error,
      className,
      showRemove
    },
    // eslint-disable-next-line no-unused-var
    ref
  ) => (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={onClick}>
      <TextField
        size="small"
        style={{ width: fullWidth ? undefined : 150 }}
        fullWidth={fullWidth}
        value={date ? moment(date).format(format || FORMAT_DATE) : ''}
        label={label || undefined}
        InputProps={{
          readOnly: true
        }}
        placeholder={placeholder || FORMAT_DATE}
        disabled={disabled}
        error={!className && !!error}
        helperText={className ? undefined : error}
      />
      {fullWidth ? (
        showRemove ? (
          <i
            className="fas fa-times-circle"
            style={{ position: 'absolute', right: 12, fontSize: 14, color: '#aaa', top: 12 }}
            onClick={handleClear}
          />
        ) : (
          <i className="far fa-calendar" style={{ position: 'absolute', right: 16, fontSize: 16, top: 12 }} />
        )
      ) : (
        !disableClear &&
        !disabled && (
          <i
            className="fas fa-times-circle"
            style={{ position: 'absolute', right: 12, fontSize: 14, color: '#aaa' }}
            onClick={handleClear}
          />
        )
      )}
    </div>
  )
);

const CustomDatePicker = ({
  className = '',
  fullWidth,
  minDate,
  maxDate,
  date,
  setDate,
  yearDropdownItemNumber,
  format,
  label,
  disabled,
  rootPortal,
  popperPlacement,
  placeholder,
  style,
  type = 'day',
  disableClear,
  showTimeSelect,
  error,
  errorEmpty,
  view,
  showRemove,
  ...rest
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const touched = useRef(false);

  useEffect(() => {
    if (errorEmpty) touched.current = true;
  }, [errorEmpty]);

  const params = {
    minDate,
    maxDate,
    yearDropdownItemNumber,
    calendarStartDay: 1,
    disabled
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setDate?.(null);
  };

  const customInputParams = {
    fullWidth,
    date,
    label,
    handleClear,
    format: type === 'month' ? 'MM/YYYY' : type === 'year' ? 'YYYY' : format,
    disableClear,
    error: (touched.current || isTouched) && error,
    showRemove
  };

  const smallYear = minDate && maxDate && maxDate.getFullYear() - minDate.getFullYear() + 1;
  const yearItem = smallYear < 8 ? undefined : 150;

  if (view) return <div style={{ marginTop: 10, fontWeight: 500 }}>{moment(date).format(format || FORMAT_DATE)}</div>;

  return (
    <div className={`DatePicker ${className} ${type} font-initial`} style={{ ...style, fontSize: '100%' }}>
      <DatePicker
        showYearDropdown
        showMonthDropdown
        scrollableYearDropdown
        selected={date}
        portalId={rootPortal ? 'root-portal' : undefined}
        popperPlacement={popperPlacement || 'bottom'}
        {...params}
        onChange={(date) => setDate?.(date)}
        customInput={<CustomInput {...customInputParams} />}
        placeholderText={placeholder}
        {...rest}
        locale={'bg'}
        useShortMonthInDropdown
        showMonthYearPicker={type === 'month'}
        showYearPicker={type === 'year'}
        yearItemNumber={12}
        yearDropdownItemNumber={yearItem}
        calendarClassName={`${smallYear ? `small-year-${smallYear}` : undefined} ${showTimeSelect ? 'show-time' : ''}`}
        showTimeSelect={showTimeSelect}
        onClickOutside={() => setIsTouched(true)}
      />
    </div>
  );
};

export default CustomDatePicker;
