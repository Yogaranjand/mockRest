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

function createNewModel(model, modelName) {
    if (!model) {
        const error = new TypeError('model Should Not Be Empty');
        return Promise.reject(error);
    }
    const query = `INSERT INTO models SET ?`
    const values = {
        model_content: model,
        model_name: modelName
    };
    return execQuery(query, values);
}

function insertModelData(id, data) {
    if (!id) {
        const error = new TypeError('id Should Not Be Empty');
        return Promise.reject(error);
    }
    const query = `INSERT INTO model_data SET ?`
    const values = {
        model_id: id,
        data: data
    };
    return execQuery(query, values);
}

module.exports = {
    getApplications,
    getApplicationById,
    createNewModel,
    insertModelData
};