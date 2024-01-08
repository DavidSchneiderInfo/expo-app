import {ValidationError} from "../types";

export class ValidationException extends Error {
    constructor(error: ValidationError) {
        super(error.message);
    }
}
