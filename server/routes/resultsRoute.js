const express = require('express');
const router = express.Router();
const Results = require('../models/results');
const bodyParser = require("body-parser");

// all results
router.get('/', (req,res) => {
    Results.find()
        .then((results) => {
            res.send({
                count:results.length,
                data:results
            });
        })
        .catch((err) => {
            res.status(500).send(err);
        });
})


// get by user id

router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const results = await Results.find({ userId }).sort({ createdAt: -1 }); // Sorting by createdAt field in descending order
        if (!results || results.length === 0) {
            return res.status(404).json({ message: 'Results not found' });
        }
    
        return res.status(200).send({
            count: results.length,
            data: results,
        });
    } catch (error) {
        console.log("Error occurred while fetching results by userId:", error.message);
        res.status(500).send({ message: error.message });
    }
});



// get results by id

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const results = await Results.findById(id);
        if (!results) {
            return res.status(404).json({ message: 'Results not found' });
        }
    
        return res.status(200).send({
            count: 1,
            data: results,
        });
    } catch (error) {
        console.log("inside id");
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});



router.post('/', bodyParser.json(), async (req, res) => {
    const { userId, typed, accuracy, cpm, error } = req.body;

    const result = new Results({
        userId,
        typed,
        accuracy,
        cpm,
        error
    });

    const outcome = await Results.create(result);

    result.save()
        .then(() => {
            res.send(outcome);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});



module.exports = router;