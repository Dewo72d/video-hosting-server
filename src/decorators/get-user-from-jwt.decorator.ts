import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const GetUserFromJwt = createParamDecorator(
    async (data: unknown, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        const { clown_token } = req.cookies;

        if (!clown_token) {
            return null;
        }

        try {
            const jwtService = new JwtService();
            const user = await jwtService.verifyAsync(clown_token, { secret: process.env.JWT });
            return user
        } catch (error) {
            console.log("GET USER JWT ERROR >>  ", error);
            return null
        }

    },
);
