const database = require('../config'); 

const userModels = {
    getAll: (callback) => {
        database.query('SELECT * FROM users', callback);
    },


    getById: (id, callback) => {
        const sqlQuery = "SELECT * FROM users WHERE id = ?";
        database.query(sqlQuery, [id], callback);
    },

    
    create: (user, callback) => {
        const sql = 'INSERT INTO users (fName, lName, email, age) VALUES (?, ?, ?, ?)';
        const values = [user.fName, user.lName, user.email, user.age];
        database.query(sql, values, callback);
    },


    update: (id, user, callback) => {
        const sql = 'UPDATE users SET `fName` = ?, `lName` = ?, `email` = ?, `age` = ? WHERE id = ?';
        const values = [user.fName, user.lName, user.email, user.age, id];
        database.query(sql, values, (err, result) => {
            callback(err, result); 
        });
    },

    delete: (id, callback) => {
        const sql = 'DELETE FROM users WHERE id = ?';
        const value = [id];
        database.query(sql, value, callback);
    }
}

module.exports = userModels;  
