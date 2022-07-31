import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "../user.entity";

export const GetUser = createParamDecorator((_data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    console.log("USER", req)
    return req.user
})