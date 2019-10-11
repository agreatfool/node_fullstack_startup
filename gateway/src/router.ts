import * as Router from "koa-router";

import {createUser, getUser, updateUser} from "./service/user";

export const router = new Router();

router.get("/users/:id", getUser);
router.post("/users", createUser);
router.put("/users", updateUser);
