import express from "express";
import swagggerUi from "swagger-ui-express";

import { createConnection } from "./database/data-source";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

createConnection();

const app = express();

app.use(express.json());

app.use("/api-docs", swagggerUi.serve, swagggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log("Server running on port 3333"));
