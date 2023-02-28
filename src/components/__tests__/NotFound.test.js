import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NotFound from "../NotFound";

test("renders error 404 message", async () => {
  render(
    <Router>
      <NotFound />
    </Router>
  );

  const error404Message = await screen.findByText("ERROR 404:", { exact: false });
  await waitFor(() => {
    expect(error404Message).toBeInTheDocument();
  });
});