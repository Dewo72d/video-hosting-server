import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as CookieParser from "cookie-parser"


async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: ["https://127.0.0.1:3001","http://127.0.0.1:3001", "https://dewo.pp.ua", "http://dewo.pp.ua"],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    })

    app.use(CookieParser());


    await app.listen(3000);
}

bootstrap();
