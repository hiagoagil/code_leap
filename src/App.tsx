import { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { loadPosts } from "./actions/posts";
import { POSTS_LOCALSTORAGE_KEY } from "./constants";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { LoginPage, PostsPage } from "./pages";

const App: React.FC = () => {
  const { posts } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem(POSTS_LOCALSTORAGE_KEY, JSON.stringify(posts));
    }
  }, [posts]);
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/posts">
            <PostsPage />
          </Route>
          <Route exact path="/">
            <LoginPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
