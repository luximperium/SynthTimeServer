const express = require('express');
const router = express.Router();
let validateSession = require('../middleware/validate-session');
const jwt = require('jsonwebtoken');
const project = require('../db').import('../models/project');

//Practice route for testing
// router.get('/practice', function(req, res){
//     res.send('Hey!! This is a project practice route!')
// })

//Creating a new project - works
router.post('/create', validateSession, (req, res) => {
    const projectEntry = {
        projectName: req.body.project.projectName,
        check1: req.body.project.check1,
        check2: req.body.project.check2,
        check3: req.body.project.check3,
        check4: req.body.project.check4,
        check5: req.body.project.check5,
        check6: req.body.project.check6,
        check7: req.body.project.check7,
        check8: req.body.project.check8,
        check1Note: req.body.project.check1Note,
        check2Note: req.body.project.check2Note,
        check3Note: req.body.project.check3Note,
        check4Note: req.body.project.check4Note,
        check5Note: req.body.project.check5Note,
        check6Note: req.body.project.check6Note,
        check7Note: req.body.project.check7Note,
        check8Note: req.body.project.check8Note,
        author: req.user.username,
        owner: req.user.id
    }
    project.create(projectEntry)
    .then(() => res.status(200).json({ message: 'Project Created Successfully!' }))
    .catch(err => res.status(500).json({ error: err }))
});

router.get('/:projectName', function (req, res) {
    let projectName = req.params.projectName;

    project.findAll({
        where: {projectName: projectName}
    })
    .then(project => res.status(200).json(project))
    .catch(err => res.status(500).json({ error: err }))
});

//GET all user's projects - works
router.get('/users/mine', validateSession, function (req, res) {
    
    project.findAll({
        where: { owner: req.user.id }
    })
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({ error: err }))
});

//Get all projects
router.get('/', function (req, res) {

    project.findAll()
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({ error: err }))
})

//Updating a project - works
router.put('/save/:projectName', validateSession, function (req, res) {
    const updateprojectEntry = {
        projectName: req.body.project.projectName,
        check1: req.body.project.check1,
        check2: req.body.project.check2,
        check3: req.body.project.check3,
        check4: req.body.project.check4,
        check5: req.body.project.check5,
        check6: req.body.project.check6,
        check7: req.body.project.check7,
        check8: req.body.project.check8,
        check1Note: req.body.project.check1Note,
        check2Note: req.body.project.check2Note,
        check3Note: req.body.project.check3Note,
        check4Note: req.body.project.check4Note,
        check5Note: req.body.project.check5Note,
        check6Note: req.body.project.check6Note,
        check7Note: req.body.project.check7Note,
        check8Note: req.body.project.check8Note,
        author: req.user.username,
        owner: req.user.id
    };

    const query = { where : { projectName: req.params.projectName }};

    project.update(updateprojectEntry, query)
    .then((project) => res.status(200).json({message: "Project Successfully Updated!"}))
    .catch((err) => res.status(500).json({ error: err }));
})

//Deleting a project - works
router.delete('/delete/:projectName', validateSession, function (req,res) {
    const query = {where: { projectName: req.params.projectName }};

    project.destroy(query)
    .then(() => res.status(200).json({ message: 'Project Removed' }))
    .catch((err) => res.status(500).json({ error: err }));
})


module.exports = router;