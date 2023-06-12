import { MenuItem, Popover } from '@mui/material';
import React, { useRef, useState } from 'react';
import { mappingAdminOrderStatus, mappingAdminOrderStatusColor } from './constants';

const ChangeOrderStatus = ({ status, onChangeStatus, disabled, listOrder }) => {
  const { background, text, border } = mappingAdminOrderStatusColor[status];
  console.log(mappingAdminOrderStatusColor[0]);
  console.log(status);

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const listNewStatuses = listOrder[status];
  const showList = !disabled && !!listNewStatuses?.length;
  const style = {
    backgroundColor: background,
    color: text,
    border: `1px solid ${border}`,
    cursor: showList ? 'pointer' : 'default'
  };

  // Close the menu
  const handleClose = () => {
    setOpen(false);
  };

  // When click item, set selected item and close menu
  const handleClickItem = (item) => {
    onChangeStatus(item);
    handleClose();
  };

  return (
    <>
      <div
        className="ChangeOrderStatus"
        style={style}
        ref={anchorRef}
        onClick={() => {
          if (showList) setOpen(true);
        }}
      >
        {mappingAdminOrderStatus[status]}
        {showList && <i className="fas fa-caret-down" style={{ fontSize: 14 }} />}
      </div>
      {showList && (
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
              width: anchorRef.current?.getBoundingClientRect().width || 0,
              borderRadius: 8
            }
          }}
          disableAutoFocus
          open={open}
          onClose={handleClose}
          anchorEl={anchorRef.current}
        >
          {listNewStatuses.map((item) => (
            <MenuItem className="ChangeOrderStatus-item" key={item} onClick={() => handleClickItem(item)}>
              <i className="fas fa-arrow-right" />
              {mappingAdminOrderStatus[item]}
            </MenuItem>
          ))}
        </Popover>
      )}
    </>
  );
};

export default ChangeOrderStatus;
