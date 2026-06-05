import { Component, signal, computed } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CATEGORIES, TREND_12W, TREND_ANNOTATIONS } from '../../../../core/data/dashboard.data';
import type { CategoryKey } from '../../../../core/models/dashboard.models';

interface LegendKey {
  key: CategoryKey;
  label: string;
  color: string;
}

@Component({
  selector: 'app-trend-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './trend-chart.component.html',
  styleUrls: ['./trend-chart.component.scss'],
})
export class TrendChartComponent {
  view = signal('Weekly');
  views = ['Weekly', 'Monthly', 'Quarterly'];

  activeKeys = signal<Record<string, boolean>>({
    HSSE: true,
    NearMiss: true,
    Incident: true,
    Other: true,
  });

  legendKeys: LegendKey[] = [
    { key: 'HSSE',     label: CATEGORIES.HSSE.label,     color: CATEGORIES.HSSE.color },
    { key: 'NearMiss', label: CATEGORIES.NearMiss.label, color: CATEGORIES.NearMiss.color },
    { key: 'Incident', label: CATEGORIES.Incident.label, color: CATEGORIES.Incident.color },
    { key: 'Other',    label: CATEGORIES.Other.label,    color: CATEGORIES.Other.color },
  ];

  private weekCategories = Array.from({ length: 12 }, (_, i) =>
    i === 11 ? 'This wk' : `${11 - i}w ago`
  );

  chartOptions = computed(() => {
    const active = this.activeKeys();
    const catKeys: CategoryKey[] = ['HSSE', 'NearMiss', 'Incident', 'Other'];

    const series = catKeys
      .filter(k => active[k])
      .map(k => ({
        name: CATEGORIES[k].label,
        data: TREND_12W[k],
        color: CATEGORIES[k].color,
      }));

    const getStrokeWidth = (name: string): number => name === 'HSSE' ? 2 : 1.75;
    const getDash = (name: string): number => name === 'Incident' ? 4 : 0;

    return {
      series,
      chart: {
        type: 'line' as const,
        height: 240,
        toolbar: { show: false },
        zoom: { enabled: false },
        background: 'transparent',
        fontFamily: 'Manrope, ui-sans-serif, sans-serif',
        animations: { enabled: false },
      },
      stroke: {
        curve: 'smooth' as const,
        width: series.map(s => getStrokeWidth(s.name)),
        dashArray: series.map(s => getDash(s.name)),
      },
      colors: series.map(s => s.color),
      grid: {
        borderColor: '#F3F4F6',
        strokeDashArray: 0,
        yaxis: { lines: { show: true } },
        xaxis: { lines: { show: false } },
        padding: { top: 4, right: 8, bottom: 0, left: 8 },
      },
      xaxis: {
        categories: this.weekCategories,
        labels: {
          style: {
            fontFamily: 'Manrope, ui-sans-serif, sans-serif',
            fontSize: '10px',
            colors: Array(12).fill('#9CA3AF'),
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          style: {
            fontFamily: 'Manrope, ui-sans-serif, sans-serif',
            fontSize: '10px',
            colors: ['#9CA3AF'],
          },
        },
        min: 0,
      },
      legend: { show: false },
      tooltip: {
        theme: 'light' as const,
        x: { show: true },
        style: { fontFamily: 'Manrope, ui-sans-serif, sans-serif' },
      },
      markers: {
        size: series.map(() => 0),
        hover: { size: 4 },
      },
      annotations: {
        points: TREND_ANNOTATIONS.map(a => ({
          x: this.weekCategories[a.week],
          y: TREND_12W.HSSE[a.week],
          marker: {
            size: 4,
            fillColor: '#FFFFFF',
            strokeColor: '#E63946',
            strokeWidth: 1.5,
            radius: 2,
          },
          label: {
            text: a.label,
            style: {
              color: '#E63946',
              fontSize: '10px',
              fontFamily: 'Manrope, ui-sans-serif, sans-serif',
              background: 'rgba(230,57,70,0.07)',
              padding: { top: 3, right: 5, bottom: 3, left: 5 },
            },
            borderColor: 'rgba(230,57,70,0.25)',
            borderRadius: 4,
            offsetY: -8,
          },
        })),
      },
    };
  });

  toggleKey(key: string): void {
    this.activeKeys.update(current => ({
      ...current,
      [key]: !current[key],
    }));
  }

  isActive(key: string): boolean {
    return this.activeKeys()[key] ?? false;
  }

  setView(v: string): void {
    this.view.set(v);
  }
}
