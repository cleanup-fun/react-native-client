
import { MainMenu } from "../pages/MainMenu";
import { StartCleaning } from "../pages/StartCleaning"
import { PaymentPage } from "../pages/PaymentPage";
import { BrowseSwiped } from "../pages/BrowseSwiped";
import { LoginOrRegister } from "../pages/LoginOrRegister";
import { NotificationStatus } from "../pages/NotificationStatus";


export const PATH_MAIN_MENU = "/";
export const PATH_START_CLEANING = "/start-cleaning";
export const PATH_PAYMENT_PAGE = "/pay";
export const PATH_BROWSE_SWIPED = "/browse-swiped";
export const PATH_USER = "/user";
export const PATH_NOTIFICATION = "/notifications";

const routeItems = {
  [PATH_MAIN_MENU]: {
    key: "MainMenu",
    title: "Main Menu",
    path: PATH_MAIN_MENU,
    component: MainMenu,
  },
  [PATH_START_CLEANING]: {
    key: 'StartCleaning',
    title: "Start Cleaning!",
    path: PATH_START_CLEANING,
    component: StartCleaning,
  },
  [PATH_PAYMENT_PAGE]: {
    key: 'PaymentPage',
    title: "Pay for No More Ads",
    path: PATH_PAYMENT_PAGE,
    component: PaymentPage,
  },
  [PATH_BROWSE_SWIPED]: {
    key: 'BrowseSwiped',
    title: "Browsed Swiped Files",
    path: PATH_BROWSE_SWIPED,
    component: BrowseSwiped,
  },
  [PATH_USER]: {
    key: 'LoginOrRegister',
    title: "Signout, Login Or Register",
    path: PATH_USER,
    component: LoginOrRegister
  },
  [PATH_NOTIFICATION]: {
    key: 'NotificationStatus',
    title: "Toggle Notifications",
    path: PATH_NOTIFICATION,
    component: NotificationStatus,
  },
}

export { routeItems };
