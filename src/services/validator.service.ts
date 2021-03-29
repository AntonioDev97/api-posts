import { JSONSchema7, validate, ValidationError } from 'json-schema';
import { Logger } from './winston.service';

export const ValidateSchema = (params: Object, schema: JSONSchema7) => {
    const response: IValidateResponse = { success: false, errors: [] };
    try {
        Logger.info(`Start step - Validate input parameters ${schema.$id}`);
        const IsValidate =  validate(params, schema);
        if (IsValidate.valid) response.success = true;
        else response.errors = IsValidate.errors;
        Logger.info(`End step - Validate input parameters ${schema.$id}`);
    } catch (error) {
        Logger.error(`Error - validateSchema ${schema.$id}`, error);
        response.success = false;
        Logger.info(`End step - Validate input parameters ${schema.$id}`);
    }
    return response;
};

export interface IValidateResponse {
    success: boolean,
    errors: ValidationError[],
}