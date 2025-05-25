export const navBarData = [
  {
    routeLink: '/dashboard',
    icon: 'home',
    label: 'Dashboard',
    roles: ['SuperAdmin', 'ClubAdmin', 'FieldAdmin', 'TeamManager'],
  },
  {
    routeLink: '/dashboard/clubs',
    icon: 'sports_soccer',
    label: 'Clubs',
    roles: ['SuperAdmin', 'ClubAdmin'],
  },
  {
    routeLink: '/dashboard/fields',
    // routeLink: '/dashboard/myOrganization',
    icon: 'map',
    label: 'Fields',
    roles: ['SuperAdmin', 'ClubAdmin', 'FieldAdmin'],
  },
  {
    routeLink: '/dashboard/teams',
    // routeLink: '/dashboard/myOrganization',
    icon: 'groups',
    label: 'Teams',
    roles: ['SuperAdmin', 'ClubAdmin', 'TeamManager'],
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
    roles: ['SuperAdmin', 'ClubAdmin', 'FieldAdmin', 'TeamManager'],
  },
];
