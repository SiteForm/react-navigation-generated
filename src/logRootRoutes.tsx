const START_IDENTIFIER = 'REACT_NAVIGATION_GENERATED_OUTPUT:';
const START_IDENTIFIER_2 = 'REACT_NAVIGATION_GENERATED_OUTPUT_2:';

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
  const log = JSON.stringify(generateRootRoutes(rootRouteMap));
  console.log(START_IDENTIFIER + log.slice(0, 7000));
  console.log(START_IDENTIFIER_2 + log.slice(7000));
};

export default logRootRoutes;
