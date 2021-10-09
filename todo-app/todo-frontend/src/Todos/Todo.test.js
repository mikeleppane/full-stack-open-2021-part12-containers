import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import Todo from "./Todo";

test("clicking Set as done button should trigger event handler", () => {
  const mockDeleteTodo = jest.fn();
  const mockCompleteTodo = jest.fn();
  const todo = { text: "My todo", done: false };
  const component = render(
    <Todo
      todo={todo}
      deleteTodo={mockDeleteTodo}
      completeTodo={mockCompleteTodo}
    />
  );
  const linkElement = screen.getByText("My todo");
  expect(linkElement).toBeInTheDocument();
  const button = component.getByText("Set as done");
  fireEvent.click(button);

  expect(mockCompleteTodo.mock.calls).toHaveLength(1);
});
