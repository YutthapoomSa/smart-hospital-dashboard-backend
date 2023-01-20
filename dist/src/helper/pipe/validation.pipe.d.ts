import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ValidationPipe implements PipeTransform {
    private logger;
    transform(value: any, { metatype }: ArgumentMetadata): Promise<any>;
    private toValidate;
}
