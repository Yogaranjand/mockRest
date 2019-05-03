'use strict';

const express = require('express');
const Application = require('../models').Application;
const router = express.Router();


const errorHandler = (error, req, res, next) => {
    console.error(error);
    res.json({ isSuccess: false, message: error.message });
};


function successRespons(res, data) {
    const isSuccess = true;
    res.json({ isSuccess, data });
}


router.route('/')

.get((req, res, next) => {
    Application.getApplications()
        .then(data => {
            const { results } = data;
            successRespons(res, results)
        })
        .catch(next);

})

.post((req, res, next) => {
    const { applicationName, acronym } = req.body;
    const application = {
        applicationName: applicationName,
        acronym: acronym
    };

    Application.createNewApplication(application)
        .then(data => {
            const { results } = data;
            successRespons(res, results)
        })
        .catch(next);
})

router.route('/:id')
    .get((req, res, next) => {
        const { id } = req.params;

        Application.getApplicationById(id)
            .then(data => {
                const { results } = data;
                successRespons(res, results)
            })
            .catch(next);

    })

.put((req, res, next) => {
    const { id } = req.params;
    const { applicationName, acronym } = req.body;
    const updateObj = {};

    function updateApplication(application) {
        return Application.updateApplicationById(id, application);
    }

    if (applicationName) {
        updateObj.application_name = applicationName;
    }

    if (acronym) {
        updateObj.application_acronym = acronym;
    }

    updateApplication(updateObj)
        .then(data => {
            const { results } = data;
            successRespons(res, results)
        })
        .catch(next);
})


.delete((req, res, next) => {
    const { id } = req.params;

    Application.deleteApplicationById(id)
        .then(data => {
            const { results } = data;
            successRespons(res, results)
        })
        .catch(next);

})

router.route('/models/:id')
    .get((req, res, next) => {
        const { id } = req.params;
        Application.getModelsByApplicationId(id)
            .then(data => {
                const { results } = data;
                successRespons(res, results)
            })
            .catch(next);

    });




router.use(errorHandler)

module.exports = router;