const userModels = require('../Models/UserModels');
const { body, validationResult } = require('express-validator');

exports.getAllUser = (req, res) => {
    userModels.getAll((err, users) => {
        if (err) return res.status(500).send(err);
        res.json(users);
    });
};


exports.getUserById = (req, res) => {
    userModels.getById(req.params.id, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error retrieving user");
        }
        res.json(user[0]); 
    });     
};


exports.createUser = [
    // Validation rules
    body('fName')
        .isLength({ min: 3 })
        .withMessage('First name is required'),

    body('lName')
        .isLength({ min: 5 })
        .withMessage('Last name is required'),

    body('email')
        .isEmail()
        .withMessage('Invalid email format'),

    body('age')
        .isInt({ gt: 0 })
        .withMessage('Age must be a positive integer'),

    // Handler for the route
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newUser = req.body;
        userModels.create(newUser, (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ 
                id: result.insertId, 
                ...newUser
            });
        });
    }
];



exports.updateUser = (req, res) => {
    const updatedUser = req.body;
    const userId = req.params.id;
    userModels.update(req.params.id, updatedUser, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error updating user");
        }
        res.json({
            id: userId,
            ...updatedUser
        });
    });
};

exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    userModels.delete(userId, (err) => {
        if(err) res.status(500).send(err);
        res.json( {
            message: 'User Deleted'
        });
    });
};

