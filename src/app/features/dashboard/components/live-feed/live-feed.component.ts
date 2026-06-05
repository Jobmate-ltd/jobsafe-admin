import { Component, signal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  locationOutline,
  timeOutline,
  searchOutline,
  downloadOutline,
  arrowForwardOutline,
} from 'ionicons/icons';
import { INCIDENTS, CATEGORIES, SEVERITY, STATUS } from '../../../../core/data/dashboard.data';
import type { CategoryKey, SeverityKey, StatusKey } from '../../../../core/models/dashboard.models';

interface FilterChip {
  label: string;
  key: string;
  count: number;
}

@Component({
  selector: 'app-live-feed',
  standalone: true,
  imports: [FormsModule, IonIcon],
  templateUrl: './live-feed.component.html',
  styleUrls: ['./live-feed.component.scss'],
})
export class LiveFeedComponent implements OnInit {
  filter = signal('All');
  query = signal('');

  filterChips: FilterChip[] = [
    { label: 'All',       key: 'All',      count: INCIDENTS.length },
    { label: 'HSSE',      key: 'HSSE',     count: INCIDENTS.filter(i => i.cat === 'HSSE').length },
    { label: 'Near Miss', key: 'NearMiss', count: INCIDENTS.filter(i => i.cat === 'NearMiss').length },
    { label: 'Incident',  key: 'Incident', count: INCIDENTS.filter(i => i.cat === 'Incident').length },
    { label: 'Other',     key: 'Other',    count: INCIDENTS.filter(i => i.cat === 'Other').length },
  ];

  filteredIncidents = computed(() => {
    const f = this.filter();
    const q = this.query().toLowerCase().trim();
    return INCIDENTS.filter(inc => {
      const catMatch = f === 'All' || inc.cat === f;
      const queryMatch = !q || (
        inc.id.toLowerCase().includes(q) ||
        inc.title.toLowerCase().includes(q) ||
        inc.site.toLowerCase().includes(q) ||
        inc.reporter.toLowerCase().includes(q)
      );
      return catMatch && queryMatch;
    });
  });

  colorFor(cat: CategoryKey): string {
    return CATEGORIES[cat]?.color ?? '#0A0A0A';
  }

  tintFor(cat: CategoryKey): string {
    const map: Record<CategoryKey, string> = {
      HSSE:     'rgba(230,57,70,0.025)',
      NearMiss: 'rgba(245,158,11,0.025)',
      Incident: 'rgba(10,10,10,0.02)',
      Other:    'rgba(34,197,94,0.025)',
    };
    return map[cat] ?? 'transparent';
  }

  labelFor(cat: CategoryKey): string {
    return CATEGORIES[cat]?.label ?? cat;
  }

  sevColor(sev: SeverityKey): string {
    return SEVERITY[sev]?.color ?? '#0A0A0A';
  }

  sevBg(sev: SeverityKey): string {
    return SEVERITY[sev]?.bg ?? 'transparent';
  }

  statusColor(status: StatusKey): string {
    return STATUS[status]?.color ?? '#0A0A0A';
  }

  statusBg(status: StatusKey): string {
    return STATUS[status]?.bg ?? 'transparent';
  }

  statusRing(status: StatusKey): string {
    return STATUS[status]?.ring ?? 'transparent';
  }

  isNearMiss(cat: CategoryKey): boolean {
    return cat === 'NearMiss';
  }

  setFilter(key: string): void {
    this.filter.set(key);
  }

  ngOnInit(): void {
    addIcons({ locationOutline, timeOutline, searchOutline, downloadOutline, arrowForwardOutline });
  }
}
