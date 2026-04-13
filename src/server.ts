import { Elysia } from "elysia";
import { productRoutes } from "./interfaces/routes/ productRoutes";
import { ProductController } from "./interfaces/controllers/ ProductController";

// repo
import { ProductRepositoryImpl } from "./infraestructure/repositories/ProductRepositoryImpl.ts";


// use cases
import { GetAllProductsUseCase } from "./application/use-cases/product/get-all-products.usecase";
import { GetProductByCodeUseCase } from "./application/use-cases/product/get-product-by-code.usecase";
import { CreateProductUseCase } from "./application/use-cases/product/create-product.usecase";
import { UpdateProductUseCase } from "./application/use-cases/product/update-product.usecase";
import { DeleteProductUseCase } from "./application/use-cases/product/delete-product.usecase";

const server = new Elysia();

// 🔹 Repository
const productRepository = new ProductRepositoryImpl();

// 🔹 UseCases
const getAllProducts = new GetAllProductsUseCase(productRepository);
const getByCodeProduct = new GetProductByCodeUseCase(productRepository);
const createProduct = new CreateProductUseCase(productRepository);
const updateProduct = new UpdateProductUseCase(productRepository);
const deleteProduct = new DeleteProductUseCase(productRepository);

// 🔹 Controller (YA CON DEPENDENCIAS)
const productController = new ProductController(
    createProduct,
    getAllProducts,
    getByCodeProduct,
    updateProduct,
    deleteProduct
);

// 🔹 Routes
server.use((app) => productRoutes(app, productController));

server.listen(3000);

console.log("Server running on http://localhost:3000");