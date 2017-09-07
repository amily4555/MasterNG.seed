import {Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges} from '@angular/core';
import * as mu from 'mzmu';

declare const mu: any;

@Component({
    selector: 'mn-loader-bar',
    styleUrls: ['../assets/mn-loader-bar.scss'],
    template: `
        <div [style.width.%]="width"
             [style.height.px]="height"
             class="bar">
        </div>
    `
})
export class MnLoaderBarComponent implements OnChanges {

    @Input() position: string;

    @HostBinding('style.position') _position = this.position || 'relative';

    @Input() target: string | ElementRef;
    @Input() progress: number;
    @Input() where: number;

    @Output() done: any = new EventEmitter<any>();

    _width = 0;
    _height = 3;

    here = 0;
    width = this._width;
    height = this._height;
    on = 0;

    constructor(private _ref: ElementRef, private _render: Renderer2) {

        setTimeout(() => {
            const parent = _ref.nativeElement.parentElement;
            if (!mu.or(parent.style.position, 'absolute', 'fixed')) {
                _render.setStyle(parent, 'position', 'relative');
                this._position = this.position === 'fixed' ? 'fixed' : 'absolute';
            }
        }, 1);
    }

    ngOnChanges(changes: SimpleChanges) {
        mu.exist(changes['progress'], () => {
            mu.run(this.width >= 100, () => {
                this.width = this._width;
                this.height = this._height;
            });

            this.go(this.progress);
        });
    }

    move() {
        const dist = this.width - this.here;

        if (dist < 0.1 && dist > -0.1) {
            this.width = this.here;
            this.on = 0;

            if (this.width >= 100) {
                this.height = 0;
                setTimeout(() => {
                    this.done.emit({});
                }, 300);
            }
        } else {
            this.width = this.width - dist / 4;
            setTimeout(() => {
                this.go();
            }, 16);
        }
    }

    go(num?: number) {
        num = num > 100 ? 0 : num;
        if (num >= 0) {
            this.here = num;
            if (!this.on) {
                this.on = 1;
                this.move();
            }
        } else if (this.on) {
            this.move();
        }
    }

}
