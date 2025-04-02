export const Clubs = [
  {
    id: 1,
    club_name: 'Elite Soccer Academy',
    short_name: 'Elite SA',
    club_description: 'A premier soccer academy focused on youth development.',
    club_address: '123 Main St, New York, NY',
    country_code: 'US',
    activated: true,
    club_admins: ['John Doe', 'Jane Smith'],
    fields: [
      {
        id: 1,
        field_name: 'Elite Stadium',
        field_address: '101 Soccer Lane, New York, NY',
        field_admins: ['Sarah Thompson'],
        field_description:
          'A state-of-the-art soccer stadium with premium turf and seating for 5,000 spectators.',
        facilities: [
          'Floodlights',
          'Locker Rooms',
          'Cafeteria',
          'Parking Area',
          'Medical Center',
        ],
      },
      {
        id: 6,
        field_name: 'Elite Training Ground',
        field_address: '102 Soccer Lane, New York, NY',
        field_admins: ['Michael Jordan'],
        field_description:
          'A specialized training facility for elite soccer talent.',
        facilities: [
          'Gym',
          'Rehabilitation Center',
          'Indoor Training Area',
          'CCTV Security',
          'Lounge',
        ],
      },
    ],
    teams: [
      {
        id: 1,
        team_name: 'NYC Strikers',
        team_address: '123 Main St, New York, NY',
        team_admin: 'Ethan Walker',
      },
      {
        id: 2,
        team_name: 'NYC Warriors',
        team_address: '124 Main St, New York, NY',
        team_admin: 'Olivia Carter',
      },
    ],
  },
  {
    id: 2,
    club_name: 'Champions Football Club',
    short_name: 'Champions FC',
    club_description: 'A competitive football club with a history of success.',
    club_address: '456 Park Ave, Los Angeles, CA',
    country_code: 'US',
    activated: true,
    club_admins: ['Sarah Smith', 'James Wilson'],
    fields: [
      {
        id: 2,
        field_name: 'Champions Arena',
        field_address: '202 Victory Rd, Los Angeles, CA',
        field_admins: ['Robert Brown'],
        field_description:
          'A modern football arena known for hosting championship matches and training sessions.',
        facilities: [
          'Artificial Turf',
          'Seating for 3,000',
          'VIP Lounge',
          'Fitness Center',
          'Media Room',
        ],
      },
      {
        id: 7,
        field_name: 'Champions Training Complex',
        field_address: '203 Victory Rd, Los Angeles, CA',
        field_admins: ['David Beckham'],
        field_description:
          'A high-tech training ground for professional footballers.',
        facilities: [
          'Hydrotherapy Pool',
          'Recovery Center',
          'Tactical Analysis Room',
          'Cafeteria',
          'Dormitories',
        ],
      },
    ],
    teams: [
      {
        id: 3,
        team_name: 'LA Champions',
        team_address: '234 Park Ave, Los Angeles, CA',
        team_admin: 'Sophia Martinez',
      },
      {
        id: 4,
        team_name: 'LA Titans',
        team_address: '235 Park Ave, Los Angeles, CA',
        team_admin: 'Nathan Reed',
      },
    ],
  },
  {
    id: 3,
    club_name: 'Golden Goal Soccer Club',
    short_name: 'Golden Goal',
    club_description: 'Dedicated to developing top-tier soccer talent.',
    club_address: '789 Oak St, Chicago, IL',
    country_code: 'US',
    activated: false,
    club_admins: ['Mike Johnson', 'Emily Davis'],
    fields: [
      {
        id: 3,
        field_name: 'Golden Field',
        field_address: '303 Goal Ave, Chicago, IL',
        field_admins: ['Jessica White'],
        field_description:
          'A historic soccer ground with natural grass, home to numerous local and national tournaments.',
        facilities: [
          'Natural Grass Pitch',
          'Floodlights',
          'Training Area',
          'Food Court',
          'Spectator Stands',
        ],
      },
      {
        id: 8,
        field_name: 'Golden Academy Field',
        field_address: '304 Goal Ave, Chicago, IL',
        field_admins: ['Samuel Parker'],
        field_description:
          'A youth training ground for developing future soccer stars.',
        facilities: [
          'Mini Pitches',
          'Classrooms',
          'Gym',
          'Lounge Area',
          'Dormitories',
        ],
      },
    ],
    teams: [
      {
        id: 5,
        team_name: 'Chicago Warriors',
        team_address: '456 King St, Chicago, IL',
        team_admin: 'Isabella Thomas',
      },
      {
        id: 6,
        team_name: 'Chicago Thunder',
        team_address: '457 King St, Chicago, IL',
        team_admin: 'Daniel Green',
      },
    ],
  },
];
