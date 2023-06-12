export const paymentMethods = {
  COD: 1,
  BANK_TRANSFER: 2,
  DIRECT_PAY: 3
};

export const HttpStatusCode = Object.freeze({
  SUCCESS: '00',
  SUSPICIOUS_TRANSACTION: '07',
  INTERNET_BANKING_NOT_REGISTERED: '09',
  INCORRECT_AUTHENTICATION_INFO: '10',
  EXPIRED_WAITING_PERIOD: '11',
  LOCKED_ACCOUNT: '12',
  INCORRECT_OTP: '13',
  TRANSACTION_CANCELLED: '24',
  INSUFFICIENT_BALANCE: '51',
  DAILY_LIMIT_EXCEEDED: '65',
  BANK_UNDER_MAINTENANCE: '75',
  BUSY: '77',
  INCORRECT_PAYMENT_PASSWORD: '79',
  OTHER_ERRORS: '99'
});

const {
  SUCCESS,
  SUSPICIOUS_TRANSACTION,
  INTERNET_BANKING_NOT_REGISTERED,
  INCORRECT_AUTHENTICATION_INFO,
  EXPIRED_WAITING_PERIOD,
  LOCKED_ACCOUNT,
  INCORRECT_OTP,
  TRANSACTION_CANCELLED,
  INSUFFICIENT_BALANCE,
  DAILY_LIMIT_EXCEEDED,
  BANK_UNDER_MAINTENANCE,
  INCORRECT_PAYMENT_PASSWORD,
  OTHER_ERRORS,
  BUSY
} = HttpStatusCode;

export const toastMessage = {
  [SUCCESS]: 'Giao dịch thành công',
  [SUSPICIOUS_TRANSACTION]: 'Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).',
  [INTERNET_BANKING_NOT_REGISTERED]:
    'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.',
  [INCORRECT_AUTHENTICATION_INFO]:
    'Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần',
  [EXPIRED_WAITING_PERIOD]:
    'Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.',
  [LOCKED_ACCOUNT]: 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.',
  [INCORRECT_OTP]:
    'Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.',
  [TRANSACTION_CANCELLED]: 'Giao dịch không thành công do: Khách hàng hủy giao dịch',
  [INSUFFICIENT_BALANCE]:
    'Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.',
  [DAILY_LIMIT_EXCEEDED]:
    'Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.',
  [BANK_UNDER_MAINTENANCE]: 'Ngân hàng thanh toán đang bảo trì.',
  [INCORRECT_PAYMENT_PASSWORD]:
    'Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch',
  [OTHER_ERRORS]: 'Có lỗi xảy ra trong quá trình thanh toán, vui lòng thử lại sau',
  [BUSY]: 'Hệ thống thanh toán trực tuyến đang bận, vui lòng thử lại sau hoặc chọn phương thức thanh toán khác'
};
