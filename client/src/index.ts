import {Api, User} from "./api/api";

const api = new Api();

const baseUrl = "http://127.0.0.1:3000/api/v1.0";

api.getUser({id: 1, $domain: baseUrl}).then((res) => console.log(res.body)).catch((err) => console.log(err));
api.createUser({user: {
    id: 123,
    name: "david",
    age: 32,
    gender: "male",
    skills: [
        {id: 173, name: "skill1"},
        {id: 174, name: "skill2"},
    ],
} as User, $domain: baseUrl}).then((res) => console.log(res.body)).catch((err) => console.log(err));
api.updateUser({user: {
    id: 123,
    name: "john",
    age: 32,
    gender: "male",
    skills: [
        {id: 173, name: "skill1"},
        {id: 174, name: "skill2"},
    ],
} as User, $domain: baseUrl}).then((res) => console.log(res.body)).catch((err) => console.log(err));
