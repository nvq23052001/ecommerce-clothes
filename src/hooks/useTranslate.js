import { useIntl } from 'react-intl';

const useTranslate = (id) => {
  const intl = useIntl();
  return intl.formatMessage({ id });
};

export default useTranslate;
