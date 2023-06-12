/*eslint-disable*/
import { Checkbox, CircularProgress, InputAdornment, MenuItem, Popover, TextField } from '@mui/material';
import { Scrollbar } from 'components';
import InputSearch from 'components/common/input/InputSearch';
import TopLabel from 'components/common/input/TopLabel';
import { isEqual } from 'lodash';
import React, { useRef, useState } from 'react';
import { Waypoint } from 'react-waypoint';
import './index.scss';

const SelectLoadMore = (props) => {
  const {
    className,
    selected,
    label,
    setSelected,
    data,
    full,
    loading,
    page,
    onSearch,
    onChange,
    callbackSearch,
    maxLength,
    validation,
    maxHeight,
    style = {},
    topLabel,
    disabled,
    required,
    isCheckBox,
    searchCategory,
    searchPlaceholder,
    setSearch,
    hideSelected,
    selectedItems = [],
    fullWidth,
    handleChangeCheckbox,
    addNewLabel,
    searchKeyWord,
    ...rest
  } = props;

  const [open, setOpen] = useState(false);

  const anchorRef = useRef < HTMLInputElement > null;

  let newData = data;
  const value = newData.find((item) => isEqual(item.value, selected))?.label || '';

  // Search when click item, enter or after 1 second
  const handleSearch = (newValue) => {
    if (!newValue) newValue = value || '';
    onSearch?.(newValue || '');
  };

  const handleLoadmore = () => {
    if (loading || full) return;
    callbackSearch?.((page || 1) + 1);
  };

  const handleClickItem = (item) => {
    setSelected?.(item.value);
    handleSearch(item.value);
    handleClose();
  };

  // Close the menu
  const handleClose = () => {
    setOpen(false);
  };

  // Open the menu if has data
  const handleOpen = () => {
    if (disabled) return;
    setSearch('');
    setOpen(true);
  };

  //render input search
  const renderInputSearch = () => {
    if (!searchCategory) return null;

    return (
      <div className="SelectPaper-search" style={{ marginBottom: 10 }}>
        <InputSearch
          autoFocus
          placeholder={searchPlaceholder || 'Search Category'}
          onSearch={(keyword) => setSearch(keyword)}
          maxLength={50}
        />
      </div>
    );
  };

  let render;

  if (newData.length === 0) {
    if (loading) {
      render = (
        <div style={{ textAlign: 'center', margin: '8px 0 15px 0', color: '#777' }}>
          <CircularProgress size={20} color="inherit" />
        </div>
      );
    } else {
      if (addNewLabel) {
        render = !!searchKeyWord ? (
          <div style={{ padding: '6px 18px 18px 18px' }}>
            <Checkbox
              onChange={() => {
                handleChangeCheckbox?.(searchKeyWord);
                setOpen(true);
              }}
              checked={selectedItems?.includes(searchKeyWord)}
            />
            {`${searchKeyWord} (New category)`}
          </div>
        ) : (
          <div style={{ padding: '6px 18px 18px 18px' }}>No results</div>
        );
      } else {
        render = <div style={{ padding: '6px 18px 18px 18px' }}>No results</div>;
      }
    }
  } else {
    render = (
      <div>
        {newData.map((item) =>
          isCheckBox ? (
            <div
              key={item.value}
              style={{
                display: (hideSelected && item.value === selected) || item.hide ? 'none' : undefined
              }}
            >
              <Checkbox
                onChange={() => {
                  handleChangeCheckbox?.(item.value);
                  setOpen(true);
                }}
                checked={selectedItems?.includes(item.value)}
              />
              {item.label}
            </div>
          ) : (
            <MenuItem
              className={`TableSelect-item${selected === item.value ? ' active' : ''}`}
              key={item.value}
              onClick={(e) => {
                e.preventDefault();
                handleClickItem(item);
              }}
            >
              {item.label}
            </MenuItem>
          )
        )}
        {loading && (
          <div style={{ textAlign: 'center', margin: '8px 0 0', color: '#777' }}>
            <CircularProgress size={20} color="inherit" />
          </div>
        )}
        <Waypoint onEnter={handleLoadmore} />
        <div style={{ height: 20 }}></div>
      </div>
    );
  }

  return (
    <div style={style} className="TableSelect-readOnly">
      <TopLabel label={topLabel} disabled={disabled} required={required} />
      <TextField
        {...rest}
        fullWidth={fullWidth}
        disabled={disabled}
        size="small"
        ref={anchorRef}
        label={label}
        onClick={handleOpen}
        value={value}
        placeholder={isCheckBox ? 'Select Category' : ''}
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
          style: {
            width: anchorRef.current?.getBoundingClientRect().width || 0
          }
        }}
        disableAutoFocus
        open={open}
        disableRestoreFocus
        onClose={handleClose}
        anchorEl={anchorRef.current}
      >
        {renderInputSearch()}
        <Scrollbar style={{ maxHeight: 340 }}>{render}</Scrollbar>
      </Popover>
    </div>
  );
};

export default SelectLoadMore;
