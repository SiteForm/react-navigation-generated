const START_IDENTIFIER = 'REACT_NAVIGATION_GENERATED_OUTPUT:';
const END_IDENTIFIER = 'END_REACT_NAVIGATION_GENERATED';

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
  const splitLogs = log.match(/([\S\s]{1,7000})/g);
  splitLogs?.forEach((str, i) => {
    console.log(START_IDENTIFIER + str);
  });
  console.log(END_IDENTIFIER);
};

export default logRootRoutes;
