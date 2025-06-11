import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import routes from '../../routes';

export function createRoutes(config = routes){
    return config.map(({ name, path, Component, nestedRoutes }) => (
        <Fragment key={name}>
            <Route path={path} element={Component ? <Component /> : undefined} />
            {nestedRoutes && createRoutes(nestedRoutes)}
        </Fragment>
    ));
}