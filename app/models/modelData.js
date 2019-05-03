'use strict';
const pool = require('./db');
const Promise = require('bluebird');
var _ = require('lodash');

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

function getSchemaLinks(modelId) {
    if (!modelId) {
        const error = new TypeError('Model ID Should Not Be Empty');
        return Promise.reject(error);
    }
    const query = `SELECT model_content FROM models WHERE model_id = "${modelId}"`;
    return execQuery(query);
}

function getModelData(modelId) {
    if (!modelId) {
        const error = new TypeError('modelId ID Should Not Be Empty');
        return Promise.reject(error);
    }
    const query = `SELECT model_data_id, data FROM model_data WHERE model_id = "${modelId}"`;
    return execQuery(query);
}

function getModelDataById(id) {
    if (!modelId) {
        const error = new TypeError('id ID Should Not Be Empty');
        return Promise.reject(error);
    }
    const query = `SELECT data FROM model_data WHERE model_data_id = "${id}"`;
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

function prePostValidation (modelId) {
    
}

module.exports = {
    createNewModel,
    insertModelData,
    getSchemaLinks,
    prePostValidation,
    getModelData,
    getModelDataById
};