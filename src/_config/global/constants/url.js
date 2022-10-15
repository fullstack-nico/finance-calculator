// const CONTROLLER_BASE = 'http://app.detesseract.com:10080';
// const CONTROLLER_TYPE = '/Laravel/Mainframe';
// const CONTROLLER_NAME = '/Account';
// const CONTROLLER_VERSION = '/Account_25_11_19_image';
// const CONTROLLER_EXT = '/public/index.php/api';

// const CONTROLLER_BASE = 'http://127.0.0.1:8000';
// const CONTROLLER_TYPE = '/2020/Heroku';
// const CONTROLLER_NAME = '/BakeryShop';
// const CONTROLLER_VERSION = '';
// const CONTROLLER_EXT = '/api';

const CONTROLLER_BASE = 'https://financial-calculator-server-bgkfk.ondigitalocean.app'; //:8080
const CONTROLLER_TYPE = '';
const CONTROLLER_NAME = '';
const CONTROLLER_VERSION = '';
const CONTROLLER_EXT = '/public/index.php/api';



const Url = CONTROLLER_BASE + CONTROLLER_TYPE + CONTROLLER_NAME + CONTROLLER_VERSION + CONTROLLER_EXT;

// Test
export const URL_TEST = Url + '/test';

//  Authentication
export const URL_LOGIN = Url + '/login';
export const URL_REGISTER = Url + '/register';
export const URL_LOGIN_GOOGLE = Url + '/login/google';


// get account data
export const URL_GET_USER_DATA_BASIC = Url + '/get/user/basic';
export const URL_UPDATE_USER_DATA_BASIC = Url + '/update/user/basic';
export const URL_ADD_USER_EXPENSE_CATEGORY = Url + '/add/user/expense/category';
export const URL_GET_USER_EXPENSE_CATEGORY = Url + '/get/user/expense/category';
//
// // get LIST
// export const URL_GET_LIST_FLAT = Url + '/get/list/flat';
// export const URL_GET_LIST_CAKE = Url + '/get/list/cake';
// export const URL_GET_LIST_TO_RECEIVE = Url + '/get/list/toReceive';
//
// // PURCHASE
// export const URL_PURCHASE = Url + '/purchase/inventory';
// export const URL_PAY = 'https://test2pay.ghl.com/IPGSG/Payment.aspx';
