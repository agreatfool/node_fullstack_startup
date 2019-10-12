"use strict";
// tslint:disable
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("superagent");
/**
 * REST API demo
 * @class Api
 * @param {(string)} [domainOrOptions] - The project domain.
 */
class Api {
    constructor(domain, logger) {
        this.logger = logger;
        this.domain = "";
        this.errorHandlers = [];
        if (domain) {
            this.domain = domain;
        }
    }
    getDomain() {
        return this.domain;
    }
    addErrorHandler(handler) {
        this.errorHandlers.push(handler);
    }
    setRequestHeadersHandler(handler) {
        this.requestHeadersHandler = handler;
    }
    setConfigureAgentHandler(handler) {
        this.configureAgentHandler = handler;
    }
    setConfigureRequestHandler(handler) {
        this.configureRequestHandler = handler;
    }
    request(method, url, body, headers, queryParameters, form, reject, resolve, opts) {
        if (this.logger) {
            this.logger.log(`Call ${method} ${url}`);
        }
        const agent = this.configureAgentHandler ?
            this.configureAgentHandler(request) :
            request;
        let req = agent(method, url);
        if (this.configureRequestHandler) {
            req = this.configureRequestHandler(req);
        }
        req = req.query(queryParameters);
        if (body) {
            req.send(body);
            if (typeof (body) === 'object' && !(body.constructor.name === 'Buffer')) {
                headers['Content-Type'] = 'application/json';
            }
        }
        if (Object.keys(form).length > 0) {
            req.type('form');
            req.send(form);
        }
        if (this.requestHeadersHandler) {
            headers = this.requestHeadersHandler(Object.assign({}, headers));
        }
        req.set(headers);
        if (opts.$retries && opts.$retries > 0) {
            req.retry(opts.$retries);
        }
        if (opts.$timeout && opts.$timeout > 0 || opts.$deadline && opts.$deadline > 0) {
            req.timeout({
                deadline: opts.$deadline,
                response: opts.$timeout
            });
        }
        req.end((error, response) => {
            // an error will also be emitted for a 4xx and 5xx status code
            // the error object will then have error.status and error.response fields
            // see superagent error handling: https://github.com/visionmedia/superagent/blob/master/docs/index.md#error-handling
            if (error) {
                reject(error);
                this.errorHandlers.forEach(handler => handler(error));
            }
            else {
                resolve(response);
            }
        });
    }
    getUserURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/users/{id}';
        if (parameters.$path) {
            path = (typeof (parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }
        path = path.replace('{id}', `${encodeURIComponent(parameters['id'].toString())}`);
        if (parameters.$queryParameters) {
            queryParameters = Object.assign({}, queryParameters, parameters.$queryParameters);
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * Get user info by id
     * @method
     * @name Api#getUser
     * @param {} id - User Id
     */
    getUser(parameters) {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/users/{id}';
        if (parameters.$path) {
            path = (typeof (parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }
        let body;
        let queryParameters = {};
        let headers = {};
        let form = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';
            path = path.replace('{id}', `${encodeURIComponent(parameters['id'].toString())}`);
            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }
            if (parameters.$queryParameters) {
                queryParameters = Object.assign({}, queryParameters, parameters.$queryParameters);
            }
            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }
    createUserURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/users';
        if (parameters.$path) {
            path = (typeof (parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }
        if (parameters.$queryParameters) {
            queryParameters = Object.assign({}, queryParameters, parameters.$queryParameters);
        }
        queryParameters = {};
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * Create user
     * @method
     * @name Api#createUser
     * @param {} user - User info
     */
    createUser(parameters) {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/users';
        if (parameters.$path) {
            path = (typeof (parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }
        let body;
        let queryParameters = {};
        let headers = {};
        let form = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';
            if (parameters['user'] !== undefined) {
                body = parameters['user'];
            }
            if (parameters['user'] === undefined) {
                reject(new Error('Missing required  parameter: user'));
                return;
            }
            if (parameters.$queryParameters) {
                queryParameters = Object.assign({}, queryParameters, parameters.$queryParameters);
            }
            form = queryParameters;
            queryParameters = {};
            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }
    updateUserURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/users';
        if (parameters.$path) {
            path = (typeof (parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }
        if (parameters.$queryParameters) {
            queryParameters = Object.assign({}, queryParameters, parameters.$queryParameters);
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * Update user
     * @method
     * @name Api#updateUser
     * @param {} user - User info
     */
    updateUser(parameters) {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/users';
        if (parameters.$path) {
            path = (typeof (parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }
        let body;
        let queryParameters = {};
        let headers = {};
        let form = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';
            if (parameters['user'] !== undefined) {
                body = parameters['user'];
            }
            if (parameters['user'] === undefined) {
                reject(new Error('Missing required  parameter: user'));
                return;
            }
            if (parameters.$queryParameters) {
                queryParameters = Object.assign({}, queryParameters, parameters.$queryParameters);
            }
            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }
}
exports.Api = Api;
exports.default = Api;
//# sourceMappingURL=api.js.map