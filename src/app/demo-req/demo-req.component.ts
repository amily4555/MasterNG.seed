import {Component, OnInit} from '@angular/core';
import {ResourcePool} from './resource-pool';
import {Http, ResponseContentType} from '@angular/http';
import {MnFileSaverServices} from 'masterng/mn-common/services/mn-file-saver.services';
// import {MnFileSaverServices} from 'masterng/mn-common/services/mn-file-saver.services';

declare const mu: any;

@Component({
    selector: 'app-demo-req',
    templateUrl: './demo-req.component.html',
    styleUrls: ['./demo-req.component.scss']
})
export class DemoReqComponent implements OnInit {

    aaa: any;
    user_data: any;
    demo_data: any;

    user_req: any = {
        url: './assets/store/user.json'
    };

    resource_params: any = {
        store: 'store',
        name: 'user',
        key: 'req_resource'
    };

    reload: any = {
        name: 'reload',
        click: ($event) => {
            this.user_req = mu.clone(this.user_req);
        }
    };

    resource_reload: any = () => {
        this.resource_params = mu.clone(this.resource_params);
    }

    download($event) {
        this._http.get('./assets/file/MasterNg.csv').subscribe((res) => {
            this._mnFileServ.fileSaver([res.toString()], 'masterNg.csv');
        });
    }

    csvDownload($event) {
        this._http.get('./assets/store/csv-data.json').subscribe((res: any) => {
            const content = this._mnFileServ.csvData(res);
            this._mnFileServ.fileSaver([content], 'csv-data.csv');
        });
    }

    zipDownload($event) {
        this._http.get('./assets/file/download.zip', {
            responseType: ResponseContentType.Blob
        }).subscribe((res: any) => {
            this._mnFileServ.blobSaver([res], 'masterNg.zip');
        });
    }

    constructor(public _rp: ResourcePool, private _http: Http, private _mnFileServ: MnFileSaverServices) {
    }

    ngOnInit() {
        let i = 0;
        const l = setInterval(() => {
            this._rp.demo.get({
                store: 'store',
                name: 'user',
                key: 'req_resource'
            }).subscribe(() => {
                i++;
                console.debug(i);
                if (i > 5) {
                    clearInterval(l);
                }
            });

        }, 300);

    }

}
