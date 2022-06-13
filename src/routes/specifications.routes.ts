import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationRoutes = Router();

const createSpecificationControler = new CreateSpecificationController();

specificationRoutes.post("/", createSpecificationControler.handle);

export { specificationRoutes };
