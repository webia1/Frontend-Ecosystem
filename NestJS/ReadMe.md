# NestJS in a NxMonoRepo

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Nx Setup](#nx-setup)
  - [Nx Workspace: Run the NestJS Application](#nx-workspace-run-the-nestjs-application)
  - [Or run via `nest` (If created with NestJS CLI)](#or-run-via-nest-if-created-with-nestjs-cli)
  - [Nx & SWC](#nx--swc)
- [Theoretical Background](#theoretical-background)
  - [Controllers](#controllers)
    - [Example](#example)
      - [CatsController](#catscontroller)
      - [CreateCatDto](#createcatdto)
      - [UpdateCatDto](#updatecatdto)
      - [Cat Class](#cat-class)
      - [CatsService](#catsservice)
  - [Providers](#providers)
    - [Providers & Scope](#providers--scope)
    - [Providers, Value Providers, Factory Providers](#providers-value-providers-factory-providers)
    - [Optional Providers](#optional-providers)
    - [Property-based Injection](#property-based-injection)
    - [Provider registration](#provider-registration)
      - [Adding the service to the providers array of the @Module() decorator](#adding-the-service-to-the-providers-array-of-the-module-decorator)
      - [As Object with `provide` and `useClass` properties](#as-object-with-provide-and-useclass-properties)
      - [As Object with `provide` and `useValue` properties, whereby the value is an instance of the service](#as-object-with-provide-and-usevalue-properties-whereby-the-value-is-an-instance-of-the-service)
      - [As Object with `provide` and `useFactory` properties, whereby the factory function returns an instance of the service](#as-object-with-provide-and-usefactory-properties-whereby-the-factory-function-returns-an-instance-of-the-service)
      - [As Object with `provide`, `useFactory` and `inject` properties, whereby the factory function returns an instance of the service and awaits the result of the injected service before returning the instance of the service](#as-object-with-provide-usefactory-and-inject-properties-whereby-the-factory-function-returns-an-instance-of-the-service-and-awaits-the-result-of-the-injected-service-before-returning-the-instance-of-the-service)
      - [As Object with `provide`, `useFactory` and `inject` properties, whereby the factory function accepts parameters (`connection: Connection`) and dependend on them returns one or the other service instance](#as-object-with-provide-usefactory-and-inject-properties-whereby-the-factory-function-accepts-parameters-connection-connection-and-dependend-on-them-returns-one-or-the-other-service-instance)
      - [As Object with `provide`, `useFactory` and `inject` properties, whereby the factory function accepts a provider (`optionsProvider: OptionsProvider`) as parameter, awaits its result and creates the service instance with the result.](#as-object-with-provide-usefactory-and-inject-properties-whereby-the-factory-function-accepts-a-provider-optionsprovider-optionsprovider-as-parameter-awaits-its-result-and-creates-the-service-instance-with-the-result)
      - [As Object with `provide` and `useExisting` properties, whereby the value of the `useExisting` property is the class of the service](#as-object-with-provide-and-useexisting-properties-whereby-the-value-of-the-useexisting-property-is-the-class-of-the-service)
  - [Modules](#modules)
    - [Feature (Child) Modules](#feature-child-modules)
    - [Global Modules](#global-modules)
    - [Dynamic Modules](#dynamic-modules)
    - [Shared Modules](#shared-modules)
    - [Core Module (Singleton)](#core-module-singleton)
  - [Middleware](#middleware)
    - [Applying Middleware](#applying-middleware)
      - [`forRoutes()`](#forroutes)
    - [Multiple Middleware](#multiple-middleware)
    - [Excluding Routes](#excluding-routes)
    - [Functional Middleware](#functional-middleware)
    - [Global Middleware](#global-middleware)
    - [Further Details](#further-details)
  - [Exception Filters](#exception-filters)
    - [Throwing Standard Exceptions](#throwing-standard-exceptions)
    - [Custom Exceptions](#custom-exceptions)
    - [Built-in HTTP exceptions](#built-in-http-exceptions)
    - [Full Control with Exception Filters](#full-control-with-exception-filters)
    - [Arguments Host](#arguments-host)
    - [Binding Filters](#binding-filters)
      - [`APP_FILTER` Provider (Module-scoped Filter)](#app_filter-provider-module-scoped-filter)
      - [`@UseFilters()` Decorator (Controller-scoped Filter)](#usefilters-decorator-controller-scoped-filter)
      - [`@UseFilters()` Decorator (Method-scoped Filter)](#usefilters-decorator-method-scoped-filter)
      - [Application-scoped Filter](#application-scoped-filter)
    - [Catch Everything](#catch-everything)
    - [Inheritance](#inheritance)
    - [Exception Filters vs Pipes](#exception-filters-vs-pipes)
  - [Pipes](#pipes)
    - [Built-in Pipes](#built-in-pipes)
      - [ValidationPipe](#validationpipe)
      - [ParseIntPipe](#parseintpipe)
      - [ParseBoolPipe](#parseboolpipe)
      - [ParseArrayPipe](#parsearraypipe)
      - [ParseFloatPipe](#parsefloatpipe)
      - [ParseUUIDPipe](#parseuuidpipe)
      - [ParseEnumPipe](#parseenumpipe)
      - [DefaultValuePipe](#defaultvaluepipe)
      - [ParseFilePipe](#parsefilepipe)
      - [Custom Pipes](#custom-pipes)
    - [Schema-based Validation](#schema-based-validation)
    - [Binding Pipes (Overview)](#binding-pipes-overview)
    - [Binding Pipes (Other Techniques)](#binding-pipes-other-techniques)
      - [`APP_PIPE` Provider (Module-scoped Pipe)](#app_pipe-provider-module-scoped-pipe)
      - [`@UsePipes()` Decorator (Controller-scoped Pipe)](#usepipes-decorator-controller-scoped-pipe)
      - [`@UsePipes()` Decorator (Method-scoped Pipe)](#usepipes-decorator-method-scoped-pipe)
      - [Application-scoped Pipe](#application-scoped-pipe)
    - [Binding Multiple Pipes](#binding-multiple-pipes)
    - [Binding Multiple Pipes (with options)](#binding-multiple-pipes-with-options)
  - [Guards](#guards)
    - [Authorization Guards](#authorization-guards)
    - [Authorization guard](#authorization-guard)
    - [Execution context](#execution-context)
    - [Role based authentication](#role-based-authentication)
    - [Binding guards](#binding-guards)

<!-- /code_chunk_output -->

## Nx Setup

Create a new NestJS project within a NxMonoRepo via Nx Console:

```bash
npm i -g @nestjs/cli
npm i -D @nx/nest
npx nx generate @nx/nest:application
  --name=middleware-basis-app
  --frontendProject=basis-app
  --directory=apps/basis/middleware-basis-app
  --projectNameAndRootFormat=as-provided
  --tags=middleware-basis-app
  --no-interactive
  # --dry-run
```

### Nx Workspace: Run the NestJS Application

```bash
nx run middleware-basis-app:serve:development
```

### Or run via `nest` (If created with NestJS CLI)

> **Hint** If created with **nestjs/cli (nest)** instead of **Nx**
> To speed up the development process (x20 times faster builds), you can use the [SWC builder](https://docs.nestjs.com/recipes/swc) by passing the `-b swc` flag to the `start` script, as follows `nest start -b swc`.

### Nx & SWC

**For Nx & swc** -> see <https://nx.dev/nx-api/js/executors/swc>

## Theoretical Background

### Controllers

Controllers are responsible for handling **incoming requests** and **returning responses** to the client and for transforming the incoming request to the format required by the service.

They should be kept as lean as possible and should not contain any business logic except for routing logic. They are bound to a specific **path** (or paths) and **HTTP method** combination.

#### Example

##### CatsController

```ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';

/**
 * The `@Controller()` decorator takes an optional `path`
 * argument that will be prefixed to each path
 * defined within the controller. `/cats` in this case.
 */

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  /**
   * The `@Post()` decorator takes an optional `path` argument
   * that will be appended to the path defined at the controller level.
   * In this case, the path will be `/cats` + `/create`.
   *
   * The `@Body()` decorator takes an optional `param` argument
   * that will be used to retrieve the value of the parameter
   * from the request object.
   *
   * In this case, the value of the `createCatDto` parameter
   * will be retrieved from the `body` property of the request object.
   *
   * The `create()` method returns a `Promise` of type `Cat`.
   */

  @Post()
  create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  /**
   * The `@Get()` decorator takes an optional `path` argument
   * that will be appended to the path defined at the controller level.
   * In this case, the path will be `/cats` + `/findAll`.
   * The `findAll()` method returns a `Promise` of type `Cat[]`.
   */

  @Get()
  findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  /**
   * The `@Get()` decorator takes an optional `path` argument
   * that will be appended to the path defined at the controller level.
   * In this case, the path will be `/cats` + `/:id`.
   *
   * The `@Param()` decorator takes an optional `param` argument
   * that will be used to retrieve the value of the parameter
   * from the request object.
   *
   * In this case, the value of the `id` parameter
   * will be retrieved from the `params` property of the request object.
   * The `findOne()` method returns a `Promise` of type `Cat`.
   */

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findOne(+id);
  }

  /**
   * The `@Patch()` decorator takes an optional `path` argument
   * that will be appended to the path defined at the controller level.
   * In this case, the path will be `/cats` + `/:id`.
   *
   * The `@Param()` decorator takes an optional `param` argument
   * that will be used to retrieve the value of the parameter
   * from the request object.
   *
   * In this case, the value of the `id` parameter
   * will be retrieved from the `params` property of the request object.
   *
   * The `@Body()` decorator takes an optional `param` argument
   * that will be used to retrieve the value of the parameter
   * from the request object.
   *
   * In this case, the value of the `updateCatDto` parameter
   * will be retrieved from the `body` property of the request object.
   *
   * The `update()` method returns a `Promise` of type `Cat`.
   */

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<Cat> {
    return this.catsService.update(+id, updateCatDto);
  }

  /**
   * The `@Delete()` decorator takes an optional `path` argument
   * that will be appended to the path defined at the controller level.
   *
   * In this case, the path will be `/cats` + `/:id`.
   *
   * The `@Param()` decorator takes an optional `param` argument
   * that will be used to retrieve the value of the parameter
   * from the request object.
   *
   * In this case, the value of the `id` parameter
   * will be retrieved from the `params` property of the request object.
   *
   * The `remove()` method returns a `Promise` of type `void`.
   */

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.catsService.remove(+id);
  }
}
```

##### CreateCatDto

```ts
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
```

##### UpdateCatDto

```ts
export class UpdateCatDto {
  name: string;
  age: number;
  breed: string;
}
```

##### Cat Class

```ts
export class Cat {
  id: number;
  name: string;
  age: number;
  breed: string;
}
```

##### CatsService

```ts
import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(createCatDto: CreateCatDto): Promise<Cat> {
    const cat = new Cat();
    cat.name = createCatDto.name;
    cat.age = createCatDto.age;
    cat.breed = createCatDto.breed;

    this.cats.push(cat);
    return Promise.resolve(cat);
  }

  findAll(): Promise<Cat[]> {
    return Promise.resolve(this.cats);
  }

  findOne(id: number): Promise<Cat> {
    return Promise.resolve(this.cats[id]);
  }

  update(id: number, updateCatDto: UpdateCatDto): Promise<Cat> {
    const cat = this.cats[id];
    cat.name = updateCatDto.name;
    cat.age = updateCatDto.age;
    cat.breed = updateCatDto.breed;

    return Promise.resolve(cat);
  }

  remove(id: number): Promise<void> {
    this.cats.splice(id, 1);
    return Promise.resolve();
  }
}
```

### Providers

Everything, that can be annotated with the `@Injectable()` decorator, can be used as a provider. The `@Injectable()` decorator is optional, but it is good practice to use it to keep the code clean and explicit.

#### Providers & Scope

By default, Nest makes each provider **singleton**, which means that **the same instance of each provider will be shared across the entire module**. If you want to **limit the scope of a provider**, you can use the `@Scope()` decorator.

```ts
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class CatsService {}
```

The `@Scope()` decorator takes a single argument, which is a `Scope` enum member. The following table describes the available options:

> **Hint** The `REQUEST` scope is **not** available in **microservices**. If you want to **share** the provider instance across consumers, you should **not** use the `REQUEST` scope.

| Scope       | Description                                                                                                                                                                                                                                                                                                         |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DEFAULT`   | The provider is instantiated **only once** in the scope of the entire application. The same instance is shared across **all** consumers.                                                                                                                                                                            |
| `TRANSIENT` | The provider is instantiated **every time** it is requested. This behavior is **independent** of the consumer's lifetime, which means that **every** consumer gets a **dedicated** instance of the provider.                                                                                                        |
| `REQUEST`   | The provider is instantiated **once** per incoming request. That means that **each** provider instance lives **only** within the **scope** of a single request and **is not** shared across consumers. If you want to **share** the provider instance across consumers, you should **not** use the `REQUEST` scope. |

#### Providers, Value Providers, Factory Providers

Value providers are a special type of provider that **returns a value** rather than an instance when requested. Value providers are **not** instantiated by the Nest IoC container.

Factory providers are a special type of provider that returns a value created by a **factory function**. Factory providers are **not** instantiated by the Nest IoC container.

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly envConfig: Record<string, string>;

  constructor() {
    this.envConfig = dotenv.parse(fs.readFileSync('.env'));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
```

#### Optional Providers

If you want to **inject** a provider **conditionally**, you can use the `@Optional()` decorator. If the provider is not found, the `@Optional()` decorator will cause the **dependency injector** to **inject** `undefined` instead of throwing an exception.

```ts
import { Injectable, Optional } from '@nestjs/common';
import { CatsService } from './cats.service';

@Injectable()
export class DogsService {
  constructor(@Optional() private catsService: CatsService) {}
}
```

#### Property-based Injection

Details online <https://docs.nestjs.com/providers#property-based-injection>

The technique we've used so far is called constructor-based injection, as providers are injected via the constructor method. In some very specific cases, **property-based injection** might be useful. For instance, if your top-level class depends on either one or multiple providers, passing them all the way up by calling `super()` in sub-classes from the constructor can be very tedious. In order to avoid this, you can use the `@Inject()` decorator at the property level.

```ts
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;
}
```

#### Provider registration

Providers are registered in modules.

##### Adding the service to the providers array of the @Module() decorator

CatsController has CatsService as a dependency. The CatsService is a provider. The CatsService is registered in the providers array of the @Module() decorator.

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
```

##### As Object with `provide` and `useClass` properties

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [
    {
      provide: CatsService,
      useClass: CatsService,
    },
  ],
})
export class CatsModule {}
```

##### As Object with `provide` and `useValue` properties, whereby the value is an instance of the service

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [
    {
      provide: 'CatsService',
      useValue: new CatsService(),
    },
  ],
})
export class CatsModule {}
```

##### As Object with `provide` and `useFactory` properties, whereby the factory function returns an instance of the service

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [
    {
      provide: 'CatsService',
      useFactory: () => {
        const catsService = new CatsService();
        // ... do something with the catsService
        // e.g. bind to events, etc.
        return catsService;
      },
    },
  ],
})
export class CatsModule {}
```

##### As Object with `provide`, `useFactory` and `inject` properties, whereby the factory function returns an instance of the service and awaits the result of the injected service before returning the instance of the service

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [
    {
      provide: 'CatsService',
      useFactory: async () => {
        const catsService = new CatsService();
        await catsService.init();
        return catsService;
      },
    },
  ],
})
export class CatsModule {}
```

##### As Object with `provide`, `useFactory` and `inject` properties, whereby the factory function accepts parameters (`connection: Connection`) and dependend on them returns one or the other service instance

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [
    {
      provide: 'CatsService',
      useFactory: (connection: Connection) => {
        if (connection.isConnected) {
          return new CatsService(connection);
        }
        return new MockCatsService();
      },
      inject: [Connection],
    },
  ],
})
export class CatsModule {}
```

##### As Object with `provide`, `useFactory` and `inject` properties, whereby the factory function accepts a provider (`optionsProvider: OptionsProvider`) as parameter, awaits its result and creates the service instance with the result.

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [
    {
      provide: 'CatsService',
      useFactory: async (optionsProvider: OptionsProvider) => {
        const options = await optionsProvider.get();
        return new CatsService(options);
      },
      inject: [OptionsProvider],
    },
  ],
})
export class CatsModule {}
```

##### As Object with `provide` and `useExisting` properties, whereby the value of the `useExisting` property is the class of the service

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Connection } from './connection.provider';

@Module({
  controllers: [CatsController],
  providers: [
    CatsService,
    Connection,
    {
      provide: 'CONNECTION',
      useExisting: Connection,
    },
  ],
})
export class CatsModule {}
```

### Modules

Source: <https://docs.nestjs.com/modules>

Each application has at least one module, a **root module**. The root module is the starting point Nest uses to build the **application graph** - the internal data structure Nest uses to resolve module and provider relationships and dependencies.

A module is a class annotated with a `@Module()` decorator. The `@Module()` decorator provides metadata that Nest makes use of to organize the application structure.

A module can have **one or more** of the following properties:

- `controllers` - the set of controllers defined in the module which have to be instantiated
- `exports` - the subset of providers that are provided by this module and should be available in other modules which import this module
- `imports` - the set of modules required by this module
- `providers` - the set of providers defined in the module which have to be instantiated by the Nest injector

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

#### Feature (Child) Modules

Feature modules are modules that **organize the code** related to a specific feature, keeping code that belongs together **closely**. They can be **imported** by other modules.

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

#### Global Modules

Global modules are modules that **should be available everywhere** in the application context. They should be **registered only once** and **not** be **re-exported** from any other module.

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

#### Dynamic Modules

Dynamic modules are modules that are **not** known at compile time and are **created** dynamically based on runtime information. They are declared using a **provider-based** syntax.

```ts
import { Module } from '@nestjs/common';
import { createDatabaseProviders } from './database.providers';

@Module({
  providers: [...createDatabaseProviders()],
})
export class DatabaseModule {}
```

#### Shared Modules

Shared modules are modules that **export** providers that are widely used and **re-exported** by other modules.

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

#### Core Module (Singleton)

The core module is a special module that is **available everywhere** in the application context. It should be **registered only once** and **not** be **re-exported** from any other module.

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';

@Module({
  controllers: [CatsController],
})
export class CoreModule {}
```

### Middleware

Source: <https://docs.nestjs.com/middleware>

Middleware are functions that have access to the **request** and **response** object. Middleware functions can **execute** any code, **make changes** to the request and the response objects, **end** the request-response cycle, and **call** the next middleware function in the stack.

The difference to interceptors is, that middleware functions have **full access** to the **request** and **response** objects, whereas interceptors are **not** allowed to **modify** the **request** object.

```ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
```

#### Applying Middleware

```ts
import {
  Module,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})

// The `configure()` method takes a `consumer` argument
// which defines the set of routes which are handled by the middleware.
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
```

##### `forRoutes()`

The `forRoutes()` method can take:

- a **string** representing a **path** (or paths)
- a **class** representing a **controller**
- an **object** representing a **specific route configuration**

#### Multiple Middleware

As mentioned above, in order to bind multiple middleware that are executed sequentially, simply provide a comma separated list inside the apply() method:

```ts
consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
```

#### Excluding Routes

```ts
import {
  Module,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})

// The `configure()` method takes a `consumer` argument
// which defines the set of routes which are handled by the middleware.
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
      )
      .forRoutes(CatsController);
  }
}
```

#### Functional Middleware

```ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      console.log('Request...');
      next();
    };
  }
}
```

#### Global Middleware

If we want to bind middleware to every registered route at once, we can use the `use()` method that is supplied by the `INestApplication` instance:

```ts
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```

> **Hint** Accessing the DI container in a global middleware is not possible. You can use a [functional middleware](https://docs.nestjs.com/middleware#functional-middleware) instead when using `app.use()`. Alternatively, you can use a class middleware and consume it with `.forRoutes('*')` within the `AppModule` (or any other module).

#### Further Details

```ts
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './common/pipes/validation.pipe';
```

The `APP_GUARD` token is used to provide a guard that is applied
globally to all controllers.

RolesGuard is a provider with `provide` and `useClass` properties. The value of the `useClass` property is the class of the guard. The `provide` property is optional and defaults to the class of the guard. The `provide` property is used to inject the guard into other providers.

The `APP_FILTER` token is used to provide a filter that is applied
globally to all controllers.

HttpExceptionFilter is a provider with `provide` and `useClass` properties. The value of the `useClass` property is the class of the filter. The `provide` property is optional and defaults to the class of the filter. The `provide` property is used to inject the filter into other providers.

The `APP_INTERCEPTOR` token is used to provide an interceptor that is applied
globally to all controllers.

LoggingInterceptor is a provider with `provide` and `useClass` properties. The value of the `useClass` property is the class of the interceptor. The `provide` property is optional and defaults to the class of the interceptor. The `provide` property is used to inject the interceptor into other providers.

The `APP_PIPE` token is used to provide a pipe that is applied
globally to all controllers.

ValidationPipe is a provider with `provide` and `useClass` properties. The value of the `useClass` property is the class of the pipe. The `provide` property is optional and defaults to the class of the pipe. The `provide` property is used to inject the pipe into other providers.

### Exception Filters

Source: <https://docs.nestjs.com/exception-filters>

Exception filters are used to **catch** exceptions **globally** and **transform** them into **proper responses**.

You can compare them with Angular's **interceptors**. The difference is that **interceptors** are called **before** a handler is executed, and **exception filters** are called **after** an exception is thrown from the handler. Exception filters should implement the `ExceptionFilter` interface.

```ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

```ts
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
```

Out of the box, this action is performed by a built-in **global exception filter**, which handles exceptions of type `HttpException` (and subclasses of it). When an exception is **unrecognized** (is neither `HttpException` nor a class that inherits from `HttpException`), the built-in exception filter generates the following default JSON response:

```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

> **Hint** The global exception filter partially supports the `http-errors` library. Basically, any thrown exception containing the `statusCode` and `message` properties will be properly populated and sent back as a response (instead of the default `InternalServerErrorException` for unrecognized exceptions).

#### Throwing Standard Exceptions

Nest provides a set of standard exceptions that are mapped to HTTP response status codes. For example, the `NotFoundException` exception is mapped to the `404` status code. When this exception is thrown, Nest automatically responds with the following JSON:

```json
{
  "statusCode": 404,
  "message": "Not Found"
}
```

The following table describes the built-in exceptions and their corresponding HTTP status codes:

| Exception Name                  | Status Code |
| ------------------------------- | ----------- |
| `BadRequestException`           | `400`       |
| `UnauthorizedException`         | `401`       |
| `NotFoundException`             | `404`       |
| `ForbiddenException`            | `403`       |
| `NotAcceptableException`        | `406`       |
| `RequestTimeoutException`       | `408`       |
| `ConflictException`             | `409`       |
| `GoneException`                 | `410`       |
| `PayloadTooLargeException`      | `413`       |
| `UnsupportedMediaTypeException` | `415`       |
| `UnprocessableEntityException`  | `422`       |
| `InternalServerErrorException`  | `500`       |
| `NotImplementedException`       | `501`       |
| `BadGatewayException`           | `502`       |
| `ServiceUnavailableException`   | `503`       |
| `GatewayTimeoutException`       | `504`       |

Nest provides a built-in `HttpException` class, exposed from the `@nestjs/common` package. For typical HTTP REST/GraphQL API based applications, it's best practice to send standard HTTP response objects when certain error conditions occur.

For example, in the `CatsController`, we have a `findAll()` method (a `GET` route handler). Let's assume that this route handler throws an exception for some reason. To demonstrate this, we'll hard-code it as follows:

```ts
@Get()
async findAll() {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
```

The `HttpException` class takes two arguments: a `response` and a `status` code. The `response` argument can be either a string or an object. If it's an object, it will be stringified and returned as a JSON response. The `status` argument is an HTTP response status code.

The `HttpException` class is a subclass of the built-in `Error` class. This means that you can pass an error stack to the `response` argument. For example:

```ts
@Get()
async findAll() {
  throw new HttpException({
    status: HttpStatus.FORBIDDEN,
    error: 'This is a custom message',
  }, HttpStatus.FORBIDDEN);
}
```

> **Hint** We used the `HttpStatus` here. This is a helper enum imported from the `@nestjs/common` package.

To override just the message portion of the JSON response body, supply a string in the `response` argument. To override the entire JSON response body, pass an object in the `response` argument. Nest will serialize the object and return it as the JSON response body.

The second constructor argument - `status` - should be a valid HTTP status code. Best practice is to use the `HttpStatus` enum imported from `@nestjs/common`.

There is a **third** constructor argument (optional) - `options` - that can be used to provide an error [cause](https://nodejs.org/en/blog/release/v16.9.0/#error-cause). This `cause` object is not serialized into the response object, but it can be useful for logging purposes, providing valuable information about the inner error that caused the `HttpException` to be thrown.

Here's an example overriding the entire response body and providing an error cause:

```ts
@Get()
async findAll() {
try {
  await this.service.findAll()
} catch (error) {
  throw new HttpException({
    status: HttpStatus.FORBIDDEN,
    error: 'This is a custom message',
  }, HttpStatus.FORBIDDEN, {
    cause: error
  });
}
}
```

Using the above, this is how the response would look:

```json
{
  "statusCode": 403,
  "error": "This is a custom message"
}
```

#### Custom Exceptions

You can create your own custom exceptions by extending the built-in `HttpException` class. For example, let's create a `ForbiddenException` class:

```ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
```

Now, we can throw this exception from the `CatsController`:

```ts

@Get()
async findAll() {
  throw new ForbiddenException();
}
```

#### Built-in HTTP exceptions

Nest provides a set of standard exceptions that inherit from the base `HttpException`. These are exposed from the `@nestjs/common` package, and represent many of the most common HTTP exceptions:

- `BadRequestException`
- `UnauthorizedException`
- `NotFoundException`
- `ForbiddenException`
- `NotAcceptableException`
- `RequestTimeoutException`
- `ConflictException`
- `GoneException`
- `HttpVersionNotSupportedException`
- `PayloadTooLargeException`
- `UnsupportedMediaTypeException`
- `UnprocessableEntityException`
- `InternalServerErrorException`
- `NotImplementedException`
- `ImATeapotException`
- `MethodNotAllowedException`
- `BadGatewayException`
- `ServiceUnavailableException`
- `GatewayTimeoutException`
- `PreconditionFailedException`

All the built-in exceptions can also provide both an error `cause` and an error description using the `options` parameter:

```typescript
throw new BadRequestException('Something bad happened', {
  cause: new Error(),
  description: 'Some error description',
});
```

Using the above, this is how the response would look:

```json
{
  "message": "Something bad happened",
  "error": "Some error description",
  "statusCode": 400
}
```

#### Full Control with Exception Filters

While the base (built-in) exception filter can automatically handle many cases for you, you may want **full control** over the exceptions layer. For example, you may want to add logging or use a different JSON schema based on some dynamic factors. **Exception filters** are designed for exactly this purpose. They let you control the exact flow of control and the content of the response sent back to the client.

Let's create an exception filter that is responsible for catching exceptions which are an instance of the `HttpException` class, and implementing custom response logic for them. To do this, we'll need to access the underlying platform `Request` and `Response` objects. We'll access the `Request` object so we can pull out the original `url` and include that in the logging information. We'll use the `Response` object to take direct control of the response that is sent, using the `response.json()` method.

```ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

> **Hint** All exception filters should implement the generic `ExceptionFilter<T>` interface. This requires you to provide the `catch(exception: T, host: ArgumentsHost)` method with its indicated signature. `T` indicates the type of the exception.

The `@Catch(HttpException)` decorator binds the required metadata to the exception filter, telling Nest that this particular filter is looking for exceptions of type `HttpException` and nothing else. The `@Catch()` decorator may take a single parameter, or a comma-separated list. This lets you set up the filter for several types of exceptions at once.

The `catch()` method is the heart of the exception filter. It receives two arguments:

- `exception` - the exception instance being handled
- `host` - the arguments host object

The `host` object provides access to the underlying platform `Request` and `Response` objects. The `switchToHttp()` method returns an object with two methods: `getRequest()` and `getResponse()`. These methods return the underlying `Request` and `Response` objects respectively.

The `exception` object is an instance of the `HttpException` class. This class has a `getStatus()` method that returns the HTTP status code of the exception. We use this to set the status code of the response.

Finally, we use the `response.json()` method to send a JSON response back to the client. We use the `request.url` property to include the original URL in the response.

#### Arguments Host

Let's look at the parameters of the `catch()` method. The `exception` parameter is the exception object currently being processed. The `host` parameter is an `ArgumentsHost` object. `ArgumentsHost` is a powerful utility object that we'll examine further in the [execution context chapter](https://docs.nestjs.com/fundamentals/execution-context). In this code sample, we use it to obtain a reference to the `Request` and `Response` objects that are being passed to the original request handler (in the controller where the exception originates). In this code sample, we've used some helper methods on `ArgumentsHost` to get the desired `Request` and `Response` objects. Learn more about `ArgumentsHost`[here](https://docs.nestjs.com/fundamentals/execution-context).

The reason for this level of abstraction is that `ArgumentsHost` functions in all contexts (e.g., the HTTP server context we're working with now, but also Microservices and WebSockets). In the execution context chapter we'll see how we can access the appropriate [underlying arguments](https://docs.nestjs.com/fundamentals/execution-context#host-methods) for **any** execution context with the power of `ArgumentsHost` and its helper functions. This will allow us to write generic exception filters that operate across all contexts.

#### Binding Filters

Now that we've created our exception filter, we need to bind it to the application. We can do this in several ways. The first way is to bind it globally, using the `APP_FILTER` provider:

##### `APP_FILTER` Provider (Module-scoped Filter)

You can add as many filters with this technique as needed; simply add each to the providers array.

```ts
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
```

> **Hint** When using this approach to perform dependency injection for the filter, note that regardless of the module where this construction is employed, the filter is, in fact, global. Where should this be done? Choose the module where the filter (`HttpExceptionFilter` in the example above) is defined. Also, `useClass` is not the only way of dealing with custom provider registration. Learn more [here](https://docs.nestjs.com/fundamentals/custom-providers).

The `APP_FILTER` token is used to provide a filter that is applied globally to all controllers.

HttpExceptionFilter is a provider with `provide` and `useClass` properties. The value of the `useClass` property is the class of the filter. The `provide` property is optional and defaults to the class of the filter. The `provide` property is used to inject the filter into other providers.

The second way is to bind it to a particular controller or set of controllers using the `@UseFilters()` decorator:

##### `@UseFilters()` Decorator (Controller-scoped Filter)

```ts
import { Controller, Get, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';

@Controller('cats')
@UseFilters(new HttpExceptionFilter())
export class CatsController {}
```

The `@UseFilters()` decorator takes a single argument, which is the exception filter instance. This is the same instance that would be provided by the `APP_FILTER` provider.

The third way is to bind it to a particular method or set of methods using the `@UseFilters()` decorator:

##### `@UseFilters()` Decorator (Method-scoped Filter)

```ts
import { Controller, Get, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';

@Controller('cats')
export class CatsController {
  @Get()
  @UseFilters(new HttpExceptionFilter())
  async findAll() {
    throw new ForbiddenException();
  }
}
```

##### Application-scoped Filter

To create a application-scoped filter, you would do the following:

```ts
// main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
```

> **Warning** The `useGlobalFilters()` method does not set up filters for gateways or hybrid applications.

Global-scoped filters are used across the whole application, for every controller and every route handler. In terms of dependency injection, global filters registered from outside of any module (with `useGlobalFilters()` as in the example above) cannot inject dependencies since this is done outside the context of any module. In order to solve this issue, you can register a global-scoped filter **directly from any module** using the construction mentioned above: `APP_FILTER` provider.

#### Catch Everything

In order to catch **every** unhandled exception (regardless of the exception type), leave the `@Catch()` decorator's parameter list empty, e.g., `@Catch()`.

In the example below we have a code that is platform-agnostic because it uses the [HTTP adapter](https://docs.nestjs.com/faq/http-adapter) to deliver the response, and doesn't use any of the platform-specific objects (`Request` and `Response`) directly:

```ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be
    // available in the constructor method, thus we
    // should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
```

> **Warning** When combining an exception filter that catches everything with a filter that is bound to a specific type, the "Catch anything" filter should be declared first to allow the specific filter to correctly handle the bound type.

#### Inheritance

Exception filters can be inherited. This means that you can create a base exception filter that implements some common logic, and then extend it to create more specialized exception filters. For example, let's create a `HttpExceptionFilter` that implements the logic for handling `HttpException` exceptions, and then extend it to create a `ForbiddenExceptionFilter` that handles `ForbiddenException` exceptions:

```ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // ...
  }
}
```

```ts
import { ForbiddenException } from './forbidden.exception';
import { HttpExceptionFilter } from './http-exception.filter';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter extends HttpExceptionFilter {
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}
```

Another Example: Typically, you'll create fully customized exception filters crafted to fulfill your application requirements. However, there might be use-cases when you would like to simply extend the built-in default **global exception filter**, and override the behavior based on certain factors.

In order to delegate exception processing to the base filter, you need to extend `BaseExceptionFilter` and call the inherited `catch()` method.

```ts
import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}
```

> **Warning** Method-scoped and Controller-scoped filters that extend the `BaseExceptionFilter` should not be instantiated with `new`. Instead, let the framework instantiate them automatically.

The above implementation is just a shell demonstrating the approach. Your implementation of the extended exception filter would include your tailored **business** logic (e.g., handling various conditions).

Global filters **can** extend the base filter. This can be done in either of two ways.

The first method is to inject the `HttpAdapter` reference when instantiating the custom global filter:

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
```

The second method is to use the APP_FILTER token as shown further above.

#### Exception Filters vs Pipes

Exception filters and pipes are **different** things. Pipes are about **data transformation** and should be used to **transform** the **input** data to the **desired output**. Exception filters are about **handling exceptions** and should be used to **create** a **proper** **response**.

### Pipes

Source: <https://docs.nestjs.com/pipes>

A pipe is a class annotated with the `@Injectable()` decorator, which implements the `PipeTransform` interface.

```ts
import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any) {
    return value;
  }
}
```

Pipes have two typical use cases:

- **transformation** - transform input data to the desired form (e.g., from string to integer)
- **validation** - evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception when the data is incorrect

In both cases, pipes operate on the `arguments` being processed by a [controller route handler](https://docs.nestjs.com/controllers#route-parameters). Nest interposes a pipe just before a method is invoked, and the pipe receives the arguments destined for the method and operates on them. Any transformation or validation operation takes place at that time, after which the route handler is invoked with any (potentially) transformed arguments.

Nest comes with a number of built-in pipes that you can use out-of-the-box. You can also build your own custom pipes. In this chapter, we'll introduce the built-in pipes and show how to bind them to route handlers. We'll then examine several custom-built pipes to show how you can build one from scratch.

> **Hint** Pipes run inside the exceptions zone. This means that when a Pipe throws an exception it is handled by the exceptions layer (global exceptions filter and any [exceptions filters](https://docs.nestjs.com/exception-filters) that are applied to the current context). Given the above, it should be clear that when an exception is thrown in a Pipe, no controller method is subsequently executed. This gives you a best-practice technique for validating data coming into the application from external sources at the system boundary.

#### Built-in Pipes

Nest provides a set of **built-in pipes** that cover most of the use-cases for the applications. These pipes are available from the `@nestjs/common` package. Let's take a look at each of them.

##### ValidationPipe

The `ValidationPipe` uses the [class-validator]().

```ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ValidationPipe } from './common/pipes/validation.pipe';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createCatDto: CreateCatDto,
  ) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

##### ParseIntPipe

The `ParseIntPipe` converts a string to an integer value. If the string is not a number, an exception will be thrown (HTTP response status code `400 Bad Request`).

```ts
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Cat> {
    return this.catsService.findOne(id);
  }
}
```

##### ParseBoolPipe

The `ParseBoolPipe` converts a string to a boolean value. If the string is not a boolean, an exception will be thrown (HTTP response status code `400 Bad Request`).

```ts
import {
  Controller,
  Get,
  Param,
  ParseBoolPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get(':id')
  async findOne(
    @Param('id', ParseBoolPipe) id: boolean,
  ): Promise<Cat> {
    return this.catsService.findOne(id);
  }
}
```

##### ParseArrayPipe

The `ParseArrayPipe` converts a string to an array. If the string is not an array, an exception will be thrown (HTTP response status code `400 Bad Request`).

```ts
import {
  Controller,
  Get,
  Param,
  ParseArrayPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get(':id')
  async findOne(
    @Param('id', ParseArrayPipe) id: number[],
  ): Promise<Cat> {
    return this.catsService.findOne(id);
  }
}
```

##### ParseFloatPipe

The `ParseFloatPipe` converts a string to a float value. If the string is not a number, an exception will be thrown (HTTP response status code `400 Bad Request`).

```ts
import {
  Controller,
  Get,
  Param,
  ParseFloatPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get(':id')
  async findOne(
    @Param('id', ParseFloatPipe) id: number,
  ): Promise<Cat> {
    return this.catsService.findOne(id);
  }
}
```

##### ParseUUIDPipe

The `ParseUUIDPipe` converts a string to a UUID value. If the string is not a UUID, an exception will be thrown (HTTP response status code `400 Bad Request`).

```ts
import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: number,
  ): Promise<Cat> {
    return this.catsService.findOne(id);
  }
}
```

##### ParseEnumPipe

The `ParseEnumPipe` converts a string to a enum value. If the string is not a enum, an exception will be thrown (HTTP response status code `400 Bad Request`).

```ts
import {
  Controller,
  Get,
  Param,
  ParseEnumPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get(':id')
  async findOne(
    @Param('id', ParseEnumPipe) id: number,
  ): Promise<Cat> {
    return this.catsService.findOne(id);
  }
}
```

##### DefaultValuePipe

The `DefaultValuePipe` sets a default value for the parameter. If the parameter is not present in the request, the default value will be used. If the parameter is present, the value from the request will be used.

```ts
import {
  Controller,
  Get,
  Param,
  DefaultValuePipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get(':id')
  async findOne(
    @Param('id', new DefaultValuePipe(0)) id: number,
  ): Promise<Cat> {
    return this.catsService.findOne(id);
  }
}
```

##### ParseFilePipe

The `ParseFilePipe` converts a file to a `multer` file object. If the file is not a file, an exception will be thrown (HTTP response status code `400 Bad Request`).

```ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cats')
export class CatsController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  uploadFile(@UploadedFile() file) {
    console.log(file);
  }
}
```

##### Custom Pipes

You can create your own custom pipes by implementing the `PipeTransform` interface. The `PipeTransform` interface defines a single `transform()` method that you must implement. This method takes two arguments:

- `value` - the value passed into the method
- `metadata` - additional information about the value

The `transform()` method should return the transformed value. If the value cannot be transformed, you should throw an exception. The exception will be handled by Nest and an appropriate HTTP response will be sent back to the client.

Let's create a custom pipe that transforms a string to an integer value. If the string is not a number, we'll throw an exception.

```ts
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
```

The `ParseIntPipe` class implements the `PipeTransform` interface. The `PipeTransform` interface is a generic interface that takes two type arguments:

- `T` - the type of the value being transformed
- `R` - the type of the transformed value

In this case, we're transforming a string to a number, so `T` is `string` and `R` is `number`.

The `transform()` method takes two arguments:

- `value` - the value passed into the method
- `metadata` - additional information about the value

The `value` parameter is the currently processed method argument (before it is received by the route handling method), and `metadata` is the currently processed method argument's metadata. The metadata object has these properties:

- `type` - the type of the value being transformed
- `metatype` - the type of the object that contains the value being transformed
- `data` - the value being transformed

```ts
export interface ArgumentMetadata {
  type: 'body' | 'query' | 'param' | 'custom';
  metatype?: Type<unknown>;
  data?: string;
}
```

> **Warning** TypeScript interfaces disappear during transpilation. Thus, if a method parameter's type is declared as an interface instead of a class, the `metatype` value will be `Object`.

The `transform()` method should return the transformed value. If the value cannot be transformed, you should throw an exception. The exception will be handled by Nest and an appropriate HTTP response will be sent back to the client.

The `transform()` method is where you implement your custom logic. In this case, we're using the built-in `parseInt()` function to convert the string to a number. If the string is not a number, `parseInt()` will return `NaN`. We check for this and throw an exception if it occurs.

> **Hint** The `metadata` argument is an instance of the `ArgumentMetadata` interface. This interface defines two properties: `type` and `metatype`. The `type` property is the type of the value being transformed. The `metatype` property is the type of the object that contains the value being transformed. For example, if the value is a property of a class, the `metatype` property will be the type of that class.

#### Schema-based Validation

Let's make our validation pipe a little more useful. Take a closer look at the create() method of the CatsController, where we probably would like to ensure that the post body object is valid before attempting to run our service method.

```ts
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

Let's focus in on the `createCatDto` body parameter. Its type is `CreateCatDto`:

```typescript
// create-cat.dto.ts

export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
```

We want to ensure that any incoming request to the create method contains a valid body. So we have to validate the three members of the `createCatDto` object. We could do this inside the route handler method, but doing so is not ideal as it would break the **single responsibility rule** (SRP).

Another approach could be to create a **validator class** and delegate the task there. This has the disadvantage that we would have to remember to call this validator at the beginning of each method.

How about creating validation middleware? This could work, but unfortunately, it's not possible to create **generic middleware** which can be used across all contexts across the whole application. This is because middleware is unaware of the **execution context**, including the handler that will be called and any of its parameters.

This is, of course, exactly the use case for which pipes are designed. So let's go ahead and refine our validation pipe.

#### Binding Pipes (Overview)

To use a pipe, we need to bind an instance of the pipe class to the appropriate context. In our `ParseIntPipe` example, we want to associate the pipe with a particular route handler method, and make sure it runs before the method is called. We do so with the following construct, which we'll refer to as binding the pipe at the method parameter level:

```typescript

@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}
```

This ensures that one of the following two conditions is true: either the parameter we receive in the `findOne()` method is a number (as expected in our call to `this.catsService.findOne()`), or an exception is thrown before the route handler is called.

For example, assume the route is called like:

```bash

GET localhost:3000/abc
```

Nest will throw an exception like this:

```json
{
  "statusCode": 400,
  "message": "Validation failed (numeric string is expected)",
  "error": "Bad Request"
}
```

The exception will prevent the body of the `findOne()` method from executing.

In the example above, we pass a class (`ParseIntPipe`), not an instance, leaving responsibility for instantiation to the framework and enabling dependency injection. As with pipes and guards, we can instead pass an in-place instance. Passing an in-place instance is useful if we want to customize the built-in pipe's behavior by passing options:

```typescript

@Get(':id')
async findOne(
  @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
  id: number,
) {
  return this.catsService.findOne(id);
}
```

Binding the other transformation pipes (all of the **Parse\*** pipes) works similarly. These pipes all work in the context of validating route parameters, query string parameters and request body values.

For example with a query string parameter:

```typescript

@Get()
async findOne(@Query('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}
```

Here's an example of using the `ParseUUIDPipe` to parse a string parameter and validate if it is a UUID.

```typescript

@Get(':uuid')
async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
  return this.catsService.findOne(uuid);
}
```

> **Hint** When using `ParseUUIDPipe()` you are parsing UUID in version 3, 4 or 5, if you only require a specific version of UUID you can pass a version in the pipe options.

Above we've seen examples of binding the various `Parse*` family of built-in pipes.

#### Binding Pipes (Other Techniques)

Now that we've created our custom pipe, we need to bind it to the application. We can do this in several ways. The first way is to bind it globally, using the `APP_PIPE` provider:

##### `APP_PIPE` Provider (Module-scoped Pipe)

You can add as many pipes with this technique as needed; simply add each to the providers array.

```ts
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './common/pipes/validation.pipe';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
```

##### `@UsePipes()` Decorator (Controller-scoped Pipe)

```ts
import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
} from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ValidationPipe } from './common/pipes/validation.pipe';

@Controller('cats')
@UsePipes(new ValidationPipe())
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

##### `@UsePipes()` Decorator (Method-scoped Pipe)

```ts
import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
} from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ValidationPipe } from './common/pipes/validation.pipe';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

##### Application-scoped Pipe

To create a application-scoped pipe, you would do the following:

```ts
// main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

> **Warning** The `useGlobalPipes()` method does not set up pipes for gateways or hybrid applications.

Global-scoped pipes are used across the whole application, for every controller and every route handler. In terms of dependency injection, global pipes registered from outside of any module (with `useGlobalPipes()` as in the example above) cannot inject dependencies since this is done outside the context of any module. In order to solve this issue, you can register a global-scoped pipe **directly from any module** using the construction mentioned above: `APP_PIPE` provider.

#### Binding Multiple Pipes

You can bind multiple pipes to a single route handler. In this case, the pipes will be executed in the order they are bound. For example, let's bind the `ValidationPipe` and the `ParseIntPipe` to the `findOne()` method of the `CatsController`:

```ts
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get(':id')
  @UsePipes(ValidationPipe, ParseIntPipe)
  async findOne(@Param('id') id: number) {
    return this.catsService.findOne(id);
  }
}
```

#### Binding Multiple Pipes (with options)

You can bind multiple pipes to a single route handler. In this case, the pipes will be executed in the order they are bound. For example, let's bind the `ValidationPipe` and the `ParseIntPipe` to the `findOne()` method of the `CatsController`:

```ts
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get(':id')
  @UsePipes(
    new ValidationPipe({ transform: true }),
    new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
    }),
  )
  async findOne(@Param('id') id: number) {
    return this.catsService.findOne(id);
  }
}
```

### Guards

Source: <https://docs.nestjs.com/guards>

A guard is a class annotated with the @Injectable() decorator, which implements the CanActivate interface.

![From official NestJS Documentation](https://docs.nestjs.com/assets/Guards_1.png)

Guards have a single responsibility. They determine whether a given request will be handled by the route handler or not, depending on certain conditions (like permissions, roles, ACLs, etc.).

> Guards are executed **after** each middleware, but **before** any pipe and interceptor.

Guards have a single method `canActivate()` which returns a boolean or a `Promise<boolean>`. If any guard returns `false`, the execution flow will be stopped and the request will be rejected. If `true`, Nest will proceed with executing the route handler.

But middleware, by its nature, is dumb. It doesn't know which handler will be executed after calling the `next()` function. On the other hand, **Guards** have access to the `ExecutionContext` instance, and thus know exactly what's going to be executed next. They're designed, much like exception filters, pipes, and interceptors, to let you interpose processing logic at exactly the right point in the request/response cycle, and to do so declaratively. This helps keep your code DRY and declarative.

#### Authorization Guards

Authorization guards are used to control access to resources based on the roles of the user. For example, you might want to restrict access to certain routes to only users with the role of **admin**. Authorization guards are defined as classes annotated with the `@Injectable()` decorator that implement the `CanActivate` interface.

```ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
```

```ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
```

> **Hint** If you are looking for a real-world example on how to implement an authentication mechanism in your application, visit [this chapter](https://docs.nestjs.com/security/authentication). Likewise, for more sophisticated authorization example, check [this page](https://docs.nestjs.com/security/authorization).

The logic inside the `validateRequest()` function can be as simple or sophisticated as needed. The main point of this example is to show how guards fit into the request/response cycle.

Every guard must implement a `canActivate()` function. This function should return a boolean, indicating whether the current request is allowed or not. It can return the response either synchronously or asynchronously (via a `Promise` or `Observable`). Nest uses the return value to control the next action:

- if it returns `true`, the request will be processed.
- if it returns `false`, Nest will deny the request.

Guards have a **single responsibility**. They determine whether a given request will be handled by the route handler or not, depending on certain conditions (like permissions, roles, ACLs, etc.) present at run-time. This is often referred to as **authorization**. Authorization (and its cousin, **authentication**, with which it usually collaborates) has typically been handled by [middleware](https://docs.nestjs.com/middleware) in traditional Express applications. Middleware is a fine choice for authentication, since things like token validation and attaching properties to the `request` object are not strongly connected with a particular route context (and its metadata).

But middleware, by its nature, is dumb. It doesn't know which handler will be executed after calling the `next()` function. On the other hand, **Guards** have access to the `ExecutionContext` instance, and thus know exactly what's going to be executed next. They're designed, much like exception filters, pipes, and interceptors, to let you interpose processing logic at exactly the right point in the request/response cycle, and to do so declaratively. This helps keep your code DRY and declarative.

#### Authorization guard

Source <https://docs.nestjs.com/guards#authorization-guard>

As mentioned, **authorization** is a great use case for Guards because specific routes should be available only when the caller (usually a specific authenticated user) has sufficient permissions. The `AuthGuard` that we'll build now assumes an authenticated user (and that, therefore, a token is attached to the request headers). It will extract and validate the token, and use the extracted information to determine whether the request can proceed or not.

```typescript
// auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
```

> **Hint** If you are looking for a real-world example on how to implement an authentication mechanism in your application, visit [this chapter](https://docs.nestjs.com/security/authentication). Likewise, for more sophisticated authorization example, check [this page](https://docs.nestjs.com/security/authorization).

The logic inside the `validateRequest()` function can be as simple or sophisticated as needed. The main point of this example is to show how guards fit into the request/response cycle.

Every guard must implement a `canActivate()` function. This function should return a boolean, indicating whether the current request is allowed or not. It can return the response either synchronously or asynchronously (via a `Promise` or `Observable`). Nest uses the return value to control the next action:

- if it returns `true`, the request will be processed.
- if it returns `false`, Nest will deny the request.

#### Execution context

Source <https://docs.nestjs.com/guards#execution-context>

The `canActivate()` function takes a single argument, the `ExecutionContext` instance. The `ExecutionContext` inherits from `ArgumentsHost`. We saw `ArgumentsHost` previously in the exception filters chapter. In the sample above, we are just using the same helper methods defined on `ArgumentsHost` that we used earlier, to get a reference to the `Request` object. You can refer back to the **Arguments host** section of the [exception filters](https://docs.nestjs.com/exception-filters#arguments-host) chapter for more on this topic.

By extending `ArgumentsHost`, `ExecutionContext` also adds several new helper methods that provide additional details about the current execution process. These details can be helpful in building more generic guards that can work across a broad set of controllers, methods, and execution contexts. Learn more about `ExecutionContext`[here](https://docs.nestjs.com/fundamentals/execution-context).

#### Role based authentication

Let's build a more functional guard that permits access only to users with a specific role. We'll start with a basic guard template, and build on it in the coming sections. For now, it allows all requests to proceed:

```typescript
// roles.guard.ts

import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
```

#### Binding guards

Source: <https://docs.nestjs.com/guards#binding-guards>
