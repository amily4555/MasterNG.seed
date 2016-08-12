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
var router_1 = require('@angular/router');
var tenant_serv_1 = require('../tenant.serv');
var const_1 = require('../../common/const');
var TenantUsersCpt = (function () {
    function TenantUsersCpt(tenantServ, route, router) {
        this.tenantServ = tenantServ;
        this.route = route;
        this.router = router;
    }
    TenantUsersCpt.prototype.ngOnInit = function () {
        var _this = this;
        this.roots = mu.map(const_1.DICT.ROOT, function (v, k) {
            return {
                val: +k,
                title: v
            };
        }, []);
        var routeParams = this.router.routerState.parent(this.route).snapshot.params;
        this.tenantId = +routeParams.tenantId;
        this.sub = this.tenantServ.getTenantUsers({
            tenantId: this.tenantId
        }).subscribe(function (res) {
            _this.users = res.data;
        });
    };
    TenantUsersCpt.prototype.changeUserRoot = function (user, root) {
        user.root = +root;
        user.tenantId = this.tenantId;
        this.tenantServ.saveTenantUser(user).subscribe();
    };
    TenantUsersCpt.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    TenantUsersCpt = __decorate([
        core_1.Component({
            selector: 'inmain.tenant-users',
            templateUrl: 'views/tenant/user/tenant-users.html'
        }), 
        __metadata('design:paramtypes', [tenant_serv_1.TenantServ, router_1.ActivatedRoute, router_1.Router])
    ], TenantUsersCpt);
    return TenantUsersCpt;
}());
exports.TenantUsersCpt = TenantUsersCpt;
//# sourceMappingURL=tenant-users.cpt.js.map