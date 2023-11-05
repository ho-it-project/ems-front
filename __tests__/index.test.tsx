import Home from "@/app/(main)/page";
import { render, screen } from "@testing-library/react";

it("test", () => {
  render(<Home />);
  expect(screen.getByText("Hellow")).toBeInTheDocument();
});
