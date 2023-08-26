import Home from "@/app/page";
import { render, screen } from "@testing-library/react";

it("test", () => {
  render(<Home />);
  expect(screen.getByText("Hellow")).toBeInTheDocument();
});
