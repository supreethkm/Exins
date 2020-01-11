import Routes from './routes.json';

export default [
  {
    name: 'Admin',
    path: Routes.ADMIN,
    icon: 'SupervisorAccount',
    childs: [
      {
        name: 'School Details',
        path: Routes.SCHOOL_DETAILS,
        icon: 'SupervisorAccount',
        childs: []
      },
      {
        name: 'Supplier',
        path: Routes.SUPPLIER,
        icon: 'SupervisorAccount',
        childs: []
      },
      {
        name: 'Items',
        path: Routes.ITEMS,
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
