import { ComponentProps } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

interface Navigator<T extends (...args: any) => any> {
  container: ReturnType<T>;
  props: Omit<ComponentProps<ReturnType<T>['Navigator']>, 'name' | 'children'>;
  children: {
    [routeName: string]: NavigatorItem;
  };
}

export type DrawerNavigator = Navigator<typeof createDrawerNavigator>;
export type StackNavigationNavigator = Navigator<typeof createStackNavigator>;

interface StackNavigationScreen {
  props: Omit<
    ComponentProps<ReturnType<typeof createStackNavigator>['Screen']>,
    'name'
  > & { component: any };
}

export type NavigatorItem =
  | StackNavigationNavigator
  | StackNavigationScreen
  | DrawerNavigator;

export type RootAppNavigators = {
  [routeName: string]: NavigatorItem;
};

export const isStackOrDrawer = (s: NavigatorItem): s is Navigator<any> =>
  s.hasOwnProperty('children');
