import { Component, input } from '@angular/core';
import { KpiCardComponent } from '../kpi-card/kpi-card.component';
import { KPI } from '../../../../core/data/dashboard.data';

@Component({
  selector: 'app-kpi-row',
  standalone: true,
  imports: [KpiCardComponent],
  templateUrl: './kpi-row.component.html',
  styleUrls: ['./kpi-row.component.scss'],
})
export class KpiRowComponent {
  kpiState = input('normal');
  kpi = KPI;
}
