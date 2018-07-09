describe("About variables", () => {
  it("should understand VAR", () => {
    var x = 5;
    var x = 6;
    expect(x).toBe(6);
  });

  it("should understand the difference between LET and VAR", () => {
    var x = 6;
    x = 5;
    expect(x).toBe(5);
  });

  it("should understand LET", () => {
    let x = 5;
    x = 6;
    expect(x).toBe(6);
  });

  it("should understand LET scoping", () => {
    let x = 5;

    function foo() {
      let x = 20;

      return x;
    }

    expect(x).toBe(5);
  });

  it("should understand CONST - scalar values", () => {
    const x = 5;
    // x = 'foo';
    expect(x).toBe(5);
  });

  it("should understand CONST - assignment", () => {
    const x = 5;
    expect(x).toBe(5);
  });

  it("should understand CONST - objects", () => {
    const person = {
      name: "Linus",
      age: 42
    };

    person.lastname = "torvalds";
    expect(person.lastname).toBe("torvalds");
  });
});
