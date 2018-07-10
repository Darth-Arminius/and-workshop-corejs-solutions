describe("About Higher Order Functions", function() {
  it("should use 'filter' to return array items that meet a criteria", function() {
    const numbers = [1, 2, 3];
    const odd = numbers.filter(function(x) {
      return x % 2 !== 0; // % modulus/remainder operator, useful for checking if even/odd when used with 2
      // Note: When using negative numbers the result could be negative
      // -2 % -2 = -0
      // -2 %  2 = -0
      //  2 % -2 =  0
      //  2 %  2 =  0
    });

    expect(odd).toEqual([1, 3]);
    expect(odd.length).toBe(2);
    expect(numbers.length).toBe(3);
  });

  it("should use 'map' to transform each element", function() {
    const numbers = [1, 2, 3];
    const numbersPlus1 = numbers.map(function(x) {
      return x + 1;
    });

    expect(numbersPlus1).toEqual([2, 3, 4]);
    expect(numbers).toEqual([1, 2, 3]);
  });

  it("should use 'reduce' to update the same result on each iteration", function() {
    const numbers = [1, 2, 3];
    const reduction = numbers.reduce(function(
      /* result from last call */ memo,
      /* current */ x
    ) {
      return memo + x;
    },
    /* initial */ 0);

    expect(reduction).toBe(6);
    expect(numbers).toEqual([1, 2, 3]);
  });

  it("should use 'forEach' for simple iteration", function() {
    const numbers = [1, 2, 3];
    let msg = ""; // was const msg = "";
    const isEven = function(item) {
      msg += item % 2 === 0;
    };

    numbers.forEach(isEven);

    expect(msg).toEqual("falsetruefalse");
    expect(numbers).toEqual([1, 2, 3]);
  });

  it("should use 'every' to test whether all items pass condition", function() {
    //## FIND the right Array function to use on MDN
    const onlyEven = [2, 4, 6];
    const mixedBag = [2, 4, 5, 6];

    const isEven = function(x) {
      return x % 2 === 0;
    };

    expect(onlyEven.every(isEven)).toBe(true); // Array.every()
    expect(mixedBag.every(isEven)).toBe(false);
  });

  it("should use 'some' to test if any item passes condition", function() {
    //## FIND the right Array function to use on MDN
    const onlyEven = [2, 4, 6];
    const mixedBag = [2, 4, 5, 6];

    const isEven = function(x) {
      return x % 2 === 0;
    };

    expect(onlyEven.some(isEven)).toBe(true); // Array.some()
    expect(mixedBag.some(isEven)).toBe(true);
  });

  it("should use multiple higher order functions", function() {
    const result = [0, 1, 2]
      .map(function(x) {
        return x + 1;
      })
      .reduce(function(sum, x) {
        return sum + x;
      });

    expect(result).toEqual(6);
  });
});
