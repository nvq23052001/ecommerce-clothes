import executeAxios from 'services/apiGHN';
import { apiUrlGHN } from 'config/apis';

export const getProvinces = async () => {
  return executeAxios(apiUrlGHN.getProvince, {});
};

export const getDistricts = async (provinceId) => {
  return executeAxios(apiUrlGHN.getDistricts, { province_id: +provinceId });
};

export const getWards = async (districtId) => {
  return executeAxios(apiUrlGHN.getWard, { district_id: +districtId });
};
