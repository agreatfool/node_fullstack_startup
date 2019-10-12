import * as Router from "koa-router";

import {createUser, getUser, updateUser} from "./controller/user";

export const router = new Router();

router.get("/users/:id", getUser);
router.post("/users", createUser);
router.put("/users", updateUser);
