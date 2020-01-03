import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import App from '../containers/App';
import Login from './Sign-In/SignIn';
import SignUp from './Sign-Up/SignUp';
import DailyReport from './Reports/Daily/Daily-Report';
import MonthlyReport from './Reports/Monthly/Montly-Report';
import NewMenu from './Menu/New-Menu';
import MenuPage from './Menu/Menu';
import NewInventory from './Inventory/New-Inventory.js';

// Some folks find value in a centralized route config.
// A route config is just data. React is great at mapping
// data into components, and <Route> is a component.

// Our route config is just an array of logical "routes"
// with `path` and `component` props, ordered the same
// way you'd do inside a `<Switch>`.
const routesData = [
  {
    path: routes.ADMIN,
    component: Login
  },
  {
    path: routes.NEW_MENU,
    component: NewMenu
  },
  {
    path: routes.FOOD_MENU,
    component: MenuPage
  },
  {
    path: routes.FOOD_SERVE,
    component: Sandwiches
  },
  {
    path: routes.INVENTORY,
    component: NewInventory
  },
  {
    path: routes.DAILY_REPORT,
    component: DailyReport
  },
  {
    path: routes.MONTHLY_REPORT,
    component: MonthlyReport
  },
  {
    path: routes.LOGIN,
    component: Bus
  },
  {
    path: routes.LOGOUT,
    component: Bus
  },
  {
    path: routes.NOT_FOUND_404,
    component: Bus
  }
  // {
  //   path: '/tacos',
  //   component: Tacos,
  //   routes: [
  //     {
  //       path: '/tacos/bus',
  //       component: Bus
  //     },
  //     {
  //       path: '/tacos/cart',
  //       component: Cart
  //     }
  //   ]
  // }
];

export default function RouteConfig() {
  return (
    <App>
      <Switch>
        {routesData.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </App>
  );
}

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

function Sandwiches() {
  return <h2>Sandwiches</h2>;
}

function Tacos({ routes }) {
  return (
    <div>
      <h2>Tacos</h2>
      <ul>
        <li>
          <Link to="/tacos/bus">Bus</Link>
        </li>
        <li>
          <Link to="/tacos/cart">Cart</Link>
        </li>
      </ul>
    </div>
  );
}

function Bus() {
  return <h3>Bus</h3>;
}

function Cart() {
  return <h3>Cart</h3>;
}
