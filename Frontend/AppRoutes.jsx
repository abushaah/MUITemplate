import React from 'react';
import { Routes } from 'react-router-dom';
import { createRoutes } from './utils';

const AppRoutes = () => <Routes>{createRoutes()}</Routes>;

export default AppRoutes;