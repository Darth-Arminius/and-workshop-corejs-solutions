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

const appendFile = function(err, todoList) {
  if (err) return false;

  todoList = todoList + "\n watch GOT";
  fs.writeFile(file, todoList, notify);
  return todoList;
};

const notify = function(err) {
  if (err) return false;
  // currently does nothing but return true, here you could have some form of logging or other post file write logic
  return true;
};

//## 02 create a 08_callback.exercise_01.test.js file and... test :)

describe("callback exercise", () => {
  it("should append watch GOT when calling appendFile", () => {
    expect(appendFile(null, "")).toEqual("\n watch GOT"); // expects the empty string provided to be appeneded with '\n watch GOT' and returned
  });

  it("should return false if there is an error when appendFile is called", () => {
    expect(appendFile("an error", "")).toBe(false); // if an error is provided then expect the function to return false first thing
  });

  it("should return true if there is no error when notify called", () => {
    expect(notify(null)).toBe(true); // expect notify to successfully notify (currently it does nothing) when there are no errors
  });

  it("should return false if there is an error when the notify is called", () => {
    expect(notify("an error")).toBe(false); // opposite of above, expect notify to return false first thing if an error was supplied
  });
});
