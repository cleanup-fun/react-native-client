
import { RegisterOrForgot } from "./pages/RegisterOrForgot";
import { ResetPassword } from "./pages/ResetPassword";
import { Login } from "./pages/Login";
import { UserInfo } from "./pages/UserInfo";
import { UserMenu } from "./pages/UserMenu";

export const PATH_USER_MENU = "/user/";
export const PATH_REGISTER_OR_FORGOT = "register-or-forgot";
export const PATH_RESET_PASSWORD = "reset-password";
export const PATH_LOGIN = "login";
export const PATH_USER_INFO = "user-info";

export const routeItems = {
  [PATH_USER_MENU]: {
    index: true,
    key: "UserMenu",
    title: "User Menu",
    path: PATH_USER_MENU,
    component: UserMenu,
  },
  [PATH_LOGIN]: {
    isLoggedIn: false,
    key: "Login",
    title: "Log in",
    path: PATH_LOGIN,
    component: Login,
  },
  [PATH_REGISTER_OR_FORGOT]: {
    isLoggedIn: false,
    key: "RegisterOrForgot",
    title: "Register or Forgot Password",
    path: PATH_REGISTER_OR_FORGOT,
    component: RegisterOrForgot,
  },
  [PATH_RESET_PASSWORD]: {
    isLoggedIn: false,
    key: "ResetPassword",
    title: "Reset Your Password",
    path: PATH_RESET_PASSWORD,
    component: ResetPassword,
  },
  [PATH_USER_INFO]: {
    isLoggedIn: true,
    key: "UserInfo",
    title: "See and Update your Information",
    path: PATH_USER_INFO,
    component: UserInfo,
  },
};
