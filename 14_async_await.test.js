//** EXERCISE
/*

1 - create an http server in node using node platform, no external npm packages: https://nodejs.org/api/http.html#http_class_http_server
  the web server will return a json { message: "hello world" }

2 - create an http client using `got` https://github.com/sindresorhus/got

3 - use a promise approach to output the response to the console + test

4 - use a promise + generator approach to output the response to the console + test

5 - use a aysnc/await approach to output the response to the console + test
*/
const got = require('got');

const promiseFunction = () => {
  return got('http://localhost:3000/');
};

function* promiseGeneratorFunction() {
  try {
    const response = yield got('http://localhost:3000/');

    return JSON.parse(response.body);
  } catch (error) {}
};

const asyncFunction = async () => {
  try {
		const response = await got('http://localhost:3000/');
		return JSON.parse(response.body);
	} catch (error) {
		console.log(error.response.body);
	}
};

it('should return { hello : "world"} with promises', done => {
  promiseFunction().then(result => expect(JSON.parse(result.body)).toEqual({ hello: 'world'})).then(done);
});

it('should return { hello : "world"} with generators and promises', async () => {
  const generator = promiseGeneratorFunction();
  let yielded = generator.next();

  const result = await yielded.value;

  yielded = generator.next(result);

  expect(yielded.value).toEqual({
    hello: 'world'
  });
});

it('should return { hello : "world"} with async/await', async done => {
  expect(await asyncFunction()).toEqual({ hello: 'world'});
  done();
});
