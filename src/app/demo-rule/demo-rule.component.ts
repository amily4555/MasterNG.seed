import { Component, OnInit } from '@angular/core';
import {MnRuleServices} from 'masterng/mn-rule/mn-rule.services';
declare const mu: any;

@Component({
  selector: 'mn-demo-rule',
  templateUrl: './demo-rule.component.html',
  styleUrls: ['./demo-rule.component.scss']
})
export class DemoRuleComponent implements OnInit {

  constructor(private _ruleServ: MnRuleServices) { }

  rules: any;

  ngOnInit() {
  }

  show(key) {
      key = 'aaa.bbb.' + key;
      const rules = this._ruleServ.rules_;
      rules[key] = !rules[key];
      this.rules = mu.clone(rules);
  }

}
