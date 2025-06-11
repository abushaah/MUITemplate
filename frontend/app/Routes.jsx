import React from 'react';
import { Routes } from 'react-router-dom';
import { CreateRoutes } from '../src/utils/CreateRoutes';

const AppRoutes = () => <Routes>{CreateRoutes()}</Routes>;

export default AppRoutes;