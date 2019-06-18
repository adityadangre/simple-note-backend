'use strict'

const response = require('./response');
const connection = require('./connect');

exports.welcome = function (req, res) {
    connection.query(
        `SELECT * FROM note, category`,
        function (error, rows, field){
            if(error){
                throw error;
            }else{
                response.ok(rows, res);
            }
        }
    );
};

exports.note = function (req, res) {
    let id = req.params.id;

    connection.query(
        `SELECT * FROM note WHERE id=${id}`,
        function (error, rows, field){
            if(error){
                throw error;
            }else{
                response.ok(rows, res);
            }
        }
    );
};

exports.category = function (req, res) {
    let id = req.params.id;

    connection.query(
        `SELECT * FROM category WHERE id=${id}`,
        function (error, rows, field){
            if(error){
                throw error;
            }else{
                response.ok(rows, res);
            }
        }
    );
};

exports.icategory = function (req, res) {
    let name = req.body.name;

    connection.query(
        `INSERT INTO category SET name=?`,
        [name],
        function (error, rows, field){
            if(error){
                throw error;
            }else{
                return res.send({
                    error: false,
                    data: rows,
                    field: 'data has ben created'
                });
            }
        }
    );
};

exports.inote = function (req, res) {
    let title = req.body.title;
    let note = req.body.note;
    let categoryId = req.body.category_id;
    
    connection.query(
        `INSERT INTO note SET title=?, note=?, category_id=?`,
        [title, note, categoryId],
        function (error,  rows, field){
            if(error){
                throw error;
            }else{
                return res.send({
                    error: false,
                    data: rows,
                    field: 'data has ben created'
                });
            }
        }
    );
};