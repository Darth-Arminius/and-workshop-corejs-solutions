//## EXERCISE
describe("About Functions", function() {
  it("should declare functions", function() {
    function add(a, b) {
      return a + b;
    }

    expect(add(1, 2)).toBe(3);
  });

  it("should know internal variables override outer variables", function() {
    var message = "Outer";

    function getMessage() {
      return message;
    }

    function overrideMessage() {
      var message = "Inner";
      return message;
    }

    expect(getMessage()).toBe("Outer");
    expect(overrideMessage()).toBe("Inner");
    expect(message).toBe("Outer"); // scoping
  });

  it("should have lexical scoping", function() {
    var variable = "top-level";
    function parentfunction() {
      var variable = "local";
      function childfunction() {
        return variable;
      }
      return childfunction();
    }
    expect(parentfunction()).toBe("local"); // var variable = "top-level" & parentfunction() -> var variable = "local" & return childfunction() -> return variable ("local")
  });

  it("should use lexical scoping to synthesise functions", function() {
    function makeMysteryFunction(makerValue) {
      var newFunction = function doMysteriousThing(param) {
        return makerValue + param;
      };
      return newFunction;
    }

    var mysteryFunction3 = makeMysteryFunction(3); // same as var mysteryFunction3 = function doMysteriousThing(param) { return 3 + param };
    var mysteryFunction5 = makeMysteryFunction(5); // same as var mysteryFunction5 = function doMysteriousThing(param) { return 5 + param };

    expect(mysteryFunction3(10) + mysteryFunction5(5)).toBe(23);
  });

  //currying
  it("should allow extra function arguments", function() {
    function returnFirstArg(firstArg) {
      return firstArg;
    }

    expect(returnFirstArg("first", "second", "third")).toBe("first");

    function returnSecondArg(firstArg, secondArg) {
      return secondArg;
    }

    expect(returnSecondArg("only give first arg")).toBe(undefined);

    function returnAllArgs() {
      var argsArray = [];
      for (var i = 0; i < arguments.length; i += 1) {
        argsArray.push(arguments[i]);
      }
      return argsArray.join(",");
    }

    expect(returnAllArgs("first", "second", "third")).toBe(
      "first,second,third"
    );
  });

  it("should pass functions as values", function() {
    var appendRules = function(name) {
      return name + " rules!";
    };

    var appendDoubleRules = function(name) {
      return name + " totally rules!";
    };

    var praiseSinger = { givePraise: appendRules };
    expect(praiseSinger.givePraise("John")).toBe("John rules!");

    praiseSinger.givePraise = appendDoubleRules;
    expect(praiseSinger.givePraise("Mary")).toBe("Mary totally rules!");
  });

  it("should return a reversed string", () => {
    function reverse(str) {
      // was empty
      let strArr = [...str]; // spreading the string into a new char array
      strArr.reverse(); // reversing said char array
      return strArr.join(""); // joining up the char array back into a string and returning it
    }

    expect(reverse("hello")).toEqual("olleh");
  });

  it("should return the dog age equivalent of a human age (1 year for Fido = 7 years for you)", () => {
    function puppyCalculator(humanAge) {
      // was empty
      return Math.round(humanAge / 7);
    }

    expect(puppyCalculator(35)).toBe(5);
    expect(puppyCalculator(6)).toBe(1);
    expect(puppyCalculator(89)).toBe(13);
  });

  it("should return a string with a defined suffix", () => {
    function addSuffix(str, suffix) {
      // was empty
      return `${str}${suffix}`;
    }

    function markTaskDone(str) {
      return addSuffix(str, " done!");
    }

    function hemphasis(str) {
      return addSuffix(str, "!");
    }

    expect(markTaskDone("task1")).toEqual("task1 done!");
    expect(markTaskDone("task2")).toEqual("task2 done!");
    expect(hemphasis("do it")).toEqual("do it!");
  });
});
