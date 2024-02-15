import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(Error)
export class GlobalExceptionHandler implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        // console.error(exception)
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception instanceof HttpException ? exception.message : 'Internal Server Error';
        let errors = [message];

        let customResponse = { error: errors };
        response
            .status(statusCode)
            .json(customResponse);
    }
}