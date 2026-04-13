import type { Elysia } from "elysia";
import type { CustomerController } from "../controllers/CustomerController.ts"; // Asegúrate de que el nombre coincida

export const customerRoutes = (
    app: Elysia,
    controller: CustomerController
) => {
    return app.group("/customers", (app) =>
        app
            .get("/", () => controller.getAll()) // Este es el que buscas en Postman
            .get("/:id", ({ params }) => controller.getById(params.id))
            .post("/", ({ body }) => controller.create(body))
            .put("/:id", ({ params, body }) => controller.update(params.id, body))
            .delete("/:id", ({ params }) => controller.delete(params.id))
    );
};