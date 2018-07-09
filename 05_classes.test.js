describe("About classes", () => {
  /*

	Task 1) Refactor the following traditional Javascript "class" into new class syntax

*/

  class Animal {
    speak() {
      return "meow";
    }

    static eat() {
      return "nom nom nom";
    }
  }

  it("should make the cat meow and animal eat", () => {
    const Cat = new Animal();

    expect(Cat.speak()).toBe("meow");
    expect(Animal.eat()).toBe("nom nom nom");
  });

  /*

	 Task 2) Create a class Kitten, that extends the Animal. Overwriting the previous speak method.
		The it should fail when you add the extended class, you will need to override the method for the it to pass
	 	Tip: Use extends keyword

*/

  class Kitten extends Animal {
    speak() {
      return "kitten meow";
    }
  }

  it("should hear the kitten meow", () => {
    const Kitty = new Kitten();

    expect(Kitty.speak()).toBe("kitten meow");
  });
});
