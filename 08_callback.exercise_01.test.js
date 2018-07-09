const fs = require("fs");

const file = "./todo-test.txt";

let stuff = "";

const appendFile = function(err, todoList) {
  if (err) return false;

  todoList = todoList + "\n watch GOT";
  stuff += todoList;
  fs.writeFile(file, todoList, errorHandler);
  return stuff;
};

const errorHandler = function(err) {
  if (err) return false;

  return true;
};

describe("callback exercise", () => {
  it("should append watch GOT when calling appendFile", () => {
    expect(appendFile(null, "")).toEqual("\n watch GOT");
  });

  it("should return false if there is an error when appendFile is called", () => {
    expect(appendFile("an error", "")).toBe(false);
  });

  it("should return true if there is no error when errorHandler called", () => {
    expect(errorHandler(null)).toBe(true);
  });

  it("should return false if there is an error when the errorHandler is called", () => {
    expect(errorHandler("an error")).toBe(false);
  });
});
