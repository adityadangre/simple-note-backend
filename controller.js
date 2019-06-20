'use strict';

const response = require('./response');
const connection = require('./connect');
const now = new Date();
const date = now.getDate() + "/" + now.getMonth() + "/" + now.getFullYear();

exports.showAll = function (req, res) {
    connection.query(
        `SELECT * FROM notes, categories`,
        function (error, rows, field){
            if(error){
                throw error;
            }else{
                response.ok(rows, res);
            }
        }
    );
};

exports.showNotes = function (req, res){
    let sort = req.query.sort;
    let search = req.query.search;
    let page = req.query.page;

    var query = `SELECT * FROM notes `;

    if(search) query = query + `WHERE CONCAT(title,note) LIKE '%${search}%' OR CONCAT(note, title) LIKE '%${search}%' `;

    if(sort) query = query + `ORDER BY id ${sort} `;

    let num = page == 1 ? page-1 : (page-1)*10;
    if(page) query = query + `LIMIT ${num},10 `;

    connection.query(
        query,
        function (error, rows, field) {
            if (error) {
                throw error;
            } else {
                response.ok(rows, res);
            }
        }
    );
}

exports.showCategories = function (req, res) {
    connection.query(
        `SELECT * FROM categories`,
        function (error, rows, field) {
            if (error) {
                throw error;
            } else {
                response.ok(rows, res);
            }
        }
    );
}

exports.showNote = function (req, res) {
    let id = req.params.id;

    connection.query(
        `SELECT * FROM notes WHERE id=?`,
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

exports.showCategory = function (req, res) {
    let id = req.params.id;

    connection.query(
        `SELECT * FROM categories WHERE id=?`,
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
        `INSERT INTO categories SET name=?`,
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
        `INSERT INTO notes SET title=?, note=?, time="${date}", category_id=?`,
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
        `UPDATE categories SET name=? WHERE id=?`,
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
        `UPDATE notes SET title=?, note=?, time="${date}", category_id=? WHERE id=?`,
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
        `DELETE FROM notes WHERE id=?`,
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
        'DELETE FROM categories WHERE id=?',
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