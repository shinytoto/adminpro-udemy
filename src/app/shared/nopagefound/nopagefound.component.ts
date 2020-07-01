import { Component, OnInit } from '@angular/core';
import { plugins } from 'chart.js';

declare function init_plugins();
@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
})
export class NopagefoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    init_plugins();
  }
}
