import 'reflect-metadata';
import {
  interfaces,
  InversifyExpressServer,
  TYPE
} from 'inversify-express-utils';
import { Container } from 'inversify';

import { LogService, MetricsService, SecurityService } from '../services';
import {
  IExample,
  IHystrixDemo,
  IProduct,
  IStarwars,
  IUser
} from '../../api/interfaces';
import { ILogger, IMetrics, ISecurity } from '../interfaces';
import {
  ExamplesService,
  ProductService,
  HystrixDemoService,
  StarwarsService,
  UserService
} from '../../api/services';
import LoggerMiddleware from '../middleware/logger-middleware';
import '../../api/controllers/hystrix-demo/controller';
import '../../api/controllers/examples/controller';
import '../../api/controllers/shop/controller';
import '../../api/controllers/starwars/controller';
import '../../api/controllers/security/controller';
import SERVICE_IDENTIFIER from '../constants/identifiers';
import TAG from '../constants/tags';

// Initialize the container
const container = new Container();

// Define service bindings
container.bind<IExample>(SERVICE_IDENTIFIER.EXAMPLE).to(ExamplesService);
container.bind<IHystrixDemo>(SERVICE_IDENTIFIER.HYSTRIX).to(HystrixDemoService);
container.bind<IProduct>(SERVICE_IDENTIFIER.PRODUCT).to(ProductService);
container.bind<IStarwars>(SERVICE_IDENTIFIER.STARWARS).to(StarwarsService);
container.bind<IUser>(SERVICE_IDENTIFIER.USER).to(UserService);
container
  .bind<ILogger>(SERVICE_IDENTIFIER.LOGGER)
  .to(LogService)
  .inSingletonScope();
container
  .bind<IMetrics>(SERVICE_IDENTIFIER.METRICS)
  .to(MetricsService)
  .inSingletonScope();
container
  .bind<ISecurity>(SERVICE_IDENTIFIER.SECURITY)
  .to(SecurityService)
  .inSingletonScope();
container
  .bind<LoggerMiddleware>(SERVICE_IDENTIFIER.LOGGER_MIDDLEWARE)
  .to(LoggerMiddleware);
export default container;
