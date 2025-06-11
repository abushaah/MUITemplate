import React from 'react';
import { Routes } from 'react-router-dom';
import { createRoutes } from '../src/utils/createRoutes';

const AppRoutes = () => <Routes>{createRoutes()}</Routes>;

export default AppRoutes;