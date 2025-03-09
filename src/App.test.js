import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // ✅ Import for better assertions
import App from "./App";
import { fetchTasks } from "./api";

jest.mock("./api"); // ✅ Mock the API module

test("renders To-Do List heading", () => {
  render(<App />);
  const heading = screen.getByText(/To-Do List/i);
  expect(heading).toBeInTheDocument();
});

test("fetches and displays tasks", async () => {
  fetchTasks.mockResolvedValue(["Buy groceries", "Walk the dog"]); // ✅ Mock API response
  render(<App />);
  
  const task1 = await screen.findByText(/Buy groceries/i);
  const task2 = await screen.findByText(/Walk the dog/i);

  expect(task1).toBeInTheDocument();
  expect(task2).toBeInTheDocument();
});

test("does not add an empty task", () => {
  render(<App />);
  
  const addButton = screen.getByText(/Add Task/i);
  fireEvent.click(addButton); // Click add without entering text
  
  const taskList = screen.queryAllByRole("listitem");
  expect(taskList.length).toBe(0); // ✅ Expect no tasks to be added
});

test("updates UI when tasks are added", () => {
  render(<App />);

  const inputElement = screen.getByPlaceholderText(/Enter a task/i);
  const addButton = screen.getByText(/Add Task/i);

  fireEvent.change(inputElement, { target: { value: "Read a book" } });
  fireEvent.click(addButton);

  const newTask = screen.getByText(/Read a book/i);
  expect(newTask).toBeInTheDocument();
});

test("removes task from UI when deleted", () => {
  render(<App />);

  const inputElement = screen.getByPlaceholderText(/Enter a task/i);
  const addButton = screen.getByText(/Add Task/i);

  fireEvent.change(inputElement, { target: { value: "Exercise" } });
  fireEvent.click(addButton);

  const deleteButton = screen.getByText(/Delete/i);
  fireEvent.click(deleteButton);

  const removedTask = screen.queryByText(/Exercise/i);
  expect(removedTask).toBeNull(); // ✅ Task should be removed
});
