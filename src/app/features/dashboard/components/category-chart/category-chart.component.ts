import { Component, signal, computed } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CATEGORIES, CATEGORY_30D } from '../../../../core/data/dashboard.data';
import type { CategoryKey } from '../../../../core/models/dashboard.models';

@Component({
  selector: 'app-category-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './category-chart.component.html',
  styleUrls: ['./category-chart.component.scss'],
})
export class CategoryChartComponent {
  range = signal('30d');
  ranges = ['30d', '90d', 'YTD'];

  categories = CATEGORY_30D;
  categoryDefs = CATEGORIES;

  donutSeries = computed(() => CATEGORY_30D.map(c => c.count));

  donutChart = {
    type: 'donut' as const,
    height: 168,
    sparkline: { enabled: false },
    toolbar: { show: false },
    animations: { enabled: false },
  };

  donutLabels = CATEGORY_30D.map(c => CATEGORIES[c.key as CategoryKey].label);
  donutColors = CATEGORY_30D.map(c => CATEGORIES[c.key as CategoryKey].color);

  donutLegend = { show: false };
  donutDataLabels = { enabled: false };

  donutPlotOptions = {
    pie: {
      donut: {
        size: '72%',
        labels: { show: false },
      },
    },
  };

  donutStroke = { width: 2, colors: ['#FFFFFF'] };
  donutTooltip = { y: { formatter: (v: number) => v + ' reports' } };

  setRange(r: string): void {
    this.range.set(r);
  }

  getDeltaClass(delta: number): string {
    return delta > 0 ? 'delta-up' : 'delta-down';
  }

  getDeltaLabel(delta: number): string {
    return delta > 0 ? `↑${delta}` : `↓${Math.abs(delta)}`;
  }

  totalCount(): number {
    return CATEGORY_30D.reduce((s, c) => s + c.count, 0);
  }
}
