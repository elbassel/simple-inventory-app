class BaseError extends Error {
    constructor(httpCode = 500, message = 'ServerError') {
        super(message);
        this.httpCode = httpCode;
        this.message = message;
    }
    toJson() {
        return {
            stack: this.stack,
            message: this.message,
        };
    }
}

class NotFoundError extends BaseError {
    constructor(message = 'Not found object') {
        super(404, message);
    }
}

class DuplicateObjectError extends BaseError {
    constructor(message = 'Duplicate object') {
        super(409, message);
    }
}

class BusinessValidationError extends BaseError{
    constructor(message = 'Business Validation Error') {
        super(409, message);
    }
}

class FormatValidationError extends BaseError {
    constructor(errors) {
        super(400, 'Format Validation Error');
        this.errors = errors;
    }

    toJson() {
        const error = super.toJson();
        error.errors = this.errors;
        return error;
    }
}

module.exports = {
    BaseError,
    NotFoundError,
    DuplicateObjectError,
    BusinessValidationError,
    FormatValidationError
}