import React from 'react';
import { NavigatorItem, isStackOrDrawer } from './types';

const childrenToRoutes = (
  children: { [name: string]: NavigatorItem },
  parentNavigator: NavigatorItem,
  parentRouteName: string,
) =>
  Object.entries(children).map(([key, child]: any) =>
    resolveRoute(key, child, parentNavigator, parentRouteName),
  );

const resolveRoute = (
  routeName: string | null,
  route: NavigatorItem,
  // parentNavigator: NavigatorItem,
  parentNavigator: any,
  parentRouteName: string,
) => {
  if (isStackOrDrawer(route)) {
    const navigator = (
      <route.container.Navigator
        {...route.props}
        children={childrenToRoutes(route.children, route, parentRouteName)}
      />
    );
    if (!parentNavigator) {
      return navigator;
    } else {
      return (
        <parentNavigator.container.Screen
          name={parentRouteName + '.' + routeName}
          component={() => navigator}
        />
      );
    }
  } else {
    return (
      <parentNavigator.container.Screen
        name={parentRouteName + '.' + routeName}
        {...route.props}
      />
    );
  }
};

const resolveRootRoute = (rootRoute: NavigatorItem, rootRouteName: string) =>
  resolveRoute('', rootRoute, null, rootRouteName);

export default resolveRootRoute;
