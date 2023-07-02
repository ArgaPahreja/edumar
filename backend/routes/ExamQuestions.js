const express = require('express')
const ExamQuestions = require('../models/examQuestions')
const router = express.Router()

const fisherYates = require('../helpers/fisherYates.js');

//Get QUESTION(s)
router.get('/', (req, resp) => {
    ExamQuestions.find().then(data => {
        resp.json(data)
    }).catch(e => {
        resp.json({message: e})
    })
})

//GET QUESTION
router.get("/:id", async (req, resp) => {
    try {
        const {role} = req.query;
        const examQuestions = await ExamQuestions.find({examId: req.params.id});

        let responseData;

        if (role === "admin") {
            responseData = examQuestions;
        } else {
            //Algoritma pengacakan fisher yates
            fisherYates(examQuestions);
            responseData = examQuestions;
        }

        resp.json(responseData);
    } catch (err) {
        resp.json({message: err.message});
    }
});

// POST QUESTION
router.post('/', (req, resp) => {
    const examQuestions = new ExamQuestions({
        examId: req.body.examId,
        questionTitle: req.body.questionTitle,
        options: req.body.options,
        correctOption: req.body.correctOption,
    })
    examQuestions.save().then(data => {
        resp.json(data)
    }).catch(e => {
        resp.json({message: e})
    })
})

// PUT QUESTION
router.put("/:id", (req, resp) => {
    ExamQuestions.updateOne({_id: req.params.id}, {
        $push: {
            options: req.body.options,
        }
    }).then(data => {
        resp.json(data)
    }).catch(e => {
        resp.json({message: e})
    })
})


// UPDATE QUESTION
router.patch('/:id', (req, resp) => {
    ExamQuestions.updateOne({_id: req.params.id}, {
        $set: {
            examId: req.body.examId,
            questionTitle: req.body.questionTitle,
            options: req.body.options,
            correctOption: req.body.correctOption,
        }
    }).then(data => {
        resp.json(data)
    }).catch(e => {
        resp.json({message: e})
    })
})


// DELETE QUESTION
router.delete('/:id', (req, resp) => {
    ExamQuestions.deleteOne({_id: req.params.id})
        .then(data => {
            resp.json(data)
        }).catch(e => {
        resp.json({message: e})
    })
})

module.exports = router;