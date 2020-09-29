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

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);

routes.post('/files', upload.single('file'), FileController.store);

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

routes.get('/answer-option', ServiceQuestionAnswerOptionController.index);
routes.post('/answer-option', ServiceQuestionAnswerOptionController.store);
routes.put('/answer-option/:id', ServiceQuestionAnswerOptionController.update);
routes.delete(
  '/answer-option/:id',
  ServiceQuestionAnswerOptionController.delete
);

/**
 * Budget
 */

export default routes;
