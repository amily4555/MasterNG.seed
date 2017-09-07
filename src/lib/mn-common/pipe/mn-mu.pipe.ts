import {Pipe, PipeTransform} from '@angular/core';

declare const mu: any, console: any;

@Pipe({name: 'mu'})
export class MuPipe implements PipeTransform {

    constructor() {
    }

    transform(value: any, fn: string, ...args: any[] ): any {
        return mu.isExist(fn) ? mu[fn](value, ...args) : value;
    }
}
