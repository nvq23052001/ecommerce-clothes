import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import TopLabel from './TopLabel';
import './index.scss';
import currency from 'utils/currency';

const Input = React.forwardRef((props, ref) => {
  const [isFocusing, setIsFocusing] = useState(false);

  const {
    fullWidth = true,
    type = 'text',
    name = '',
    label = '',
    error,
    value,
    onFocus,
    onBlur,
    variant = 'outlined',
    errorFocused,
    onKeyDown,
    blurWhenEnter,
    maxLength,
    inputProps,
    InputProps,
    size = 'small',
    topLabel,
    required,
    placeholder,
    resetShowPassword,
    disabled,
    className = '',
    multiline,
    isPrice,
    ...rest
  } = props;

  const isSmall = size === 'small';
  const isPassword = type === 'password';

  const [passwordShown, setPasswordShown] = useState(!isPassword);

  /**
   * When input is focus, save status focus to this field name
   */
  const handleFocus = useCallback(
    (e) => {
      setIsFocusing(true);
      onFocus?.(e);
    },
    [onFocus]
  );

  /**
   * Reset status focus when blur field
   */
  const handleBlur = useCallback(
    (e) => {
      setIsFocusing(false);
      onBlur?.(e);
    },
    [onBlur]
  );

  useEffect(() => {
    setPasswordShown(!isPassword);
  }, [resetShowPassword, isPassword]);

  const invalid = (!isFocusing || errorFocused) && !!error;

  const adornmentPassword = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={() => (isPassword ? setPasswordShown(!passwordShown) : {})} edge="end">
          <i
            style={isSmall ? { fontSize: 20, width: 26 } : { fontSize: 24, width: 32 }}
            className={`icon-password fas fa-eye${passwordShown ? '-slash' : ''}`}
          />
        </IconButton>
      </InputAdornment>
    )
  };

  const helperText = invalid && error !== true ? error : undefined;

  const valuePrice = isPrice && !isFocusing ? (value ? currency(value) : '') : value;

  return (
    <div className={className} style={{ width: fullWidth ? '100%' : undefined }}>
      <TopLabel label={topLabel} disabled={disabled} required={required} />
      <TextField
        {...rest}
        ref={ref}
        size={size}
        multiline={multiline}
        disabled={disabled}
        inputProps={inputProps || { maxLength: isPassword ? 16 : maxLength }}
        fullWidth={fullWidth}
        label={label || undefined}
        name={name}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder || topLabel}
        onKeyDown={(e) => {
          if (blurWhenEnter && e.key === 'Enter') setIsFocusing(false);
          onKeyDown?.(e);
        }}
        type={isPassword ? (passwordShown ? 'text' : 'password') : type}
        value={valuePrice}
        InputProps={isPassword ? adornmentPassword : InputProps}
        error={invalid}
        helperText={helperText}
        variant={variant}
        required={required}
        autoComplete="off"
      />
    </div>
  );
});

export default Input;
