import {
  Box,
  Card,
  CircularProgress,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Table as TableWrapper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Toolbar,
  Typography,
  Tooltip,
  IconButton
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import Scrollbar from 'components/common/scrollbar/Scrollbar';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { addNumber } from 'utils/table';
import Button from '../button/Button';
import './index.scss';
import Row from './Row';
import ModalConfirm from '../modal/ModalConfirm';

const DataTable = ({
  items: oldItems,
  fields: oldFields,
  onChangeSort,
  loading,
  headerLeft,
  headerRight,
  createButton,
  pagination = {
    total: 0,
    pageSize: 0,
    page: 0,
    onPageChange: () => {},
    onPageSizeChange: () => {},
    hidePage: false
  },
  createWithExcel,
  deleteMultipleItem,
  allowMultiDeletion = false
}) => {
  const { t } = useTranslation();
  const { total, page, onPageChange, pageSize, onPageSizeChange, hidePage } = pagination;
  const [listRowSelected, setListRowSelected] = useState([]);

  const [modalConfirm, setModalConfirm] = useState({
    show: false,
    title: '',
    content: '',
    confirm: undefined,
    cancel: undefined
  });

  const hideModalConfirm = () => {
    setModalConfirm({ ...modalConfirm, show: false });
  };

  const [sort, setSort] = useState({ column: '', direction: 'asc' });

  // Add column no.
  const fields = {
    number: { style: { width: '6%', textAlign: 'center' }, label: 'STT' },
    ...oldFields
  };

  // Add data for column no.
  const items = oldItems.map((item, index) => addNumber(item, index, page, pageSize));

  const columns = Object.keys(fields).map((item) => ({
    key: item,
    label: fields[item].label,
    sort: fields[item].sort
  }));

  const renderLoading = (
    <TableRow className={`DataTable-loading${items.length > 0 ? ' has-items' : ' no-items'}`}>
      <TableCell align="center" colSpan={columns.length}>
        <CircularProgress size={28} color="inherit" />
      </TableCell>
    </TableRow>
  );

  const renderNoResults = (
    <TableRow>
      <TableCell align="center" colSpan={columns.length} sx={{ py: 5 }}>
        không có kết quả
      </TableCell>
    </TableRow>
  );

  const rows = [10, 15, 20, 30];

  const totalPages = Math.ceil(total / pageSize);

  const total2 = page * pageSize;
  const first = (page - 1) * pageSize + 1;
  const last = total2 < total ? total2 : total;

  let newItems = items;
  if (!onChangeSort && sort.column) {
    // Sort data
    newItems = newItems.sort((a, b) => {
      const key = sort.column;
      const valueA = a[key];
      const valueB = b[key];
      const multiple = sort.direction === 'asc' ? 1 : -1;
      return (valueA > valueB ? 1 : -1) * multiple;
    });
  }

  const handleDeleteMultiple = async () => {
    const dataRemove = listRowSelected?.filter((item) => item.selected).map((item) => item.id);
    if (dataRemove.length) {
      deleteMultipleItem(dataRemove);
      hideModalConfirm();
    }
  };

  const handleChangeCheckbox = ({ target: { checked } }) => {
    const newState = listRowSelected?.map((item) => ({ ...item, selected: checked }));
    setListRowSelected(newState);
  };

  const handleSelectedRow = (checked, id) => {
    const newState = listRowSelected?.map((item) => (item.id === id ? { id, selected: checked } : item));
    setListRowSelected(newState);
  };

  const showModalConfirm = () => {
    setModalConfirm({
      show: true,
      content: 'Bạn có chắc muốn xóa những mục đã chọn?',
      confirm: {
        text: 'Xóa',
        action: () => {
          handleDeleteMultiple();
        }
      },
      cancel: {
        text: 'Hủy',
        action: () => {
          hideModalConfirm();
        }
      }
    });
  };

  const header = !!(headerLeft || headerRight || createButton);

  useEffect(() => {
    setListRowSelected([
      ...oldItems?.map((item) => ({
        id: item._id,
        selected: false
      }))
    ]);
  }, [oldItems]);

  const renderTable = (
    <TableWrapper className="DataTable-table">
      <TableBody>
        {items.length > 0 ? (
          <>
            {(pageSize > 0 ? newItems.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize) : newItems).map(
              (item, index) => {
                return (
                  <Row
                    isChecked={!!listRowSelected.find((_item) => _item.id === item._id)?.selected}
                    key={item._id || index}
                    fields={fields}
                    row={item}
                    handleSelectedRow={handleSelectedRow}
                    allowMultiDeletion={allowMultiDeletion}
                  />
                );
              }
            )}
            {loading && renderLoading}
          </>
        ) : !loading ? (
          renderNoResults
        ) : (
          renderLoading
        )}
      </TableBody>
    </TableWrapper>
  );

  return (
    <Card className="DataTable" style={{ padding: '20px 0 24px' }}>
      {header && (
        <Stack className="DataTable-header" flexDirection="row" gap={3}>
          <div className="d-f jc-sb w-100">
            <div className="d-f ai-c space-2" style={{ flexWrap: 'wrap' }}>
              {headerLeft}
            </div>
            <div className="d-f ai-c space-2-left">
              {headerRight}
              {createWithExcel && (
                <Button
                  variant="contained"
                  size="small"
                  disabled={createWithExcel.disabled}
                  onClick={createWithExcel.action}
                >
                  <i className="fas fa-plus" />
                  {createWithExcel.text}
                </Button>
              )}
              {createButton && (
                <Button variant="contained" size="small" disabled={createButton.disabled} onClick={createButton.action}>
                  <i className="fas fa-plus" />
                  {createButton.text}
                </Button>
              )}
            </div>
          </div>
        </Stack>
      )}
      <Scrollbar>
        {allowMultiDeletion && listRowSelected.filter((item) => item.selected).length > 0 && (
          <Toolbar
            className="DataTable-toolbar"
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
              bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
            }}
          >
            <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
              {listRowSelected.filter((item) => item.selected).length} được chọn
            </Typography>
            <Tooltip title="Delete" onClick={showModalConfirm}>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        )}
        <ModalConfirm {...modalConfirm} small center />
        <TableContainer sx={{ minWidth: 1100 }}>
          <TableWrapper className="DataTable-table">
            <TableHead>
              <TableRow>
                {allowMultiDeletion && listRowSelected.length > 0 && (
                  <TableCell style={{ width: '4%' }}>
                    <Checkbox
                      color="primary"
                      checked={listRowSelected.filter((item) => item.selected).length === listRowSelected.length}
                      onChange={handleChangeCheckbox}
                    />
                  </TableCell>
                )}
                {columns.map(({ key, label, sort: s }) => {
                  label = t(label || key);
                  const active = sort.column === key;
                  return (
                    <TableCell key={key} style={{ ...fields[key].style, textAlign: 'center' }}>
                      {!s ? (
                        label
                      ) : (
                        <>
                          <div
                            className={`DataTable-table__sort-cell ${active ? sort.direction : s}${
                              active ? ' active' : ''
                            }`}
                            onClick={() => {
                              setSort({
                                column: key,
                                direction: active ? (sort.direction === 'asc' ? 'desc' : 'asc') : s
                              });
                              onChangeSort({
                                field: key,
                                order_by: active ? (sort.direction === 'asc' ? 'desc' : 'asc') : s
                              });
                            }}
                          >
                            {label}
                            <i className="fas fa-arrow-down" />
                          </div>
                        </>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          </TableWrapper>
          {renderTable}
        </TableContainer>
      </Scrollbar>

      {!hidePage && total > 0 && (
        <Box className="Pagination" pt={2.25}>
          {total > 1 && (
            <Pagination
              count={totalPages}
              color="primary"
              page={page}
              onChange={(_, newPage) => {
                if (newPage !== page) {
                  onPageChange?.(newPage);
                  window.scrollTo(0, 0);
                }
              }}
              showFirstButton
              showLastButton
              siblingCount={1}
              boundaryCount={0}
              size="small"
              disabled={loading}
            />
          )}

          <Stack
            className={`Pagination-right${loading ? ' disabled' : ''}`}
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={2}
          >
            <Select
              className="ChangePageSize"
              size="small"
              value={pageSize}
              onChange={(p) => onPageSizeChange?.(Number(p.target.value))}
              disabled={loading}
            >
              {rows.map((item) => (
                <MenuItem key={item} className="ChangePageSize-item" value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <div>
              {first} - {last}
            </div>
          </Stack>
        </Box>
      )}
    </Card>
  );
};

export default DataTable;
