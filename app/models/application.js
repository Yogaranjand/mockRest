'use strict';
const pool = require('./db');

function execQuery(query, values) {

    const options = { sql: query };
    if (values) {
        options.values = values;
    }
    return new Promise((resolve, reject) => {
        pool.query(options, (error, results, fields) => {
            if (error) return reject(error);
            resolve({ results, fields });
        });
    });
}

function getApplications() {
    const query = `SELECT * FROM applications`;
    return execQuery(query);
}


function getApplicationById(id) {
    if (!id) {
        const error = new TypeError('Application ID Should Not Be Empty');
        return Promise.reject(error);
    }
    const query = `SELECT * FROM applications WHERE application_id = "${id}"`;
    return execQuery(query);
}



function getModelsByApplicationId(id) {
    if (!id) {
        const error = new TypeError('Application ID Should Not Be Empty');
        return Promise.reject(error);
    }
    const query = `SELECT m.* FROM application_model am JOIN models m on am.model_id = m.model_id WHERE am.application_id = "${id}"`;
    return execQuery(query);
}


function createNewApplication(application) {
    if (!application) {
        const error = new TypeError('Application ID Should Not Be Empty');
        return Promise.reject(error);
    }
    const query = `INSERT INTO applications SET ?`
    const values = {
        application_name: application.applicationName,
        application_acronym: application.acronym
    };
    return execQuery(query, values);
}


function updateApplicationById(id, application) {

    if (!id) {
        const error = new TypeError('Application ID Should Not Be Empty');
        return Promise.reject(error);
    }
    if (!application) {
        const error = new TypeError('Application ID Should Not Be Empty');
        return Promise.reject(error);
    }

    const query = `UPDATE applications SET ? WHERE application_id = "${id}"`
    const values = application;
    return execQuery(query, values);
}

function deleteApplicationById(id) {
    if (!id) {
        const error = new TypeError('Application ID Should Not Be Empty');
        return Promise.reject(error);
    }
    const query = `DELETE FROM applications WHERE application_id = "${id}"`;
    return execQuery(query);
}


module.exports = {
    getApplications,
    getApplicationById,
    updateApplicationById,
    createNewApplication,
    deleteApplicationById,
    getModelsByApplicationId
};