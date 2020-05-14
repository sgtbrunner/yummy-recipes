export class ErrorConstants {
    // SERVER SIDE MESSAGES
    public static SERVER_ERROR_EMAIL_EXISTS: string = 'EMAIL_EXISTS';
    public static SERVER_ERROR_OPERATION_NOT_ALLOWED: string = 'OPERATION_NOT_ALLOWED';
    public static SERVER_ERROR_TOO_MANY_ATTEMPTS: string = 'TOO_MANY_ATTEMPTS_TRY_LATER';

    // CLIENT SIDE MESSAGES
    public static CLIENT_ERROR_EMAIL_EXISTS: string = 'This email account already exists!';
    public static CLIENT_ERROR_OPERATION_NOT_ALLOWED: string = 'This operation is not allowed!';
    public static CLIENT_ERROR_TOO_MANY_ATTEMPTS: string = 'Server unreachable at the moment. Please try again later!';
    public static CLIENT_ERROR_DEFAULT_MESSAGE: string = 'An unknown error occurred!';
}