import { Middleware } from "redux";
import { actions as userActions } from "../../store/user/reducer";
import { actions as courseActions } from "../../store/course/reducer";
import { actions as authorsActions } from "../../store/authors/reducer";
import { TOKEN } from "../../constants/Pages";
import axios from "axios";

const authMiddleware: Middleware = () => (next) => (action) => {
  const token = localStorage.getItem(TOKEN);

  if (
    action.type === userActions.getUserInfo.type ||
    action.type === userActions.logoutUser.type ||
    action.type === courseActions.addCourse.type ||
    action.type === courseActions.deleteCourse.type ||
    action.type === authorsActions.addAuthor.type
  ) {
    axios.defaults.headers.common["Authorization"] = token;
  }

  return next(action);
};

export default authMiddleware;
