import * as Router from "koa-router";

import {createUser, createUserWithSkills, getUser, getUserWithSkills, updateUser} from "./user";
import {getSkill, getSkills, updateSkill} from "./skill";

export interface IResponse<T> {
    code: number;
    data: T;
}

export const router = new Router();

router.get("/users/:id", getUser);
router.get("/users/skills/:id", getUserWithSkills);
router.post("/users", createUser);
router.post("/users/skills", createUserWithSkills);
router.put("/users", updateUser);

router.get("/skills/:id", getSkill);
router.get("/skills/users/:id", getSkills);
router.put("/skills", updateSkill);
