/*eslint-disable*/
import { DataTable } from 'components/common/dataTable';
import InputSearch from 'components/common/input/InputSearch';
import ModalConfirm from 'components/common/modal/ModalConfirm';
import { apiUrls } from 'config/apis';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useApis } from 'services/api';
import { transformDataExcel } from 'utils/transform-data-excel';
import * as XLSX from 'xlsx';
import Button from 'components/common/button/Button';
import { formatCompare } from 'utils/common';
// import { read, utils } from 'xlsx';

const ProductList = () => {
  const { read, utils, writeFile, write } = XLSX;
  const navigate = useNavigate();
  const { apiGet, apiDelete, apiPost } = useApis();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const refInput = useRef();

  // const page = useRef(1)
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const [sort, setSort] = useState({ field: '', order_by: '' });

  const [modalConfirm, setModalConfirm] = useState({
    show: false,
    title: '',
    content: '',
    confirm: undefined,
    cancel: undefined
  });

  const [search, setSearch] = useState('');
  const initData = useRef([]);

  const getProducts = useCallback(() => {
    apiGet(apiUrls.adminProducts(), { sort_by: sort.field, order: sort.order_by }, ({ status, data }) => {
      if (status) {
        const newProducts = data.items.map((item) => ({
          ...item,
          category: item.category.name
        }));
        setProducts(newProducts);
        initData.current = newProducts;
      }
    });
  }, [sort]);

  const getCategories = useCallback(() => {
    apiGet(apiUrls.adminCategories(), {}, ({ status, data }) => {
      if (status) {
        setCategories(data.items);
      }
    });
  }, []);

  const hideModalConfirm = () => {
    setModalConfirm({ ...modalConfirm, show: false });
  };

  const handleDeleteProducts = (id) => {
    apiDelete(apiUrls.adminProducts(id), {}, ({ status }) => {
      if (status) {
        getProducts()
        toast.success('Xóa sản phẩm thành công')
      }else {
        toast.error('Có lỗi xảy ra')
      }
    });
  };

  const handleImportExcel = () => {
    refInput.current.click();
  };

  const handleChangeFile = ({ target: { files } }) => {
    const [file] = files;
    handleAddProduct(file);
  };

  const handleAddProduct = (file) => {
    if (window.confirm('Bạn có muốn thêm sản phẩm từ file đã nhập')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const bstr = event.target.result;
        const wb = read(bstr, { type: 'binary' });
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        const data = transformDataExcel(
          utils.sheet_to_json(ws, { header: 1 }).filter((row) => row.length),
          categories
        );
        if (data.some((item) => !item.category)) {
          toast.error('Vui lòng nhập danh mục hợp lệ');
          return;
        }
        apiPost(apiUrls.adminProducts('batch/add'), data, ({ status }) => {
          if (status) {
            getProducts();
          }
        });
      };
      reader.readAsBinaryString(file);
    }
  };

  const exportToCSV = (data) => {
    const newData = data.map((item) => ({
      'Tên sản phẩm': item.name,
      'Danh mục': item.category,
      Giá: item.price,
      'Số lượng': item.stock,
      'Mô tả': item.description
    }));
    let ws = XLSX.utils.json_to_sheet(newData);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'sheet');
    let buf = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' }); // generate a nodejs buffer
    let str = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' }); // generate a binary string in web browser
    XLSX.writeFile(wb, `Export_san_pham.xlsx`);
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);
  useEffect(() => {
    getCategories();
  }, []);

  const fieldsTable = {
    name: { label: 'Tên sản phẩm', style: { width: '10%' }, sort: 'asc' },
    category: { style: { width: '12%' }, label: 'Danh mục', sort: 'asc' },
    price: { style: { width: '15%' }, label: 'Giá', type: 'price', sort: 'asc' },
    stock: { style: { width: '8%' }, label: 'Số lượng', sort: 'asc' },
    description: { style: { width: '15%' }, label: 'Mô tả', sort: 'asc' },
    image: { style: { width: '15%' }, label: 'Ảnh', type: 'image' },
    promotion_price: { style: { width: '12%' }, label: 'Giá KM', type: 'price', sort: 'asc' },
    actions: {
      type: 'actions',
      label: 'Thao tác',
      style: { width: '10%' },
      actions: [
        {
          icon: 'fa-pen',
          action: ({ _id }) => {
            navigate(`/admin/products/${_id}/edit`);
          }
        },
        {
          icon: 'fa-trash',
          action: ({ _id }) => {
            setModalConfirm({
              show: true,
              title: 'Xóa danh mục',
              content: 'Bạn có chắc muốn xóa danh mục này?',
              confirm: {
                text: 'Xóa',
                action: () => {
                  handleDeleteProducts(_id);
                  hideModalConfirm();
                }
              },
              cancel: {
                text: 'Hủy',
                action: () => {
                  hideModalConfirm();
                }
              }
            });
          }
        }
      ]
    }
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleDeleteMultiple = (ids) =>
    apiDelete(apiUrls.adminProducts('batch/destroy'), { ids: [...ids] }, ({ status }) => {
      if (status) {
        getProducts();
      } else {
        toast.error('Lỗi không xác định, vui lòng thử lại sau');
      }
    });

  useEffect(() => {
    const newData = initData.current.filter((item) => {
      const value1 = formatCompare(item.name);
      const value2 = formatCompare(search);
      return value1.includes(value2);
    });
    setProducts(newData);
  }, [search]);

  return (
    <div>
      <ModalConfirm {...modalConfirm} small center />
      <DataTable
        items={products}
        fields={fieldsTable}
        headerLeft={
          <>
            <InputSearch placeholder="Tìm kiếm theo tên" onSearch={setSearch} />
          </>
        }
        deleteMultipleItem={handleDeleteMultiple}
        allowMultiDeletion={true}
        createButton={{
          text: 'Thêm mới',
          action: () => navigate('/admin/products/add')
        }}
        headerRight={
          <>
            <Button variant="contained" size="small" onClick={handleImportExcel}>
              <i className="fas fa-upload" />
              Import
            </Button>
            <Button variant="contained" size="small" onClick={() => exportToCSV(products)}>
              <i className="fas fa-download" />
              Export
            </Button>
          </>
        }
        onChangeSort={setSort}
        pagination={{
          total: products.length,
          page: page,
          pageSize,
          onPageChange: handleChangePage,
          onPageSizeChange: setPageSize
        }}
      />
      <input type="file" hidden onChange={handleChangeFile} ref={refInput} />
    </div>
  );
};

export default ProductList;
