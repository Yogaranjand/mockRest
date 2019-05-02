'use strict';
const path = require('path');
const ApplicationRoutes = require('./application');
const ModelRoutes = require('./model');

module.exports = app => {
    app.use('/api/applications', ApplicationRoutes);
    app.use('/api/models', ModelRoutes);
};