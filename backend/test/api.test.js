const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../src/api');
const database = require('../src/config/database');

let firstTodoIdTest = '';
const firstTodosBody = {
  text: 'Go Grocery Shopping',
  due_date: new Date().getTime(),
};

const completed = true;
const invalidTodoText = null;
const invalidTodoComplete = undefined;
const invalidTestId = '!dd03da023de32mda93';

describe('Todos endpoint with valid requests', () => {
  let request;

  before(async function () {
    await database.testDatabase();
    request = supertest.agent(app);
  });

  after(async function (done) {
    await database.testDatabase.close(done());
  });

  it('Should allow POST request to /todos', async () => {
    const response = await request.post('/todos').send(firstTodosBody);

    expect(response.status).to.equal(201);
    expect(response.body).not.to.be.empty;
    expect(response.body).to.be.an('object');
    expect(response.body.id).to.be.a('string');

    firstTodoIdTest = response.body.id;
  });

  it('Should allow  a GET request to /todos', async function () {
    const response = await request.get('/todos').send();

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body).not.to.be.empty;
  });

  it('Should allow a GET request to /todos?page_number=1', async function () {
    const response = await request
      .get(`/todos?page_number=${1}`)
      .query({ page_number: 1 })
      .send();

    expect(response.status).to.be.equal(200);
  });

  it('Should allow a PUT request to /todos/:id', async function () {
    const response = await request
      .put(`/todos/${firstTodoIdTest}`)
      .send({ completed });

    expect(response.status).to.equal(200);
    expect(response.body).to.be.empty;
  });

  it('Should all a delete request to /todos/:id', async function () {
    const response = await request.delete(`/todos/${firstTodoIdTest}`).send();

    expect(response.status).to.be.equal(203);
  });

  describe('Todos endpoint with invalid requests', function () {
    it('Should disallow a PUT request to /todos/:id with invalid id', async function () {
      const response = await request.put(`/todos/${invalidTestId}`).send();

      expect(response.status).to.be.equal(400);
    });

    it("Should disallow a PUT request to /todos/:id with 'complete' !== typeof boolean", async function () {
      const response = await request
        .put(`/todos/${firstTodoIdTest}`)
        .send({ completed: invalidTodoComplete });

      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal(
        "invalid 'completed' expected boolean"
      );
    });

    it("Should disallow a POST request to /todos with 'text' !== typeof string", async function () {
      const response = await request
        .post('/todos')
        .send({ text: invalidTodoText });

      expect(response.status).to.be.equal(400);
      expect(response.body).not.to.be.empty;
      expect(response.body.message).to.be.equal(
        "invalid 'text' expected string"
      );
    });
  });
});
