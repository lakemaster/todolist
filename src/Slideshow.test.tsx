import React from "react";
import Slideshow from "./Slideshow";
import { fireEvent, render, screen } from "@testing-library/react";

it("renders a slideshow starting at image 0", () => {
  render(<Slideshow />);
  const slide = screen.getByRole("img");
  expect(slide).toHaveAttribute("src", "https://picsum.photos/200?image=0");
});

it('switches to the next slide', () => {
  render(<Slideshow />);
  fireEvent.click(
    screen.getByRole('button', { name: 'next' })
  );
  expect(screen.getByRole('img')).toHaveAttribute(
    'src',
    'https://picsum.photos/200?image=1'
  );
});