export class ErrorConstants {
    // SERVER SIDE MESSAGES
    public static SERVER_ERROR_EMAIL_EXISTS: string = 'EMAIL_EXISTS';
    public static SERVER_ERROR_OPERATION_NOT_ALLOWED: string = 'OPERATION_NOT_ALLOWED';
    public static SERVER_ERROR_TOO_MANY_ATTEMPTS: string = 'TOO_MANY_ATTEMPTS_TRY_LATER';
    public static SERVER_EMAIL_NOT_FOUND: string = 'EMAIL_NOT_FOUND';
    public static SERVER_INVALID_PASSWORD: string = 'INVALID_PASSWORD';
    public static SERVER_USER_DISABLED: string = 'USER_DISABLED';


    // CLIENT SIDE MESSAGES
    public static CLIENT_ERROR_EMAIL_EXISTS: string = 'This email account already exists!';
    public static CLIENT_ERROR_OPERATION_NOT_ALLOWED: string = 'This operation is not allowed!';
    public static CLIENT_ERROR_TOO_MANY_ATTEMPTS: string = 'Server unreachable at the moment. Please try again later!';
    public static CLIENT_ERROR_DEFAULT_MESSAGE: string = 'An unknown error occurred!';
    public static USERNAME_ANDOR_PASSWORD_IS_INVALID: string = 'The username and/or password you have entered is invalid.';
    public static CLIENT_USER_DISABLED: string = 'User has been disabled';
}