import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
})
export class GraficoDonaComponent implements OnInit {
  @Input('labels') public ChartLabels: Label[];
  @Input('data') public ChartData: MultiDataSet;
  @Input('type') public ChartType: ChartType;

  @Input('leyenda') public leyenda: string;

  constructor() {
    (this.ChartLabels = [
      'Download Sales',
      'In-Store Sales',
      'Mail-Order Sales',
    ]),
      (this.ChartData = [[350, 450, 100]]),
      (this.ChartType = 'polarArea');

    this.leyenda = 'leyenda';
  }

  ngOnInit(): void {}
}
