/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {matchRoutes, type RouteObject} from 'react-router';

/**
 * Helper function to make sure all async components for that particular route
 * is preloaded before rendering. This is especially useful to avoid loading
 * screens.
 *
 * @param routes react-router-config
 * @param pathname the route pathname, example: /docs/installation
 * @returns Promise object represents whether pathname has been preloaded
 */
export default function preload(
  routes: RouteObject[],
  pathname: string,
): Promise<void[]> {
  const matches = matchRoutes(routes, pathname)!;

  return Promise.all(
    matches.map((match) => {
      const {element} = match.route;

      // @ts-expect-error: ComponentCreator injected this method.
      if (element && element.preload) {
        // @ts-expect-error: checked above.
        return component.preload();
      }

      return undefined;
    }),
  );
}
