// config
import OrderDetail from 'pages/Admin/Order/OrderDetail';
import config from '~/config';

// pages
import {
  Banner,
  Blog,
  BlogDetail,
  Cart,
  Categories,
  Checkout,
  Contact,
  CustomerManagement,
  Dashboard,
  DetailCategory,
  DetailOrder,
  DetailProduct,
  DetailTotal,
  FavoriteProduct,
  Feedback,
  ForgotPassword,
  FormAccount,
  GoodsRefundPolicy,
  Home,
  Instruct,
  Introduce,
  Login,
  LoginShipper,
  MyAddress,
  OrderUser,
  Orders,
  OrdersShipper,
  PaymentManagement,
  ProductAdd,
  ProductEdit,
  ProductList,
  Products,
  Register,
  Search,
  SellPolicy,
  ShippingPolicy,
  ShirtSizingGuide,
  SignIn,
  WarrantyPolicy,
  WebsiteInfo
} from '~/pages';

import ShipperLayout from '../layouts/ShipperLayout';
// import DetailTotal from 'pages/Admin/Dashboard/detailTotal';

const { routes } = config;

// Public routes - shipper

const shipperRoutes = [
  {
    path: routes.shipperOrder,
    component: OrdersShipper,
    layout: ShipperLayout,
    title: 'Shipper | Order'
  }
];

// public routes - user
const publicRoutes = [
  {
    path: routes.home,
    component: Home,
    title: 'Trang chủ'
  },
  {
    path: routes.shipperLogin,
    component: LoginShipper,
    layout: ShipperLayout,
    title: 'Đăng nhập | Shipper'
  },
  {
    path: routes.detailProduct,
    component: DetailProduct,
    title: 'Chi tiết sản phẩm'
  },
  {
    path: routes.detailCate,
    component: DetailCategory,
    title: 'Chi tiết danh mục'
  },
  {
    path: routes.login,
    component: Login,
    title: 'Đăng nhập'
  },
  {
    path: routes.search,
    component: Search,
    title: 'Tìm kiếm sản phẩm'
  },
  {
    path: routes.profile,
    component: FormAccount,
    title: 'Thông tin tài khoản'
  },
  {
    path: routes.register,
    component: Register,
    title: 'Đăng ký'
  },
  {
    path: routes.forgotPassword,
    component: ForgotPassword,
    title: 'Quên mật khẩu'
  },
  {
    path: routes.contact,
    component: Contact,
    title: 'Liên hệ'
  },
  {
    path: routes.blog,
    component: Blog,
    title: 'Tin tức'
  },
  {
    path: routes.blogDetail,
    component: BlogDetail,
    title: 'Chi tiết bài viết'
  },
  {
    path: routes.introduce,
    component: Introduce,
    title: 'Giới thiệu'
  },
  {
    path: routes.sellPolicy,
    component: SellPolicy,
    title: 'Chính sách bán hàng'
  },
  {
    path: routes.goodsRefundPolicy,
    component: GoodsRefundPolicy,
    title: 'Chính sách đổi trả'
  },
  {
    path: routes.shippingPolicy,
    component: ShippingPolicy,
    title: 'Chính sách vận chuyển'
  },
  {
    path: routes.shirtSizingGuide,
    component: ShirtSizingGuide,
    title: 'Hướng dẫn đo size quần áo'
  },
  {
    path: routes.warrantyPolicy,
    component: WarrantyPolicy,
    title: 'Chính sách bảo hành'
  },
  {
    path: routes.product,
    component: Products,
    title: 'Tất cả sản phẩm'
  },
  {
    path: routes.productFavorite,
    component: FavoriteProduct,
    title: 'Sản phẩm yêu thích'
  },
  {
    path: routes.cart,
    component: Cart,
    title: 'Giỏ hàng của bạn'
  },
  {
    path: routes.checkout,
    component: Checkout,
    title: 'Thông tin thanh toán'
  },
  {
    path: routes.myAddress,
    component: MyAddress,
    title: 'Địa chỉ giao hàng'
  },
  {
    path: routes.userOrder,
    component: OrderUser,
    title: 'Đơn hàng'
  },
  {
    path: routes.detailOrder,
    component: DetailOrder,
    title: 'Chi tiết đơn hàng'
  },
  {
    path: routes.instruction,
    component: Instruct,
    title: 'Hướng dẫn mua hàng'
  }
];

// private routes - admin
const privateRoutes = [
  {
    path: routes.adminLogin,
    component: SignIn,
    layout: null
  },
  {
    path: routes.admin,
    component: Dashboard,
    title: 'Thống kê'
  },
  {
    path: routes.dashboardAdmin,
    component: Dashboard,
    title: 'Thống kê'
  },
  {
    path: routes.detailTotal,
    component: DetailTotal,
    title: 'Danh sách đơn hàng',
    back: true
  },
  {
    path: routes.productAdmin,
    component: ProductList,
    title: 'Quản lí sản phẩm'
  },
  {
    path: routes.addProduct,
    component: ProductAdd,
    title: 'Thêm sản phẩm',
    back: true
  },
  {
    path: routes.editProduct,
    component: ProductEdit,
    title: 'Sửa sản phẩm',
    back: true
  },
  {
    path: routes.categoryAdmin,
    component: Categories,
    title: 'Quản lí danh mục'
  },
  {
    path: routes.adminOrders,
    component: Orders,
    title: 'Quản lí đơn hàng'
  },
  {
    path: routes.customerStatistic,
    component: CustomerManagement,
    title: 'Danh sách khách hàng'
  },
  {
    path: routes.adminOrdersDetail,
    component: OrderDetail,
    title: 'Xem đơn hàng',
    back: true
  },
  {
    path: routes.websiteInfo,
    component: WebsiteInfo,
    title: 'Thông tin website'
  },
  {
    path: routes.adminBanner,
    component: Banner,
    title: 'Quản lí banner'
  },
  {
    path: routes.adminFeedback,
    component: Feedback,
    title: 'Quản lí feedback'
  },
  {
    path: routes.paymentManagement,
    component: PaymentManagement,
    title: 'Quản lý hình thức thanh toán'
  }
];

export { publicRoutes, privateRoutes, shipperRoutes };
