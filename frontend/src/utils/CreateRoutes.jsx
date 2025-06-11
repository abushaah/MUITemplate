import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import routes from '../../routes';

export function CreateRoutes(config = routes){
    return config.map(({ name, path, Component, nestedRoutes }) => (
        <Fragment key={name}>
            <Route path={path} element={Component ? <Component /> : undefined} />
            {nestedRoutes && CreateRoutes(nestedRoutes)}
        </Fragment>
    ));
}