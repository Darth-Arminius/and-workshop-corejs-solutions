describe("About object prototypes", () => {
  /*

    Task 1) Write a function that capitalises a string. To do this, add a prototype function to the base String object.

      Note: You shouldn't do this (unless polyfilling old browsers) as this is modifying the native objects

      Hint: To update a strings prototype use String.prototype.yourFunctionName =

*/

  String.prototype.capitalize = function() {
    // was nothing
    let stringArr = [...this]; // spreading the string inputted into a char array
    stringArr[0] = stringArr[0].toUpperCase(); // capitalising the first character
    const returnString = stringArr.join(""); // joining up the chars back into a string
    return returnString; // returning the newly created capitalised string
    // Note: 'this' (the string provided to the function) was never changed (mutated)
  };

  it("should return a capitalised string", () => {
    expect("the little brown dog".capitalize()).toBe("The little brown dog");
  });

  /*

    Task 2) Rewrite the following so that the toString function is not created each time a function is created
      Hint: Use prototypes

      - What is the performance impact of doing things this way?

*/

  function Car(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
  }

  it("should have a toString() function for MyCar", () => {
    Car.prototype.toString = function() {
      return this.model + " has done " + this.miles + " miles";
    }; // was in the Car() function
    const MyCar = new Car("Model T", "1905", "200");
    expect(MyCar.toString()).toBe("Model T has done 200 miles");
  });
});
