import HomeIcon from '@mui/icons-material/Home';
import Home from './src/pages/Home';

/**
 * @typedef RouteConfig
 * @property {string} path
 * @property {string} name
 * @property {import('react').Component} Icon
 * @property {import('react').Component} Component
 * @property {RouteConfig[]} nestedRoutes
 */

/**
 * @type {Array<RouteConfig>}
 */

export default [
    {
        path: '/',
        name: 'Home',
        Icon: HomeIcon,
        Component: Home,
    }
];