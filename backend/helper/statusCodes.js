class StatusCodes {
    static get OK() {
        return 200;
    }

    static get CREATED() {
        return 201;
    }

    static get NO_CONTENT() {
        return 204;
    }

    static get BAD_REQUEST() {
        return 400;
    }

    static get UNAUTHORIZED() {
        return 401;
    }

    static get FORBIDDEN() {
        return 403;
    }

    static get NOT_FOUND() {
        return 404;
    }

    static get CONFLICT() {
        return 409;
    }

    static get INTERNAL_SERVER_ERROR() {
        return 500;
    }
}
export default StatusCodes