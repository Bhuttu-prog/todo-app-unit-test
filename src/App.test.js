import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("allows users to add a task", () => {
    render(<App />);
  
    const inputElement = screen.getByPlaceholderText(/Enter a task/i);
    const addButton = screen.getByText(/Add Task/i);
  
    fireEvent.change(inputElement, { target: { value: "Buy groceries" } });
    fireEvent.click(addButton);
  
    const taskElement = screen.getByText(/Buy groceries/i);
    expect(taskElement).toBeInTheDocument();
  });
  
  test("allows users to delete a task", () => {
    render(<App />);
  
    const inputElement = screen.getByPlaceholderText(/Enter a task/i);
    const addButton = screen.getByText(/Add Task/i);
  
    fireEvent.change(inputElement, { target: { value: "Go jogging" } });
    fireEvent.click(addButton);
  
    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);
  
    const taskElement = screen.queryByText(/Go jogging/i);
    expect(taskElement).toBeNull();
  });
