import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionHandler } from './presentation/middleware/globalExceptionHandler.error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Cors
  app.enableCors({ origin: process.env.ORIGIN });


  //Swagger
  const config = new DocumentBuilder().addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalFilters(new GlobalExceptionHandler());
  await app.listen(3000);
}
bootstrap();
