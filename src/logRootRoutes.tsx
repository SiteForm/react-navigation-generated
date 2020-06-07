const START_IDENTIFIER = 'REACT_NAVIGATION_GENERATED_OUTPUT:';

const generateRouteMap = (
  [routeName, route]: [string, any],
  initRoute: string,
  routeMap: any,
) => {
  const newRouteName =
    initRoute === '' ? routeName : `${initRoute}.${routeName}`;

  routeMap[routeName] = {
    routeName: newRouteName,
  };

  if (route.children) {
    for (const child of Object.entries(route.children)) {
      generateRouteMap(child, newRouteName, routeMap[routeName]);
    }
  }
  return routeMap;
};

const generateRootRoutes = (rootRouteMap: any) => {
  let rootRoutes = {} as any;
  for (const [routeName, route] of Object.entries(rootRouteMap)) {
    rootRoutes = {
      ...rootRoutes,
      ...generateRouteMap([routeName, route], '', {}),
    };
  }
  return rootRoutes;
};

const logRootRoutes = (rootRouteMap: any) => {
  console.log(
    START_IDENTIFIER + JSON.stringify(generateRootRoutes(rootRouteMap)),
  );
};

export default logRootRoutes;
