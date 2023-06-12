const routes = {
  // User Side
  home: '/',
  detailProduct: 'product/:id',
  blogDetail: '/blog/:id',
  editAccount: '/account/edit',
  profile: '/account/edit-profile',
  myAddress: '/account/my-address',
  search: '/search',
  category: '/category/',
  detailCate: '/category/:id',
  login: '/login',
  register: '/register',
  forgotPassword: '/reset-password',
  blog: '/blog',
  movieDetail: '/movie/:id',
  contact: '/contact',
  introduce: '/introduce',
  checkout: '/checkout',
  cart: '/cart',
  sellPolicy: '/chinh-sach-ban-hang',
  warrantyPolicy: '/chinh-sach-bao-hanh',
  goodsRefundPolicy: '/chinh-sach-doi-tra',
  shippingPolicy: '/chinh-sach-van-chuyen',
  shirtSizingGuide: '/huong-dan-do-size-ao',
  product: '/products',
  productFavorite: '/products/favorite',
  userOrder: '/orders',
  detailOrder: '/order/:id',
  instruction: '/huong-dan-mua-hang',
  // Admin Side
  admin: '/admin',
  adminLogin: '/admin/login',
  dashboardAdmin: '/admin/dashboard',
  detailTotal: '/admin/detailTotal',
  productAdmin: '/admin/products',
  addProduct: '/admin/products/add',
  editProduct: '/admin/products/:id/edit',
  adminOrders: '/admin/orders',
  adminOrdersDetail: '/admin/orders/:id',
  categoryAdmin: '/admin/category',
  commentAdmin: '/admin/comment',
  addComment: '/admin/comment/add',
  editComment: '/admin/comment/:id/edit',
  seatAdmin: '/admin/seat',
  websiteInfo: '/admin/website-info',
  adminBanner: '/admin/banner',
  adminFeedback: '/admin/feedback',
  customerStatistic: '/admin/customer',
  paymentManagement: '/admin/payment',
  // Shipper
  shipperLogin: '/shipper/login',
  shipperOrder: '/shipper/orders'
};

export default routes;
