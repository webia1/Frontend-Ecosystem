# NestJS in a NxMonoRepo CookBook

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
