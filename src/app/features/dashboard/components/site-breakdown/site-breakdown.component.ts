import { Component } from '@angular/core';
import { SITES, CATEGORIES } from '../../../../core/data/dashboard.data';
import type { CategoryKey, SiteData } from '../../../../core/models/dashboard.models';

@Component({
  selector: 'app-site-breakdown',
  standalone: true,
  imports: [],
  templateUrl: './site-breakdown.component.html',
  styleUrls: ['./site-breakdown.component.scss'],
})
export class SiteBreakdownComponent {
  sites = SITES;
  catOrder: CategoryKey[] = ['HSSE', 'NearMiss', 'Incident', 'Other'];
  categories = CATEGORIES;

  maxTotal: number = Math.max(...SITES.map(s => this.siteTotal(s)));

  siteTotal(s: SiteData): number {
    return (s.stacks['HSSE'] ?? 0)
      + (s.stacks['NearMiss'] ?? 0)
      + (s.stacks['Incident'] ?? 0)
      + (s.stacks['Other'] ?? 0);
  }

  catColor(cat: CategoryKey): string {
    return CATEGORIES[cat]?.color ?? '#0A0A0A';
  }

  barWidthPercent(s: SiteData): number {
    const total = this.siteTotal(s);
    return this.maxTotal > 0 ? (total / this.maxTotal) * 100 : 0;
  }

  segWidthPercent(s: SiteData, cat: CategoryKey): number {
    const total = this.siteTotal(s);
    return total > 0 ? (s.stacks[cat] / total) * 100 : 0;
  }
}
