#!/usr/bin/env node
import program from 'commander';
import fs from 'fs';
import { exec } from 'child_process';

const START_IDENTIFIER = 'REACT_NAVIGATION_GENERATED_OUTPUT:';

program.option('-o, --outputpath <path>', 'output path');

program.parse(process.argv);

if (program.outputpath) {
  // MARK requires that an ios simulator is running
  const expoProcess = exec('expo start -i');

  if (expoProcess && expoProcess.stdout) {
    expoProcess.stdout.on('data', (data: any) => {
      const output = data.toString();
      if (output.includes(START_IDENTIFIER)) {
        const routeMapJson = output.substring(
          output.indexOf(START_IDENTIFIER) + START_IDENTIFIER.length,
          output.lastIndexOf('}') + 1,
        );
        const outputPath = process.cwd() + program.outputpath;
        const tsString = `const routes = ${routeMapJson};export default routes;`;
        fs.writeFileSync(outputPath, tsString);
        expoProcess.kill();
        console.log('Route map created at ' + program.outputpath);
      }
    });
  }
} else {
  console.log('No output path');
}

// const generateRouteMap = (
//   [routeName, route]: [string, any],
//   initRoute: string,
//   routeMap: any,
// ) => {
//   const newRouteName =
//     initRoute === '' ? routeName : `${initRoute}.${routeName}`;
//   if (route.children) {
//     routeMap[routeName] = {
//       routeName: newRouteName,
//     };
//     for (const child of Object.entries(route.children)) {
//       generateRouteMap(child, newRouteName, routeMap[routeName]);
//     }
//   } else {
//     routeMap[routeName] = {
//       routeName: newRouteName,
//     };
//   }
//   return routeMap;
// };

// // MARK generates routeMap.json
// const generateRootRoutes = (rootRouteMap: any) => {
//   let rootRoutes = {} as any;
//   for (const [routeName, route] of Object.entries(rootRouteMap)) {
//     rootRoutes = {
//       ...rootRoutes,
//       ...generateRouteMap([routeName, route], '', {}),
//     };
//   }
//   return rootRoutes;
// };

// const logRootRoutes = (rootRouteMap: any) => {
//   console.log(
//     START_IDENTIFIER + JSON.stringify(generateRootRoutes(rootRouteMap)),
//   );
// };

// export { logRootRoutes };
