const express = require('express');
const router = express.Router();
let validateSession = require('../middleware/validate-session');

const project = require('../db').import('../models/project');

//Practice route for testing
// router.get('/practice', function(req, res){
//     res.send('Hey!! This is a project practice route!')
// })

//Creating a new project - works
router.post('/create', validateSession, (req, res) => {
    const projectEntry = {
        title: req.body.project.title,
        projectName: req.body.project.projectName,
        author: req.user.username,
        owner: req.user.id
    }
    project.create(projectEntry)
    .then(project => res.status(200).json(project))
    .catch(err => res.status(500).json({ error: err }))
});

//Getting a project by title - works
router.get('/:title', function (req, res) {
    let title = req.params.title;

    project.findAll({
        where: {title: title}
    })
    .then(project => res.status(200).json(project))
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
router.get('/user/mine', validateSession, function (req, res) {
    
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
router.put('/:id', validateSession, function (req, res) {
    const updateprojectEntry = {
        title: req.body.project.title,
// PUT PROJECT INFO HERE
    };

    const query = { where : { id: req.params.id, owner: req.user.id }};

    project.update(updateprojectEntry, query)
    .then((project) => res.status(200).json(project))
    .catch((err) => res.status(500).json({ error: err }));
})

//Deleting a project - works
router.delete('/delete/:id', validateSession, function (req,res) {
    const query = {where: { id: req.params.id, owner: req.user.id }};

    project.destroy(query)
    .then(() => res.status(200).json({ message: 'Project Removed' }))
    .catch((err) => res.status(500).json({ error: err }));
})


module.exports = router;