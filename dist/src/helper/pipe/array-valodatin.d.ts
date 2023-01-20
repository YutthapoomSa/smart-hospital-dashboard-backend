import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class IsDataArray implements ValidatorConstraintInterface {
    validate(authData: any[], args: ValidationArguments): Promise<any>;
}
