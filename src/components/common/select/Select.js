/* eslint-disable */
import { Checkbox, InputAdornment, MenuItem, Popover, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import TopLabel from '../input/TopLabel';
import { isEqual } from 'lodash';
import Input from '../input/Input';
import { formatCompare } from 'utils/common';

const Select = ({
  data = [],
  selected,
  setSelected,
  style,
  fullWidth,
  topLabel,
  disabled,
  required,
  isCheckBox,
  hideSelected,
  popupSearch,
  handleChangeCheckbox,
  selectedItems = [],
  placeholder,
  error,
  errorEmpty,
  ...rest
}) => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const touched = useRef(false);

  let newData = data;
  const value = newData.find((item) => isEqual(item.value, selected))?.label || '';

  // const valueArr = newData.find((item) => item.value === selected)

  const timeoutSearch = useRef();

  const {
    timeout,
    labelNoItems = 'No results',
    placeholder: searchPlaceholder = 'Search',
    onSearch,
    onChange,
    searchFrontend,
    margin
  } = popupSearch || {};

  let noItems = true;

  if (searchFrontend && search) {
    newData = data.map((item) => {
      const value1 = formatCompare(item.label);
      const value2 = formatCompare(search);
      const hide = !value1.includes(value2);
      if (!hide) noItems = false;
      return { ...item, hide };
    });
  } else noItems = false;

  // Search when click item, enter or after 1 second
  const handleSearch = (newValue) => {
    if (!newValue) newValue = value || '';
    onSearch?.(newValue);
  };

  // Open the menu if has data
  const handleOpen = () => {
    if (disabled) return;
    if (data.length) setOpen(true);
  };

  // Close the menu
  const handleClose = () => {
    touched.current = true;
    setOpen(false);
  };

  // When click item, set selected item, set value in textbox and close menu
  const handleClickItem = (item) => {
    setSelected?.(item.value);
    handleSearch(item.value);
    handleClose();
  };

  useEffect(() => {
    // If user not typing after 1s => search
    timeoutSearch.current = setTimeout(handleSearch, 1000);

    return () => clearTimeout(timeoutSearch.current);
  }, [value]);

  useEffect(() => {
    onChange?.(search);

    if (!popupSearch) return;

    if (timeout === 0) {
      handleSearch?.(value);
      return;
    }

    // If user not typing after 1000ms => search
    timeoutSearch.current = setTimeout(handleSearch, timeout || 1000);

    return () => clearTimeout(timeoutSearch.current);
  }, [search]);

  const renderInputSearch = () => {
    if (!popupSearch) return null;

    return (
      <div className="SelectPaper-search" style={{ padding: 12 }}>
        <Input
          autoFocus
          placeholder={searchPlaceholder}
          icon="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          maxLength={50}
        />
      </div>
    );
  };

  useEffect(() => {
    if (errorEmpty) touched.current = true;
  }, [errorEmpty]);

  const errorText = !open && touched.current && !selected ? error : undefined;

  return (
    <div style={{ width: fullWidth ? '100%' : undefined, ...style }} className="TableSelect-readOnly">
      <TopLabel label={topLabel} disabled={disabled} required={required} />
      <TextField
        {...rest}
        fullWidth={fullWidth}
        disabled={disabled}
        size="small"
        ref={anchorRef}
        onClick={handleOpen}
        value={value}
        placeholder={placeholder || (isCheckBox ? 'Select Category' : '')}
        helperText={errorText}
        error={!!errorText}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <svg
                className={`TableSelect-arrow ${open && 'focus'}`}
                viewBox="0 0 24 24"
                width={24}
                height={24}
                style={{ opacity: disabled ? 0.5 : 1 }}
              >
                <path d="M7 10l5 5 5-5z"></path>
              </svg>
            </InputAdornment>
          )
        }}
      />
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        PaperProps={{
          style: { width: anchorRef.current?.getBoundingClientRect().width || 0 }
        }}
        disableAutoFocus
        open={open}
        disableRestoreFocus
        onClose={handleClose}
        anchorEl={anchorRef.current}
      >
        {renderInputSearch()}
        {isCheckBox
          ? newData.map((item) => (
              <div
                key={item.value}
                // style={{
                //   display:
                //     (hideSelected && item.value === selected) || item.hide ? 'none' : undefined,
                // }}
              >
                <Checkbox
                  onChange={() => handleChangeCheckbox?.(item.value)}
                  checked={selectedItems?.includes(item.value)}
                />
                {item.label}
              </div>
            ))
          : newData.map((item) => (
              <MenuItem
                className={`TableSelect-item${selected === item.value ? ' active' : ''}`}
                key={item.value}
                onClick={() => handleClickItem(item)}
              >
                {item.label}
              </MenuItem>
            ))}
      </Popover>
    </div>
  );
};

export default Select;
