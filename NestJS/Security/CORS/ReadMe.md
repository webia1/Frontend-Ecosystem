# CORS

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Getting started](#getting-started)

<!-- /code_chunk_output -->

Cross-origin resource sharing (CORS) is a mechanism that allows resources to be requested from another domain. Under the hood, Nest makes use of the Express [cors](https://github.com/expressjs/cors) package. This package provides various options that you can customize based on your requirements.

## Getting started

Source: <https://docs.nestjs.com/security/cors#getting-started>

To enable CORS, call the `enableCors()` method on the Nest application object.

```typescript
const app = await NestFactory.create(AppModule);
app.enableCors();
await app.listen(3000);
```

The `enableCors()` method takes an optional configuration object argument. The available properties of this object are described in the official [CORS](https://github.com/expressjs/cors#configuration-options) documentation. Another way is to pass a [callback function](https://github.com/expressjs/cors#configuring-cors-asynchronously) that lets you define the configuration object asynchronously based on the request (on the fly).

Alternatively, enable CORS via the `create()` method's options object. Set the `cors` property to `true` to enable CORS with default settings. Or, pass a [CORS configuration object](https://github.com/expressjs/cors#configuration-options) or [callback function](https://github.com/expressjs/cors#configuring-cors-asynchronously) as the `cors` property value to customize its behavior.

```typescript
const app = await NestFactory.create(AppModule, { cors: true });
await app.listen(3000);
```