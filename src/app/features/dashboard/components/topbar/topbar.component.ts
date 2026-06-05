import { Component, input, output, OnInit } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  menuOutline,
  chevronDownOutline,
  notificationsOutline,
  searchOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  dateRange = input('This week');
  site = input('All sites');

  dateRangeChange = output<string>();
  toggleSidebar = output<void>();

  dateRanges = ['Today', 'This week', 'This month', 'Custom'];

  setDateRange(range: string): void {
    this.dateRangeChange.emit(range);
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  ngOnInit(): void {
    addIcons({ menuOutline, chevronDownOutline, notificationsOutline, searchOutline });
  }
}
