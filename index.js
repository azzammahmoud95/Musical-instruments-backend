"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const product_route_1 = __importDefault(require("./routes/product-route"));
const category_route_1 = __importDefault(require("./routes/category-route"));
const user_route_1 = __importDefault(require("./routes/user-route"));
const app = (0, express_1.default)();
//---------> Enable CORS
app.use((0, cors_1.default)());
dotenv_1.default.config();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
//---------->Connection to DATEBASE
(0, db_1.default)();
app.get("/", (req, res) => {
    res.send("The server is healthy");
});
// --------> API Routes 
app.use('/api/product', product_route_1.default);
app.use('/api/user', user_route_1.default);
app.use('/api/category', category_route_1.default);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
