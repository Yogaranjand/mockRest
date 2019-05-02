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

function linkApplicatinModel(appId, modelId) {
    if (!appId || !modelId) {
        const error = new TypeError('id Should Not Be Empty');
        return Promise.reject(error);
    }
    const query = `INSERT INTO application_model SET ?`
    const values = {
        model_id: modelId,
        application_id: appId
    };
    return execQuery(query, values);
}

module.exports = {
    linkApplicatinModel
};