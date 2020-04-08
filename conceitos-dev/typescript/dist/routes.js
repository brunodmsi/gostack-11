"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createUser_1 = __importDefault(require("./services/createUser"));
function hello(request, response) {
    var user = createUser_1.default({
        email: 'bruno@demasi.com',
        password: '123456',
        techs: [
            'Node.js',
            'React',
            'Postgres',
            { title: 'Redis', experience: 2 }
        ]
    });
    return response.json({ message: 'Hello user', user: user });
}
exports.hello = hello;
