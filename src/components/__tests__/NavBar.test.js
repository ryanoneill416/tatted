import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import NavBar from "../NavBar";

test("renders NavBar", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  const signInLink = screen.getByRole("link", { name: "Sign In" });
  expect(signInLink).toBeInTheDocument();
});

test("renders link to user profile for authenticated user", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const profileAvatar = await screen.findByText("Profile");
  expect(profileAvatar).toBeInTheDocument();
});

test("renders link to add new post for authenticated users who are artists", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const newPost = await screen.findByText("New Post");
  expect(newPost).toBeInTheDocument();
});

test("renders link to a user's feed if authenticated", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const feedList = await screen.findByText("Feed");
  expect(feedList).toBeInTheDocument();
});

test("renders link to a user's saved posts if authenticated", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const savedList = await screen.findByText("Saved");
  expect(savedList).toBeInTheDocument();
});

test("renders signin and signup again after signing out", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const signOutLink = await screen.findByRole("link", { name: "Sign Out" });
  fireEvent.click(signOutLink);
  const signInLink = await screen.findByRole("link", { name: "Sign In" });
  expect(signInLink).toBeInTheDocument();
  const signUpLink = await screen.findByRole("link", { name: "Sign Up" });
  expect(signUpLink).toBeInTheDocument();
});
