class CustomErrorHandler extends Error {
    constructor(status, message,success) {
        super();
        this.status = status;
        this.message = message;
    }

    static errResponse(status, msg) {
        return new CustomErrorHandler(status, msg);
    }

}
export default CustomErrorHandler; 