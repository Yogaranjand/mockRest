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
        const error = new TypeError('Application ID Should Not Be Empty');
        return Promise.reject(error);
    }
    const query = `SELECT model_content FROM models WHERE model_id = "${modelId}"`;
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

function prePostValidation(modelId, data) {
    if (!data) {
        data = {
            title: "MR",
            stuffWorthEmailingAbout: "Test",
            email: "yogarajnad@nextgen.com",
            "cc": false
        };
    }
    return new Promise((resolve, reject) => {
       return  getSchemaLinks(modelId);
    }).then((response) => {
        let modelContent = JSON.parse(response.results[0]['model_content']);
            //check for required data
            let requiredFileds = modelContent.required;
            _.forEach(requiredFileds, (field) => {
                console.log('filed ===', field)
                if (!data[field]) {
                   return reject("Required Filed is missing", field);
                }
            });
            return true;
    });
}

module.exports = {
    createNewModel,
    insertModelData,
    getSchemaLinks,
    prePostValidation
};