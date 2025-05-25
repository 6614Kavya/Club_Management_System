export const navBarData = [
  {
    routeLink: '/dashboard',
    icon: 'home',
    label: 'Dashboard',
    roles: ['ClubAdmin', 'FieldAdmin'],
  },
  {
    routeLink: '/dashboard/myOrganization',
    icon: 'sports_soccer',
    label: 'Clubs',
    roles: ['ClubAdmin'],
  },
  {
    // routeLink: '/dashboard/fields',
    routeLink: '/dashboard/myOrganization',
    icon: 'map',
    label: 'Fields',
    roles: ['ClubAdmin', 'FieldAdmin'],
  },
  {
    // routeLink: '/dashboard/teams',
    routeLink: '/dashboard/myOrganization',
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
