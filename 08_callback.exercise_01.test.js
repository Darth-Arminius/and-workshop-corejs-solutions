//## 01 refactor this code, using named function and passing them as callback

// was
// fs.readFile(file, "utf8", function(err, todoList) {
//   if (err) return console.log(err);

//   todoList = todoList + "\n watch GOT";
//   fs.writeFile(file, todoList, function(err) {
//     if (err) return console.log(err);
//     console.log("todo added!");
//   });
// });

const fs = require("fs");

const file = "./todo.txt"; // check todo.txt for the appended "watch GOT"

let stuff = "";

const appendFile = function(err, todoList) {
  if (err) return false;

  todoList = todoList + "\n watch GOT";
  stuff += todoList;
  fs.writeFile(file, todoList, notify);
  return stuff;
};

const notify = function(err) {
  if (err) return false;

  return true;
};

//## 02 create a 08_callback.exercise_01.test.js file and... test :)

describe("callback exercise", () => {
  it("should append watch GOT when calling appendFile", () => {
    expect(appendFile(null, "")).toEqual("\n watch GOT");
  });

  it("should return false if there is an error when appendFile is called", () => {
    expect(appendFile("an error", "")).toBe(false);
  });

  it("should return true if there is no error when notify called", () => {
    expect(notify(null)).toBe(true);
  });

  it("should return false if there is an error when the notify is called", () => {
    expect(notify("an error")).toBe(false);
  });
});
