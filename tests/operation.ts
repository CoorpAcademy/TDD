import { Server, createServer } from 'http';
import test, { TestInterface } from "ava";
import supertest from "supertest";
import express from "express";
import { app } from '../src/server';

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

interface Context {
  server: Server
}

const testE2E = test as TestInterface<Context>;

testE2E.before.cb(t => {
  t.context.server = app.listen(
    4000,
    '0.0.0.0',
    (err: Error | null) => t.end(err)
  );
});
testE2E.cb("additionE2E", t => {
  supertest('http://localhost:4000')
    .get("/add/9/5")
    .expect(200)
    .expect('14')
    .end(t.end)
});
testE2E.after.always.cb(t => {
  t.context.server.close((err: Error | null) => t.end(err))
});