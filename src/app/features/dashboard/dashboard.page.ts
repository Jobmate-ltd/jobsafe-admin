import { Component, signal } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { KpiRowComponent } from './components/kpi-row/kpi-row.component';
import { LiveFeedComponent } from './components/live-feed/live-feed.component';
import { CategoryChartComponent } from './components/category-chart/category-chart.component';
import { SiteBreakdownComponent } from './components/site-breakdown/site-breakdown.component';
import { TrendChartComponent } from './components/trend-chart/trend-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,
    TopbarComponent,
    KpiRowComponent,
    LiveFeedComponent,
    CategoryChartComponent,
    SiteBreakdownComponent,
    TrendChartComponent,
  ],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  sidebarCollapsed = signal(false);
  dateRange = signal('This week');
  site = signal('All sites');
  kpiState = signal('normal');

  toggleSidebar(): void {
    this.sidebarCollapsed.update(v => !v);
  }
}
