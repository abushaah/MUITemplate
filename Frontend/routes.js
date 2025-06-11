import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Home from './src/pages/Home';
import Dashboard from './src/pages/Dashboard';

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
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        Icon: DashboardIcon,
        Component: Dashboard,
        nestedRoutes: [
            {
                path: '/',
                name: 'Trends',
                Icon: TrendingUpIcon,
                Component: Home,
            },
            {
                path: '/',
                name: 'Analysis',
                Icon: AnalyticsIcon,
                Component: Home,
            }
        ]
    }
];