import {
  Outlet,
  createRoute,
  createRouter,
  createRootRouteWithContext,
  redirect,
} from '@tanstack/react-router';
import { Login } from '../pages/login';
import { Main } from '../pages/main';

const rootRoute = createRootRouteWithContext()({
  component: () => <Outlet />,
});

function isAuthenticated() {
  return !!sessionStorage.getItem('@chat:token');
}

const loginRoute = createRoute({
  path: '/login',
  component: Login,
  getParentRoute: () => rootRoute,
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: '/' });
    }
  },
});

const mainRoute = createRoute({
  path: '/',
  component: Main,
  getParentRoute: () => rootRoute,
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: '/login' });
    }
  },
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([loginRoute, mainRoute]),
});
