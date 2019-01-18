import test from "ava";
import supertest from "supertest";
import express from "express";

import { addition, division } from "../src/operations";
import { additionMiddleware, divisionMiddleware } from "../src/middleware";

test("addition", t => {
  t.is(addition(0, 0), 0);
  t.is(addition(2, 3), 5);
  t.is(addition(0, -1), -1);
});

test("division", t => {
  t.is(division(2, 1), 2);
  t.is(division(1, -1), -1);

  t.is(division(0, 0), NaN);
});

test.cb("additionMiddleware", t => {
  const app = express();
  app.get("/:a/:b", additionMiddleware);
  supertest(app)
      .get("/9/4")
      .expect("13")
      .end(t.end)
});

test.cb("divisionMiddleware", t => {
  const app = express();
  app.get("/:a/:b", divisionMiddleware);
  supertest(app)
      .get("/9/0")
      .expect(500)
      .expect('Division by zero')
      .end(t.end)
});

test.cb("additionE2E", t => {
  supertest('http://localhost:3000')
  .get("/add/9/5")
  .expect(200)
  .expect('14')
  .end(t.end)
})