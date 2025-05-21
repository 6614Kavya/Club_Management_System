export const navBarData = [
  {
    routeLink: '/dashboard',
    icon: 'home',
    label: 'Dashboard',
    roles: ['ClubAdmin', 'FieldAdmin'],
  },
  {
    routeLink: '/dashboard/clubs',
    icon: 'sports_soccer',
    label: 'Clubs',
    roles: ['ClubAdmin'],
  },
  {
    routeLink: '/dashboard/fields',
    icon: 'map',
    label: 'Fields',
    roles: ['ClubAdmin', 'FieldAdmin'],
  },
  {
    routeLink: '/dashboard/teams',
    icon: 'groups',
    label: 'Teams',
    roles: ['ClubAdmin', 'TeamManager'],
  },
  {
    routeLink: '/dashboard/users',
    icon: 'admin_panel_settings',
    label: 'Users',
    roles: ['SuperAdmin'],
  },
  {
    routeLink: '/dashboard/bookingRequests',
    icon: 'event_note',
    label: 'Requests',
    roles: ['ClubAdmin', 'FieldAdmin'],
  },
];
