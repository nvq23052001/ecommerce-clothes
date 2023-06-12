export const { REACT_APP_API_URL: API_URL } = process.env;

const urlId = (id) => (id ? `/${id}` : '');
export const apiUrls = {
  // User
  profile: () => '/api/auth/profile',
  chagneProfile: () => '/api/auth/change-profile',
  listBlogs: () => '/api/blog',

  detailBlog: (id) => `/api/blog${urlId(id)}`,
  signIn: () => '/api/auth/signin',
  userPayment: () => '/api/payment',
  userOrders: (id) => `/api/orders${urlId(id)}`,
  userRegister: () => `/api/auth/register`,
  userVerify: () => `/api/auth/verify`,
  userLogin: () => `/api/auth/login`,
  userCart: (id) => `/api/cart${urlId(id)}`,
  getProducts: () => `api/products`,
  searchProducts: (keyword) => `api/product/search?q=${keyword}`,
  detailProduct: (id) => `api/products${urlId(id)}`,
  getProductsByCategory: (id) => `/api/products${urlId(id)}?related=true`,
  refreshToken: () => `/api/auth/refresh-token`,
  getDetailCategory: (id) => `/api/categories${urlId(id)}?_embed=products`,
  userFavoriteProduct: () => `api/favorites`,
  getTopSellingProduct: () => `/api/statisticalforuser?quantity=12`,
  banner: () => `api/banner`,
  comment: () => `api/comment`,
  commentOfId: (id) => `api/comment/product${urlId(id)}`,
  addressClient: (id) => `api/auth/addresses?id=${id}`,
  updateAddress: (id, addressId) => `/api/auth/addressdetail?user=${id}&address=${addressId}`,
  // Admin
  adminProducts: (id) => `/api/products${urlId(id)}`,
  adminCategories: (id) => `/api/categories${urlId(id)}`,
  adminOrders: (id) => `/api/orders${urlId(id)}`,
  adminWebsiteInfo: () => `/api/webinfo`,
  statistic: () => `/api/statistical`,
  topSelling: () => '/api/statisticalproduct',
  adminBanner: (id) => `/api/banner${urlId(id)}`,
  customerStatistic: (id) => `/api/auth/users${urlId(id)}`,
  getAdminPayment: () => `/api/payments`,
  adminPayment: (id) => `/api/payments${urlId(id)}`,
  deletePayment: (id) => `/api/payments${urlId(id)}`,
  updatePayment: (id) => `/api/payments${urlId(id)}`,
  adminFeedback: () => `/api/comment`,
  adminDetailFeedback: (id) => `/api/comment/product${urlId(id)}`
};

export const apiUrlGHN = {
  createOrder: '/v2/shipping-order/create',
  calculateFee: '/v2/shipping-order/fee',
  getService: '/v2/shipping-order/available-services',
  getProvince: '/master-data/province',
  getDistricts: '/master-data/district',
  getWard: '/master-data/ward',
  calculateTimeDelivery: '/v2/shipping-order/leadtime'
};
