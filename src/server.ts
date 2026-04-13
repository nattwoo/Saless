import { Elysia } from "elysia";
import { productRoutes } from "./interfaces/routes/ productRoutes";
import { ProductController } from "./interfaces/controllers/ ProductController";

// 🔹 NUEVOS IMPORTS PARA CUSTOMERS
import { customerRoutes } from "./interfaces/routes/customerRoutes";
import { CustomerController } from "./interfaces/controllers/CustomerController";
import { CustomerRepositoryImpl } from "./infraestructure/repositories/CustomerRepositoryImpl";

// repo
import { ProductRepositoryImpl } from "./infraestructure/repositories/ProductRepositoryImpl.ts";

// use cases - Product
import { GetAllProductsUseCase } from "./application/use-cases/product/get-all-products.usecase";
import { GetProductByCodeUseCase } from "./application/use-cases/product/get-product-by-code.usecase";
import { CreateProductUseCase } from "./application/use-cases/product/create-product.usecase";
import { UpdateProductUseCase } from "./application/use-cases/product/update-product.usecase";
import { DeleteProductUseCase } from "./application/use-cases/product/delete-product.usecase";

// 🔹 USE CASES - CUSTOMER
import { CreateCustomerUseCase } from "./application/use-cases/customer/create-customer.usecase";
import { GetCustomersUseCase } from "./application/use-cases/customer/get-customers.usecase";
import { GetCustomerByIdUseCase } from "./application/use-cases/customer/get-customer-by-id.usecase";
import { UpdateCustomerUseCase } from "./application/use-cases/customer/update-customer.usescase";
import { DeleteCustomerUseCase } from "./application/use-cases/customer/delete-customer.usecase";

const server = new Elysia();

// 🔹 Repositories
const productRepository = new ProductRepositoryImpl();
const customerRepository = new CustomerRepositoryImpl();

// 🔹 UseCases - Product
const getAllProducts = new GetAllProductsUseCase(productRepository);
const getByCodeProduct = new GetProductByCodeUseCase(productRepository);
const createProduct = new CreateProductUseCase(productRepository);
const updateProduct = new UpdateProductUseCase(productRepository);
const deleteProduct = new DeleteProductUseCase(productRepository);

// 🔹 USE CASES - CUSTOMER
const createCustomer = new CreateCustomerUseCase(customerRepository);
const getAllCustomers = new GetCustomersUseCase(customerRepository);
const getByIdCustomer = new GetCustomerByIdUseCase(customerRepository);
const updateCustomer = new UpdateCustomerUseCase(customerRepository);
const deleteCustomer = new DeleteCustomerUseCase(customerRepository);

// 🔹 Controllers
const productController = new ProductController(
    createProduct,
    getAllProducts,
    getByCodeProduct,
    updateProduct,
    deleteProduct
);

const customerController = new CustomerController(
    createCustomer,
    getAllCustomers,
    getByIdCustomer,
    updateCustomer,
    deleteCustomer
);

// 🔹 Routes
server.use((app) => productRoutes(app, productController));
server.use((app) => customerRoutes(app, customerController)); // 

server.listen(3000);

console.log("Server running on http://localhost:3000");