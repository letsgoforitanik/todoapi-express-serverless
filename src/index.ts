import express from "express";
import serverless from "serverless-http";
import passport from "passport";

import { todoApiRouter, authRouter } from "./todo-api";
import { jwtStrategy } from "./jwt-auth";

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use('/api/todos', todoApiRouter);
app.use('/api/auth-token', authRouter);

passport.use(jwtStrategy());

const handler = serverless(app);

export { handler };