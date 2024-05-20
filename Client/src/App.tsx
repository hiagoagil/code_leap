import { useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { loadPosts } from "./actions/posts";

import { useAppDispatch } from "./hooks/redux";
import { LoginPage, PostsPage } from "./pages";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    loadPosts()
      .then(dispatch)
      .catch(() => {});
  }, [dispatch]);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      history.push("/login");
    }
  }, [location.pathname, history]);
  return (
    <div className="App">
      <Switch>
        <Route exact path="/posts">
          <PostsPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
