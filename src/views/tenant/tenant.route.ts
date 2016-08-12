import {RouterConfig} from '@angular/router';

import {TenantLayoutCpt, TenantsCpt, TenantCreateCpt} from './';
import {TenantUpdateCpt} from './tenant-form.cpt';
import {TenantDetailCpt} from './tenant-detail.cpt';
import {TenantUsersCpt} from './user/tenant-users.cpt';
import {TenantActivitiesCpt} from './tenant-activities.cpt';
import {TenantUserCreateCpt} from './user/user-create.cpt';

import {AuthGuide} from '../common/auth-guide';

export const tenantDetailRouter: RouterConfig = [ {
        path: ':tenantId', component: TenantDetailCpt, children: [
            {path: '', component: TenantUpdateCpt},
            {path: 'users', component: TenantUsersCpt},
            {path: 'users/create', component: TenantUserCreateCpt},
            {path: 'activities', component: TenantActivitiesCpt}
        ]
    }
];

export const tenantRouter: RouterConfig = [{
        path: 'tenants', component: TenantLayoutCpt, canActivate: [AuthGuide], children: [
            {path: '', component: TenantsCpt, canActivate: [AuthGuide]},
            {path: 'create', component: TenantCreateCpt, canActivate: [AuthGuide]},
            ...tenantDetailRouter
        ]
    }
];

