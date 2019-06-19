'use strict';

const response = require('./response');
const connection = require('./connect');
const now = new Date();
const date = now.getDate() + "/" + now.getMonth() + "/" + now.getFullYear();

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
        `SELECT * FROM note WHERE id=?`,
        [id],
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
        `SELECT * FROM category WHERE id=?`,
        [id],
        function (error, rows, field){
            if(error){
                throw error;
            }else{
                response.ok(rows, res);
            }
        }
    );
};

exports.addCategory = function (req, res) {
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
                    field: 'category has ben created'
                });
            }
        }
    );
};

exports.addNote = function (req, res) {
    let title = req.body.title;
    let note = req.body.note;
    let categoryId = req.body.category_id;
    
    connection.query(
        `INSERT INTO note SET title=?, note=?, time="${date}", category_id=?`,
        [title, note, categoryId],
        function (error,  rows, field){
            if(error){
                throw error;
            }else{
                return res.send({
                    error: false,
                    data: rows,
                    field: 'note has ben created'
                });
            }
        }
    );
};

exports.editCategory = function (req, res){
    let id = req.params.id;
    let name = req.body.name;

    connection.query(
        `UPDATE category SET name=? WHERE id=?`,
        [name, id],
        function (error, rows, field){
            if(error){
                throw error;
            }else{
                return res.send({
                    error: false,
                    data: rows,
                    field: 'data has been changed'
                });
            }
        }
    );
};

exports.editNote = function (req, res){
    let id = req.params.id;
    let title = req.body.title;
    let note = req.body.note;
    let categoryId = req.body.category_id;

    connection.query(
        `UPDATE note SET title=?, note=?, time="${date}", category_id=? WHERE id=?`,
        [title, note, categoryId, id],
        function (error, rows, field){
            if(error){
                throw error;
            }else{
                return res.send({
                    error: false,
                    data: rows,
                    field: 'data has been changed'
                });
            }
        }
    );
};

exports.deleteNote = function (req, res){
    let id = req.params.id;

    connection.query(
        `DELETE FROM note WHERE id=?`,
        [id],
        function (error, rows, field){
            if(error){
                throw error;
            }else{
                return res.send({
                    error: false,
                    data: rows,
                    field: 'data has been deleted'
                });
            }
        }
    );
};

exports.deleteCategory = function (req, res){
    let id = req.params.id;

    connection.query(
        'DELETE FROM category WHERE id=?',
        [id],
        function (error, rows, field){
            if(error){
                throw error;
            }else{
                return res.send({
                    error: false,
                    data: rows,
                    field: 'data has been deleted'
                });
            }
        }
    );
};