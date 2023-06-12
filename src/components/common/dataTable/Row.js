import { Button, Checkbox, TableCell, TableRow } from '@mui/material';
import MaxLine from '../maxLine/MaxLine';
import React from 'react';
import { isFunction } from 'lodash';
import DEFAULT_AVATAR_CUSTOMER from '~/assets/images/customer_default_avatar.jpg';
import NO_IMAGE from '~/assets/images/no_image.jpg';
import currency from 'utils/currency';
import moment from 'moment';

const Row = ({ row, fields, dnd, handleSelectedRow, isChecked, allowMultiDeletion }) => {
  const { innerRef, dragHandleProps = {}, draggableProps = {}, isDragging } = dnd || {};
  const rowStyle = dnd ? { ...draggableProps.style, display: isDragging ? 'table' : '' } : {};
  return (
    <TableRow {...draggableProps} style={rowStyle} ref={innerRef}>
      {allowMultiDeletion && (
        <TableCell style={{ width: '4%' }}>
          <Checkbox
            color="primary"
            checked={isChecked}
            onChange={({ target: { checked } }) => handleSelectedRow(checked, row._id)}
          />
        </TableCell>
      )}
      {!!dnd && (
        <TableCell style={{ width: '4%', textAlign: 'center' }} {...dragHandleProps}>
          <i className="fas fa-arrows-alt-v" style={{ color: '#999', fontSize: 16, cursor: 'pointer' }} />
        </TableCell>
      )}
      {Object.keys(fields).map((cell, index) => {
        const columnName = cell;
        const field = fields[columnName];
        const newContent = row[columnName];
        const { style = {}, bodyStyle = {} } = field;
        let newRenderContent;
        switch (field.type) {
          case 'date':
            newRenderContent = (
              <span style={{ whiteSpace: 'nowrap' }}>{newContent ? moment(newContent).format('DD/MM/YYYY') : '-'}</span>
            );
            break;
          case 'avatar':
            newRenderContent = <img alt="" src={newContent || DEFAULT_AVATAR_CUSTOMER} className="Row-avatar" />;
            break;
          case 'image':
            newRenderContent = <img alt="" src={newContent || NO_IMAGE} className="Row-image" />;
            break;
          case 'price':
            newRenderContent = <span style={{ whiteSpace: 'nowrap' }}>{currency(newContent)}</span>;
            break;
          case 'payment_method':
            newRenderContent = newContent === 2 ? 'Chuyển khoản' : 'COD';
            break;
          case 'actions':
            newRenderContent = (
              <div className="Row-actions">
                {field.actions?.map((i) => {
                  let hidden = i.hidden;
                  if (isFunction(hidden)) hidden = hidden(row);

                  return (
                    <Button
                      style={{ visibility: hidden ? 'hidden' : 'visible' }}
                      disabled={i.disabled}
                      key={i.icon}
                      onClick={() => i.action(row)}
                      title={i.title}
                    >
                      <i style={{ fontSize: 14 }} className={`fas ${i.icon}`} />
                    </Button>
                  );
                })}
              </div>
            );
            break;

          default:
            if (field.renderContent) newRenderContent = field.renderContent(row);
            else newRenderContent = newContent;
            break;
        }

        return (
          <TableCell key={index} style={{ ...style, ...bodyStyle }}>
            {field.disableMaxLine ? (
              newRenderContent
            ) : (
              <MaxLine
                title={field.defaultTitle ? newContent : undefined}
                text={newRenderContent}
                numberOfLines={field.maxLine}
              />
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default Row;
