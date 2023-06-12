import routes from 'config/routes';

export const menu = (categories) => [
  {
    id: 1,
    title: 'Giới thiệu',
    url: routes.introduce,
    submenu: [
      { title: 'Hành trình tiên phong', url: '' },
      { title: 'Dịch vụ 5* Niken', url: '' },
      { title: 'Nghệ nhân da', url: '' },
      { title: 'Các loại gia', url: '' },
      { title: 'Giá trị theo năm tháng', url: '' }
    ]
  },
  {
    id: 2,
    title: 'Tất cả sản phẩm',
    url: routes.product,
    submenu: [...categories]
  },
  {
    id: 4,
    title: 'Liên hệ',
    url: routes.contact
  }
];
