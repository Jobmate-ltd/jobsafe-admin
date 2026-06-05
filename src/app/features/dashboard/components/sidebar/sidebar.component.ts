import { Component, input, OnInit } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  listOutline,
  checkmarkCircleOutline,
  mapOutline,
  carOutline,
  peopleOutline,
  documentOutline,
  alertCircleOutline,
  settingsOutline,
} from 'ionicons/icons';

interface NavItem {
  key: string;
  label: string;
  icon: string;
  active?: boolean;
  badge?: number;
  badgeColor?: string;
  sos?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  collapsed = input(false);

  navItems: NavItem[] = [
    { key: 'home',    label: 'Dashboard',      icon: 'home-outline',             active: true },
    { key: 'reports', label: 'Reports',         icon: 'list-outline',             badge: 18 },
    { key: 'actions', label: 'Actions',         icon: 'checkmark-circle-outline', badge: 3, badgeColor: '#F59E0B' },
    { key: 'sites',   label: 'Sites & depots',  icon: 'map-outline' },
    { key: 'fleet',   label: 'Fleet',           icon: 'car-outline' },
    { key: 'people',  label: 'People',          icon: 'people-outline' },
    { key: 'docs',    label: 'Documents',       icon: 'document-outline' },
  ];

  bottomItems: NavItem[] = [
    { key: 'sos',      label: 'SOS',      icon: 'alert-circle-outline', sos: true },
    { key: 'settings', label: 'Settings', icon: 'settings-outline' },
  ];

  ngOnInit(): void {
    addIcons({
      homeOutline,
      listOutline,
      checkmarkCircleOutline,
      mapOutline,
      carOutline,
      peopleOutline,
      documentOutline,
      alertCircleOutline,
      settingsOutline,
    });
  }
}
