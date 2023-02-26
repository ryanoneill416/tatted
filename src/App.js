import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostDetailPage from "./pages/posts/PostDetailPage";
import PostList from "./pages/posts/PostList";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import EditProfileForm from "./pages/profiles/EditProfileForm";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PostList message="No results found :( Try a different search" />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <PostList
                message="No results found :( Try a different search or follow a new artist"
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/saved"
            render={() => (
              <PostList
                message="No results found :( Try a different search or save a post"
                filter={`saves__owner__profile=${profile_id}&ordering=-saves__created_at&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostDetailPage />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route exact path="/profiles/:id/edit" render={() => <EditProfileForm />} />
          <Route render={() => <h1>Page Not Found!</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
