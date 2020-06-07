import React from 'react';
import { NavigatorItem, isStackOrDrawer } from './types';

const childrenToRoutes = (
  children: { [name: string]: NavigatorItem },
  parentNavigator: NavigatorItem,
) =>
  Object.entries(children).map(([key, child]: any) =>
    resolveRoute(key, child, parentNavigator),
  );

const resolveRoute = (
  routeName: string | null,
  route: NavigatorItem,
  parentNavigator: any,
) => {
  if (isStackOrDrawer(route) && !parentNavigator) {
    return (
      <route.container.Navigator
        {...route.props}
        children={childrenToRoutes(route.children, route)}
      />
    );
  } else if (isStackOrDrawer(route) && route.container) {
    return (
      <parentNavigator.container.Screen
        name={routeName}
        component={() => (
          <route.container.Navigator
            {...route.props}
            children={childrenToRoutes(route.children, route)}
          />
        )}
      />
    );
  } else {
    return (
      <parentNavigator.container.Screen name={routeName} {...route.props} />
    );
  }
};

const resolveRootRoute = (rootRoute: NavigatorItem) =>
  resolveRoute('', rootRoute, null);

export default resolveRootRoute;
