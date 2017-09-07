import {ModuleWithProviders, NgModule, Injector} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';
import {ReqHttpComponent} from './mn-req-http.component';
import {MnReqResourceComponent} from './mn-req-resource.component';
import {HttpInterceptorCls} from './mn-httpInterceptor.cls';
import {MnResource} from './mn-resource';
import {MnReqNoDataComponent} from './mn-req-nodata.component';

import {MnLoaderBarModule} from '../mn-loader-bar/mn-loader-bar.module';
import {MnHttpLoaderComponent} from './mn-http-loader.component';
import {MnReqService} from './mn-req.service';
import {MnDynamicModule} from '../mn-dynamic/mn-dynamic.module';
import {MnFileDownloadDirective} from './mn-file-download.directive';

/**
 * ReqModule
 * 使ajax请求与返回分开
 * 使ajax各阶段事务专注于自己
 * NO_DATA 与 Http Processor 各自呈现
 *
 * 1. Http 拦截器
 * 2. Http loader
 * 3. Resource
 * 4. rh - ReqHttp
 * 5. rr - ReqResource
 */
@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        MnDynamicModule.forRoot(),
        MnLoaderBarModule.forRoot()

    ],
    declarations: [
        ReqHttpComponent,
        MnReqResourceComponent,
        MnReqNoDataComponent,
        MnHttpLoaderComponent,

        MnFileDownloadDirective
    ],
    exports: [
        ReqHttpComponent,
        MnReqResourceComponent,
        MnReqNoDataComponent,
        MnHttpLoaderComponent,
        MnFileDownloadDirective
    ],
    entryComponents: [
        MnReqNoDataComponent
    ],
    providers: [
        MnReqService,

        {
            provide: Http,
            useClass: HttpInterceptorCls,
            deps: [
                XHRBackend,
                RequestOptions,
                Injector,
                MnReqService
            ]
        },

        MnResource

    ]
})
export class MnReqModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MnReqModule
        };
    }
}
