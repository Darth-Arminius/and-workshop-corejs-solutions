describe("About promises", () => {
  /*

    Task 1) Refactor the anAsyncFunction to use shorthand object promise notation

*/

  // was
  // const anAsyncFunction = result => {
  //   return new Promise((resolve, reject) => {
  //     if (result) {
  //       return resolve([0, 1, 2]);
  //     } else {
  //       return reject(" Oh no :( ");
  //     }
  //   });
  // };

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

  function addSix(num) {
    // was nothing
    return Promise.resolve(num)
      .then(num => num + 2)
      .then(num => num + 2)
      .then(num => num + 2);
  }

  // was
  // it("should add up to 6!", done => {
  //   return Promise.resolve(0)
  //     .then(num => num + 2)
  //     .then(num => num + 2)
  //     .then(num => num + 2)
  //     .then(function(result) {
  //       expect(result).toBe(6);
  //     })
  //     .then(done);
  // });

  it("should add up to 6!", done => {
    return addSix(0)
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

  // was
  // it("should add to 10 without using a big chain of promises", done => {
  //   Promise.resolve(0)
  //     .then(addOne)
  //     .then(value => {
  //       return Promise.resolve(value)
  //         .then(value => {
  //           return Promise.resolve(value)
  //             .then(addOne)
  //             .then(addOne)
  //             .then(addOne);
  //         })
  //         .then(addOne)
  //         .then(addOne);
  //     })
  //     .then(addOne)
  //     .then(value => {
  //       return Promise.resolve(value)
  //         .then(addOne)
  //         .then(addOne)
  //         .then(addOne);
  //     })
  //     .then(result => {
  //       expect(result).toBe(10);
  //     })
  //     .then(done);
  // });

  it("should add to 10 without using a big chain of promises", done => {
    addTen(0)
      .then(result => {
        expect(result).toBe(10);
      })
      .then(done); // can use a function abstracting the horrific .thens

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
      .then(done); // or just shove all .thens here
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

  // was
  // it("should get Alices plan", done => {
  //   return getUser()
  //     .then(user => {
  //       return getPlans().then(plans => {
  //         return subscribe(user.name, plans.id);
  //       });
  //     })
  //     .then(string => {
  //       expect(string).toBe("Create the plan called Alice for plan ID 4");
  //       done();
  //     });
  // });

  it("should get Alice's plan", done => {
    return Promise.all([getUser(), getPlans()]) // combines and resolves all Promises supplied, if any Promise errors then the catch is run
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
        return hey(...data); // was return hey(data[0], data[1]);
      })
      .then(string => {
        expect(string).toBe("Hey Bob Miggins!");
        done();
      });
  });
});
