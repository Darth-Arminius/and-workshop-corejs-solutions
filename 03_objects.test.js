describe("About objects", () => {
  it("shuld return using property access", () => {
    //RULE: USE key access
    const obj = {
      name: "Julian",
      lastname: "Brown",
      age: "35"
    };

    expect(obj.name).toBe("Julian");
    expect(obj.lastname).toBe("Brown");
    expect(obj.age).toBe("35");
  });

  it("should return using key access", () => {
    //RULE: USE property access
    const obj = {
      name: "Julian",
      lastname: "Brown",
      age: "35"
    };

    expect(obj["name"]).toBe("Julian");
    expect(obj["lastname"]).toBe("Brown");
    expect(obj["age"]).toBe("35");
  });

  it("should return using computed property names", () => {
    //RULE: USE computed property names
    const real = "real_";
    const fake = "fake_";

    const vip = {
      real_name: "Kelly",
      real_lastname: "White",
      fake_name: "Pink",
      fake_lastname: "Venn",
      age: "35"
    };

    expect(vip[`${real}name`]).toBe("Kelly");
    expect(vip[`${real}lastname`]).toBe("White");
    expect(vip[`${fake}name`]).toBe("Pink");
    expect(vip[`${fake}lastname`]).toBe("Venn");
    expect(vip.age).toBe("35");
  });

  it("should define object properties", () => {
    //RULE: USE Object.defineProperty
    const vip = {
      name: "Kelly",
      lastname: "White",
      age: "35"
    };

    Object.defineProperty(vip, "age", {
      writable: false
    }); // was nothing

    vip.age = 37;
    expect(vip.name).toBe("Kelly");
    expect(vip.lastname).toBe("White");
    expect(vip.age).toBe("35");
  });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object

  it("should return an array of keys from an object", () => {
    const vip = {
      name: "Kelly",
      lastname: "White",
      age: 35
    };

    expect(Object.keys(vip)).toEqual(["name", "lastname", "age"]);
  });

  it("should return an array of values from an object", () => {
    const vip = {
      name: "Kelly",
      lastname: "White",
      age: 35
    };

    expect(Object.values(vip)).toEqual(["Kelly", "White", 35]);
  });
});
