import AbcIcon from '@mui/icons-material/Abc';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Manage from './pages/Manage';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';

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
        Icon: AbcIcon,
        Component: Home,
    },
];