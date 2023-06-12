import { ROLES } from 'constants/role';

export const isAdmin = (user) => user?.role === ROLES.ADMIN;
export const isCustomer = (user) => user?.role === ROLES.CUSTOMER;
export const isShipper = (user) => user?.role === ROLES.SHIPPER;
