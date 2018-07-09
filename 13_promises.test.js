describe("About promises", () => {
  /*

    Task 1) Refactor the anAsyncFunction to use shorthand object promise notation

*/

  const anAsyncFunction = result => {
    if (!result) {
      return Promise.reject(" Oh no :( ");
    }

    return Promise.resolve([0, 1, 2]);
  };

  it("should, when resolved, call the then", done => {
    anAsyncFunction(true).then(result => {
      expect(result).toEqual([0, 1, 2]);
      done();
    });
  });

  it("should, when rejected, call the catch handler", done => {
    anAsyncFunction(false).catch(e => {
      expect(e).toBeTruthy();
      done();
    });
  });

  /*

    Task 2) Abstract out the .then calls into a separate function, not anonymous

    Think about:
        - What happens if you call .then without returning anything?
        - Does a .then have to return a promise? Can it? Try wrapping addOne's function with: Promise.resolve()

*/

  const addOne = result => result + 1;

  function addTwo(num) {
    return Promise.resolve(num)
      .then(num => num + 2)
      .then(num => num + 2)
      .then(num => num + 2);
  }

  it("should add up to 6!", done => {
    return addTwo(0)
      .then(function(result) {
        expect(result).toBe(6);
      })
      .then(done);
  });

  /*

    Task 3) Refactor to be flat like the one before

*/

  function addTen(num) {
    return Promise.resolve(num)
      .then(addOne)
      .then(addOne)
      .then(addOne)
      .then(addOne)
      .then(addOne)
      .then(addOne)
      .then(addOne)
      .then(addOne)
      .then(addOne)
      .then(addOne);
  }

  it("should add to 10 without using a big chain of promises", done => {
    addTen(0)
      .then(result => {
        expect(result).toBe(10);
      })
      .then(done);

    Promise.resolve(0)
      .then(addOne)
      .then(addOne)
      .then(addOne)
      .then(addOne)
      .then(addOne)
      .then(addOne)
      .then(addOne)
      .then(addOne)
      .then(addOne)
      .then(addOne)
      .then(result => {
        expect(result).toBe(10);
      })
      .then(done);
  });

  /*

    Task 4) Rewrite to use Promise.all

    Think about:
        - Do the two API calls need to be made separately?
        - What could be the impact on performance?

*/

  const getUser = result => {
    return Promise.resolve({
      name: "Alice"
    });
  };

  const getPlans = result => {
    return Promise.resolve({
      id: 4,
      plan: "My plan"
    });
  };

  const subscribe = (userName, id) => {
    return `Create the plan called ${userName} for plan ID ${id}`;
  };

  it("should get Alice's plan", done => {
    return Promise.all([getUser(), getPlans()])
      .then(results => {
        return subscribe(results[0].name, results[1].id);
      })
      .then(string => {
        expect(string).toBe("Create the plan called Alice for plan ID 4");
        done();
      });
  });

  /*

    Task 5) Promise.all returns an array, but that means we have to access with the gross array[0] syntax.
        Rewrite the .then to use the spread operator instead
*/

  const hey = (firstName, lastName) => {
    return `Hey ${firstName} ${lastName}!`;
  };

  it("should greet Bob using the spread operator", done => {
    return Promise.all([Promise.resolve("Bob"), Promise.resolve("Miggins")])
      .then(data => {
        return hey(...data);
      })
      .then(string => {
        expect(string).toBe("Hey Bob Miggins!");
        done();
      });
  });
});
