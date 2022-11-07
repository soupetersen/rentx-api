import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

export const router = Router();

// Routes of the application
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use(authenticateRoutes);
