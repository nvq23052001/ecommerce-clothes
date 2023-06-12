import defaultAvatar from 'assets/images/default_avatar.png';
import axios from 'axios';
import { createContext } from 'react';
export const DEFAULT_AVATAR = defaultAvatar;

export const LS_LANG = 'LANG';
export const LANGUAGES = {
  EN: 'en',
  DE: 'de'
};

export const SUCCESS = 'success';

export const MAX_QUANTITY = 9999;

const defaultAdminContextValue = {
  loading: false,
  startLoading: () => {},
  stopLoading: () => {},
  callApi: () => {},
  groups: [],
  getGroups: () => {},
  listGroups: [],
  mappingGroup: {},
  permissions: [],
  getPermissions: () => {},
  listPermissions: [],
  mappingPermission: {},
  myPermissions: [],
  hasPermission: () => ({}),
  submitGoBack: () => {},
  accessLevels: [],
  manageAllDepartments: false
};

export const AdminContext = createContext(defaultAdminContextValue);

export const ROUTES = {
  ROUTE_PRODUCT: 'products',
  ROUTE_CHANGE_PASSWORD: 'change-password'
};

export const uploadFileToServer = async (file) => {
  const CLOUDINARY_API = process.env.REACT_APP_API_UPLOAD_IMAGE;

  const fd = new FormData();
  fd.append('file', file);
  fd.append('upload_preset', 'images');
  const { data } = await axios.post(CLOUDINARY_API, fd, {
    headers: {
      'Content-Type': 'multipart-form/data'
    }
  });
  return data.url;
};
