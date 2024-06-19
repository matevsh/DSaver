export class HttpError extends Error {
    constructor(response) {
        super();
        this.response = response;
    }
}
