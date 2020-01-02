import Routes from './routes.json';

export default [
  {
    name: 'Admin',
    path: Routes.ADMIN,
    icon: 'SupervisorAccount',
    childs: [
      {
        name: 'School Details',
        path: Routes.ADMIN,
        icon: 'SupervisorAccount',
        childs: []
      },
      {
        name: 'Supplier',
        path: Routes.NEW_MENU,
        icon: 'SupervisorAccount',
        childs: []
      },
      {
        name: 'Student attendance',
        path: Routes.ADMIN,
        icon: 'SupervisorAccount',
        childs: []
      }
    ]
  },
  {
    name: 'Food Service',
    path: Routes.FOOD_SERVICE,
    icon: 'Restaurant',
    childs: [
      {
        name: 'Menu',
        path: Routes.FOOD_MENU,
        icon: 'MenuBook',
        childs: []
      },
      {
        name: 'Serve',
        path: Routes.FOOD_SERVE,
        icon: 'RoomService',
        childs: []
      }
    ]
  },
  {
    name: 'Inventory',
    path: Routes.INVENTORY,
    icon: 'ListAlt',
    childs: []
  },
  {
    name: 'Report',
    path: Routes.REPORTS,
    icon: 'LibraryBooks',
    childs: [
      {
        name: 'Daily',
        path: Routes.DAILY_REPORT,
        icon: 'Today',
        childs: []
      },
      {
        name: 'Monthly',
        path: Routes.MONTHLY_REPORT,
        icon: 'DateRange',
        childs: []
      }
    ]
  }
];
