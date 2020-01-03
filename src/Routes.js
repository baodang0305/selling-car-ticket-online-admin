import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  UserList as UserListView,
  AdminList as AdminListView,
  Account as AccountView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Routes as RotesView,
  UserDetails as UserDetailView,
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/sign-in" />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={AdminListView}
        exact
        layout={MainLayout}
        path="/admin"
      />
      <RouteWithLayout
        component={RotesView}
        exact
        layout={MainLayout}
        path="/Routes"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={UserDetailView}
        exact
        layout={MainLayout}
        path="/UserDetail"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
