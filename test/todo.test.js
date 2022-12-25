const chai = require("chai");
const chaiHttp = require("chai-http");
const App = require("../app");
const Todo = require("../model/todo");

const expect = chai.expect;

chai.use(chaiHttp);

let todoId = null;

describe("/api/TODO", function () {
  describe("TODO", () => {
    it("CREATE TODO", (done) => {
      chai
        .request(App.app)
        .post(`/api/todo`)
        .send({
          username: "TEST",
          gender: "m",
          hobby: [1, 2],
          status: "active",
          age: 20,
          date: new Date().toISOString(),
          taskName: "Testing",
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });

    it("LIST TODO", (done) => {
      chai
        .request(App.app)
        .get(`/api/todo`)
        .end((err, res) => {
          todoId = res.body.response[0]?._id;
          expect(res.status).to.equal(200);
          done();
        });
    });

    it("EDIT TODO", (done) => {
      chai
        .request(App.app)
        .put(`/api/todo/${todoId}`)
        .send({
          username: "DUMMY",
          gender: "m",
          hobby: [1, 2, 3],
          status: "active",
          age: 25,
          date: new Date().toISOString(),
          taskName: "Testing",
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it("DELETE TODO", (done) => {
      chai
        .request(App.app)
        .delete(`/api/todo/${todoId}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    after(function (done) {
      Todo.deleteMany({}, () => {
        done;
      });
    });
  });
});
