'use strict';

const express = require('express');
const router = express.Router();
var multer = require('multer');
var fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
var _ = require('lodash');
const faker = require('faker');
const Model = require('../models').Model;
const AppModel = require('../models').AppModel;
const ModelData = require('../models').ModelData;

let currentFilename;
let appId;
const errorHandler = (error, req, res, next) => {
    console.error(error);
    res.json({ isSuccess: false, message: error.message });
};


function successRespons(res, data) {
    const isSuccess = true;
    res.json({ isSuccess, data });
}

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        var datetimestamp = Date.now();
        currentFilename = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
        cb(null, currentFilename)
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');

router.route('/links/:id')
.get((req, res, next) => {
    const { id } = req.params;
    console.log("hello")
    Model.getSchemaLinks(id)
        .then((response) => {
            let modelContent = JSON.parse(response.results[0]['model_content']);
            let linkArr = [];
            _.forEach(modelContent.links, (item) => {
                let link = item.method +" - "+ item.href;
                linkArr.push(link);
            });
            console.log("linkArr ===", linkArr);
            successRespons(res, linkArr);
        })
        .catch(next);

});
router.route('/apilist/:modelId/:api/:modelDataId')
.get((req, res, next) => {
    const { modelId, api, modelDataId} = req.params;
    console.log(modelId, api, modelDataId, typeof modelDataId);
    console.log("hello 6666", api.trim() == 'GET', typeof api);
    console.log("hello 7777", modelDataId == '0')
    if (api.trim() == 'GET' && modelDataId === '0') {
        console.log("coming here");
        ModelData.getModelData(modelId)
            .then((response) => {
                successRespons(res, response);
            })
            .catch(next);
    } else if (api === 'GET' && modelDataId) {
        ModelData.getModelDataById(modelDataId)
        .then((response) => {
            successRespons(res, response);
        })
        .catch(next);
    }
        

});

router.route('/')

.post((req, res, next) => {
    let query =res.req.query;
    appId = parseInt(query[Object.keys(query)[0]]);
    upload(req, res, function(err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        res.json({ error_code: 0, err_desc: null });
        processFile(appId);
    });
})


function processFile(appId) {
    let fakerData = {};
    let modelId;
    let filePath
    let modelName;
    return Promise.try(function () {
        filePath = path.join(__dirname, '../../uploads/', currentFilename);
        var obj = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        modelName = obj['$schema'];
        let properties = obj.properties;
        _.forEach(Object.keys(properties), (item) => {
            if ( typeof properties[item] === 'object') {
                if (properties[item].type === 'string') {
                    fakerData[item] = faker.name.firstName();
                } else if (properties[item].type === 'array') {
                    fakerData[item] = faker.random.arrayElement(['male', 'female', 'unknown']);
                } else if (properties[item].type === 'number') {
                    fakerData[item] = faker.phone.phoneNumber();
                } else if (properties[item].type === 'date-time') {
                    fakerData[item] = faker.date.between('2000-01-01', '2020-12-31');
                }
            } else if (typeof properties[item] === 'boolean') {
                fakerData[item] = properties[item];
            }
        });
        return obj;
    }).then(function (obj) {
        return Model.createNewModel(JSON.stringify(obj), modelName);
    }).then((response) => {
        modelId = response.results.insertId;
        return Model.insertModelData(modelId, JSON.stringify(fakerData));
    }).then((response) => {
        return AppModel.linkApplicatinModel(appId, modelId);
    }).then(() => {
        fs.unlinkSync(filePath);
    }).then(() => {
        return Model.getSchemaLinks(modelId);
    }).then((response) => {
        let modelContent = JSON.parse(response.results[0]['model_content']);
        //console.log("response =======", modelContent);
        let linkArr = [];
        _.forEach(modelContent.links, (item) => {
            let link = item.method +" - "+ item.href;
            linkArr.push(link);
        })
        console.log("linkArr =======", linkArr);
    }).then(() => {
        return Model.prePostValidation(modelId);
    }).then((res) => {
        console.log();
    });
    
}


router.use(errorHandler)

module.exports = router;