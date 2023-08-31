import { Middleware } from "redux";
import { actions as userActions } from "../../store/user/reducer";
import { actions as courseActions } from "../../store/course/reducer";
import { TOKEN } from "../../constants/Pages";
import axios from "axios";

const authMiddleware: Middleware = () => (next) => (action) => {
  const token = localStorage.getItem(TOKEN);

  if (
    action.type === userActions.userMeRequest.type ||
    action.type === userActions.logoutRequest.type ||
    action.type === courseActions.addCourse.type
  ) {
    axios.defaults.headers.common["Authorization"] = token;
  }

  return next(action);
};

export default authMiddleware;
