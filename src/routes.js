import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import RoleController from './app/controllers/RoleController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import StateController from './app/controllers/StateController';
import CityController from './app/controllers/CityController';
import AddressController from './app/controllers/AddressController';
import ServiceCategoryController from './app/controllers/ServiceCategoryController';
import ServiceSubcategoryController from './app/controllers/ServiceSubcategoryController';
import ServiceQuestionController from './app/controllers/ServiceQuestionController';
import ServiceQuestionAnswerOptionController from './app/controllers/ServiceQuestionAnswerOptionController';
import ServiceBudgetRequestController from './app/controllers/ServiceBudgetRequestController';
import ServiceBudgetRequestAnswerController from './app/controllers/ServiceBudgetRequestAnswerController';
import ServiceBudgetController from './app/controllers/ServiceBudgetController';
import ServiceBudgetRequestFileController from './app/controllers/ServiceBudgetRequestFileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.store);

/**
 * Users
 */
routes.get('/providers', ProviderController.index);

routes.get('/users', UserController.index);
routes.put('/users', UserController.update);

routes.get('/roles', RoleController.index);
routes.post('/roles', RoleController.store);
routes.put('/roles/:id', RoleController.update);
routes.delete('/roles/:id', RoleController.delete);

/**
 * Locations
 */
routes.get('/states', StateController.index);
routes.post('/states', StateController.store);
routes.put('/states/:id', StateController.update);
routes.delete('/states/:id', StateController.delete);

routes.get('/cities', CityController.index);
routes.post('/cities', CityController.store);
routes.put('/cities/:id', CityController.update);
routes.delete('/cities/:id', CityController.delete);

routes.get('/adresses', AddressController.index);
routes.post('/adresses', AddressController.store);
routes.put('/adresses/:id', AddressController.update);
routes.delete('/adresses/:id', AddressController.delete);

/**
 * Categories
 */
routes.get('/categories', ServiceCategoryController.index);
routes.post('/categories', ServiceCategoryController.store);
routes.put('/categories/:id', ServiceCategoryController.update);
routes.delete('/categories/:id', ServiceCategoryController.delete);

routes.get('/subcategories', ServiceSubcategoryController.index);
routes.post('/subcategories', ServiceSubcategoryController.store);
routes.put('/subcategories/:id', ServiceSubcategoryController.update);
routes.delete('/subcategories/:id', ServiceSubcategoryController.delete);

/**
 * Questions
 */
routes.get('/questions', ServiceQuestionController.index);
routes.post('/questions', ServiceQuestionController.store);
routes.put('/questions/:id', ServiceQuestionController.update);
routes.delete('/questions/:id', ServiceQuestionController.delete);

routes.get('/answer-options', ServiceQuestionAnswerOptionController.index);
routes.post('/answer-options', ServiceQuestionAnswerOptionController.store);
routes.put('/answer-options/:id', ServiceQuestionAnswerOptionController.update);
routes.delete(
  '/answer-options/:id',
  ServiceQuestionAnswerOptionController.delete
);

/**
 * Budgets
 */
routes.get('/budget-requests', ServiceBudgetRequestController.index);
routes.post('/budget-requests', ServiceBudgetRequestController.store);
routes.put('/budget-requests/:id', ServiceBudgetRequestController.update);
routes.delete('/budget-requests/:id', ServiceBudgetRequestController.delete);

routes.get(
  '/budget-request-answers',
  ServiceBudgetRequestAnswerController.index
);
routes.post(
  '/budget-request-answers',
  ServiceBudgetRequestAnswerController.store
);
routes.put(
  '/budget-request-answers/:id',
  ServiceBudgetRequestAnswerController.update
);
routes.delete(
  '/budget-request-answers/:id',
  ServiceBudgetRequestAnswerController.delete
);

routes.get('/budgets', ServiceBudgetController.index);
routes.post('/budgets', ServiceBudgetController.store);
routes.put('/budgets/:id', ServiceBudgetController.update);
routes.delete('/budgets/:id', ServiceBudgetController.delete);

routes.get('/budgets-request-files', ServiceBudgetRequestFileController.index);
routes.post('/budgets-request-files', ServiceBudgetRequestFileController.store);
routes.put(
  '/budgets-request-files/:id',
  ServiceBudgetRequestFileController.update
);
routes.delete(
  '/budgets-request-files/:id',
  ServiceBudgetRequestFileController.delete
);

export default routes;
