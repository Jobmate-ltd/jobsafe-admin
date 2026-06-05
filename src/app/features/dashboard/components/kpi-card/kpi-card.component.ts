import { Component, input, computed } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss'],
})
export class KpiCardComponent {
  accent = input('#0A0A0A');
  eyebrow = input('');
  value = input(0);
  sub = input('');
  delta = input('');
  deltaDir = input<'up' | 'down' | 'flat'>('flat');
  spark = input<number[] | null>(null);
  sparkColor = input('#0A0A0A');
  emptyState = input(false);

  sparkSeries = computed(() => {
    const s = this.spark();
    return s ? [{ name: '', data: s }] : [];
  });

  sparkChartOpts = {
    type: 'area' as const,
    height: 36,
    width: 108,
    sparkline: { enabled: true },
    toolbar: { show: false },
    animations: { enabled: false },
  };

  sparkStroke = { curve: 'smooth' as const, width: 1.5 };

  get sparkFill() {
    return {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.18,
        opacityTo: 0,
        stops: [0, 100],
      },
    };
  }

  sparkGrid = { show: false };
  sparkXaxis = { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } };
  sparkYaxis = { show: false };
  sparkMarkers = { size: [0, 0, 0, 0, 0, 0, 2.5] };
  sparkTooltip = { enabled: false };

  get deltaClass(): string {
    if (this.deltaDir() === 'up') return 'delta-up';
    if (this.deltaDir() === 'down') return 'delta-down';
    return 'delta-flat';
  }

  get deltaArrow(): string {
    if (this.deltaDir() === 'up') return '↑';
    if (this.deltaDir() === 'down') return '↓';
    return '';
  }
}
