"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var tenant_serv_1 = require('./tenant.serv');
var global_1 = require('../common/global');
var TenantsCpt = (function () {
    function TenantsCpt(ts, G) {
        this.ts = ts;
        this.G = G;
    }
    TenantsCpt.prototype.ngOnInit = function () {
        var _this = this;
        this.ts.getTenant().subscribe(function (res) { return _this.tenants = res.data; });
    };
    TenantsCpt = __decorate([
        core_1.Component({
            selector: 'page.tenants',
            templateUrl: 'views/tenant/tenants.html',
            providers: [tenant_serv_1.TenantServ]
        }), 
        __metadata('design:paramtypes', [tenant_serv_1.TenantServ, global_1.GLOBAL])
    ], TenantsCpt);
    return TenantsCpt;
}());
exports.TenantsCpt = TenantsCpt;
//# sourceMappingURL=tenants.js.map