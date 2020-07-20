"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var uuidv4_1 = require("uuidv4");
var app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
var routes_1 = __importDefault(require("./routes"));
function validateProjectId(request, response, next) {
    var id = request.params.id;
    if (!uuidv4_1.isUuid(id)) {
        return response.status(400).json({
            error: 'Invalid project ID.'
        });
    }
    next();
}
app.use('/projects/:id', validateProjectId);
app.use(routes_1.default);
exports.default = app;