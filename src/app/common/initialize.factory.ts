import {InitializeService} from './initialize.service';
import {MnI18nServices} from 'masterng/mn-i18n/mn-i18n.services';
import {MnRuleServices} from 'masterng/mn-rule/mn-rule.services';
import {MnReqService} from 'masterng/mn-req/mn-req.service';
import {Observable} from 'rxjs/Observable';
import {MnEchartsService} from 'masterng/mn-echarts/mn-echarts.service';
import {BaseResources} from './base.resources';

declare const mu: any;

export function InitializeFactory(_initServ: InitializeService,
                                  _i18nServ: MnI18nServices,
                                  _ruleServ: MnRuleServices,
                                  _reqServ: MnReqService,
                                  _rp: BaseResources,
                                  _ecServ: MnEchartsService) {
    return () => {

        /**
         * 系统初始化，获得相关信息
         */
        _initServ.initApp();

        /**
         * 国际化
         */
        _i18nServ.setConfig({
            lang: 'en',
            prefix: 'assets/i18n'
        });

        _reqServ.setHeaders([
            {
                method: 'append',
                key: 'X-TOKEN',
                value: '-----'
            },
            {
                method: 'append',
                key: 'X-ORIGIN',
                value: '|||||'
            },
            {
                method: 'append',
                key: 'X-ACCESS-TOKEN',
                value: ':::::'
            }
        ]);

        _reqServ.setResources(_rp);

        _reqServ.reqCatch = ((error, caught, url) => {
            if (error.status === 404) {
                return mu.prop(Observable, 'empty')();
            }
        });

        _reqServ.reqError = ((error, url) => {
        });

        /**
         * 规则匹配
         */
        _ruleServ.setRules({
            'aaa.bbb.ccc': true,
            'aaa.bbb.ddd': false,
            'aaa.bbb.eee': false,
            'aaa.bbb.fff': true
        });

        _ecServ.setConfig({
            toolbars: true,
            show_tools: 'toggle'
        });
    };
}
