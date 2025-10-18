import type { ComponentType } from 'react';
import { createBrowserRouter } from 'react-router';

function convert(mod: { default: ComponentType }): { Component: ComponentType } {
  return { Component: mod.default };
}

export enum Routes {
  Home = '/',
  About = '/about',
  Events = '/events',
  Resources = '/resources',
  Flock = '/resources/flock',
  RightToRepair = '/resources/right-to-repair',
  Contact = '/contact',
}

export const router = createBrowserRouter([
  { path: Routes.Home, lazy: () => import('./pages/Home').then(convert) },
  { path: Routes.About, lazy: () => import('./pages/About').then(convert) },
  { path: Routes.Events, lazy: () => import('./pages/Events').then(convert) },
  {
    path: Routes.Resources,
    children: [
      { index: true, lazy: () => import('./pages/resources/Resources').then(convert) },
      { path: Routes.Flock, lazy: () => import('./pages/resources/Flock').then(convert) },
      { path: Routes.RightToRepair, lazy: () => import('./pages/resources/RightToRepair').then(convert) },
    ],
  },
  { path: Routes.Contact, lazy: () => import('./pages/Contact').then(convert) },
]);
