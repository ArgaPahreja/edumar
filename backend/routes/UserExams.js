const express = require('express')
const UserExams = require('../models/userExams')
const router = express.Router()


// GET EXAM THAT ALREADY DID
router.get('/', (req, resp) => {
    const examId = req.query.examId; // Get the examId from the query parameter

    let query = UserExams.find(); // Define the base query

    if (examId) {
        query = query.where('examId').equals(examId); // Apply the filter based on examId
    }

    query.sort({ grade: -1 }) // Sorting in descending order based on the "grade" field
        .then(data => {
            resp.json(data);
        })
        .catch(e => {
            resp.json({ message: e });
        });
});


// GET STUDENT WHO DID THE EXAM
router.get("/:id", async (req, resp) => {
    try {
        UserExams.find({ userId: req.params.id }).then(data => {
            resp.json(data)
        })
    } catch (err) {
        resp.json({ message: err });
    }
});

// GET EXAM THAT ALREADY DID
router.get("/exam/:id", async (req, resp) => {
    try {
        const examId = req.params.id;
        const userId = req.query.userId;

        let filter = { examId: examId };
        if (userId) {
            filter.userId = userId;
        }

        UserExams.find(filter).then(data => {
            resp.json(data);
        });
    } catch (err) {
        resp.json({ message: err });
    }
});

// POST EXAM THAT ALREADY DID
router.post('/', (req, resp) => {
    const userExams = new UserExams({
        examId: req.body.examId,
        userId: req.body.userId,
        grade: req.body.grade,
        userInfo: req.body.userInfo,
        examReview: req.body.examReview,
        status: req.body.status,
    })
    userExams.save().then(data => {
        resp.json(data)
    }).catch(e => {
        resp.json({ message: e })
    })
})

// PUT EXAM THAT ALREADY DID
router.put("/:id", (req, resp) => {
    UserExams.updateOne({ _id: req.params.id }, {
        $push: {
            examReview: req.body.examReview,
        }
    }).then(data => {
        resp.json(data)
    }).catch(e => {
        resp.json({ message: e })
    })
})

// UPDATE EXAM THAT ALREADY DID
router.patch('/:id', (req, resp) => {
    // log all the request body
    UserExams.updateOne({ _id: req.params.id }, {
        $set: {
            userId: req.body.userId,
            examId: req.body.examId,
            grade: req.body.grade,
        }
    }).then(data => {
        resp.json({ data })
    }).catch(e => {
        resp.json({ message: e })
    })
})

router.delete('/:id', (req, resp) => {
    UserExams.deleteOne({ _id: req.params.id })
        .then(data => {
            resp.json(data)
        }).catch(e => {
            resp.json({ message: e })
        })
})

module.exports = router;