import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";

export const router = Router();

// Routes of the application
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
