import {
    Headers, Response, ConnectionBackend, RequestOptions, RequestOptionsArgs, Http
} from '@angular/http';
import {Injectable, Injector} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {MnReqService} from './mn-req.service';

declare let mu: any, console: any;

/**
 * http 拦截器
 *
 * httpInterceptor.v1.0
 *
 * 1. 在 header 中设置 token
 * 2. 异常处理
 * 3. map 数据同步处理
 *
 * observable 流程处理
 * map()：遍历流
 * filter()：过滤流
 * do()：监视流（通常打个console而已）
 * catch()：捕获异常
 * subscribe()：订阅流（即执行）
 */
@Injectable()
export class HttpInterceptorCls extends Http {
    router: Router;
    // reqServ: ReqService;

    constructor(backend: ConnectionBackend,
                defaultOptions: RequestOptions,
                injector: Injector,
                private reqServ: MnReqService) {
        // super(backend, defaultOptions, injector);
        super(backend, defaultOptions);

        /**
         * 修正 ng-module 中 $$HttpInterceptor deps 中添加 Router 与 APP_INITIALIZE 冲突
         * fix bug: Cannot instantiate cyclic dependency
         */
        setTimeout(() => {
            this.router = injector.get(Router);
        }, 0);
    }

    loadComplete: any = mu.debounce(() => {
        this.reqServ.progress = 100;
    }, 500);

    addHeaderWithToken(headers: Headers): Headers {
        headers = headers || new Headers();
        // Caching von Ajax Requests verhindern, vor allem vom IE
        headers.append('Cache-control', 'no-cache');
        headers.append('Cache-control', 'no-store');
        headers.append('Pragma', 'no-cache');
        headers.append('Expires', '0');
        headers.append('X-TOKEN', mu.storage('X-TOKEN'));
        headers.append('X-ACCESS-TOKEN', mu.storage('X-ACCESS-TOKEN'));
        headers.append('X-ORIGIN', location.host);
        return headers;
    }

    map(observable: Observable<Response>): Observable<Response> {
        return observable.map((response: Response) => {
            try {
                return response.json() || {};
            } catch (e) {
                return response.text();
            }

        });
    }

    onCatch(error: any, caught: Observable<any>, url?: string): Observable<any> {
        console.error('catch::::', url);

        // Observable.empty()
        // 则不会到do中onError 中调用
        // 默认 error.status === 401 时不返回错误
        if (error && error.status) {
            return Observable.empty();
        }

        return Observable.throw(error);
    }

    onSuccess(res: Response, url?: string): void {
        // console.log(res);
    }

    onError(error: any, url?: string): void {
        console.error('error::::', url);
    }

    onFinally(url?: string): void {
        this.afterRequest(url);
    }

    beforeRequest(url: string, config: any): void {
        const progress = this.reqServ.progress;
        mu.run( progress > 0 && progress < 100, () => {
            this.reqServ.progress += (100 - progress) * (Math.random() * .5);
        }, () => {
            this.reqServ.progress = mu.randomInt(5, 25);
        });

        console.debug('before:::: -> ', url);
    }

    afterRequest(url): void {
        this.loadComplete();
        // console.debug('after:::: -> ', url);
    }

    intercept(observable: Observable<Response>, url: string): Observable<Response> {
        return observable.catch((error: any, caught: Observable<any>) => {
            return this.onCatch(error, caught, url);
        })
        .do((res: Response) => {
            this.onSuccess(res, url);
        }, (error: any) => {
            this.onError(error, url);
        })
        .finally(() => {
            this.onFinally(url);
        });
    }

    _like_get(method: string, url: string, options: RequestOptionsArgs = {}): Observable<Response> {
        options.headers = this.addHeaderWithToken(options.headers);
        let observable = super[method](url, options);
        this.beforeRequest(url, {
            method,
            options
        });
        observable = this.map(observable);
        return this.intercept(observable, url);
    }

    _like_post(method: string, url: string, body: any = {}, options: RequestOptionsArgs = {}): Observable<Response> {
        options.headers = this.addHeaderWithToken(options.headers);
        options.headers.append('Content-Type', 'application/json');
        let observable = super[method](url, body, options);
        this.beforeRequest(url, {
            method,
            body,
            options
        });
        observable = this.map(observable);
        return this.intercept(observable, url);
    }

    get(url: string, options: RequestOptionsArgs = {}): Observable<Response> {
        const method = 'get';
        return this._like_get(method, url, options);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        const method = 'delete';
        return this._like_get(method, url, options);
    }

    head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        const method = 'head';
        return this._like_get(method, url, options);
    }

    options(url: string, options?: RequestOptionsArgs): Observable<Response> {
        const method = 'options';
        return this._like_get(method, url, options);
    }

    post(url: string, body: any = {}, options: RequestOptionsArgs = {}): Observable<Response> {
        const method = 'post';
        return this._like_post(method, url, body, options);
    }

    patch(url: string, body: any = {}, options: RequestOptionsArgs = {}): Observable<Response> {
        const method = 'patch';
        return this._like_post(method, url, body, options);
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        const method = 'put';
        return this._like_post(method, url, body, options);
    }

}

