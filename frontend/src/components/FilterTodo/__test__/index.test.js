import { render, screen } from "@testing-library/react";
import FilterTodo from "..";
const mockFilter = false;
const MockFilterFunction = jest.fn();

describe("Todo list filter <FilterTodo />", function () {
  it("Should show the checkbox label", function () {
    render(<FilterTodo filter={mockFilter} filterTodo={MockFilterFunction} />);

    const formLabelElement = screen.getByLabelText("Overdue Today");
    expect(formLabelElement).toBeInTheDocument();
  });

  it("Should render the checkbox field", function () {
    render(<FilterTodo filter={mockFilter} filterTodo={MockFilterFunction} />);
    const checkboxElement = screen.getByTestId("filter-todo");

    expect(checkboxElement).toBeInTheDocument();
  });
});
