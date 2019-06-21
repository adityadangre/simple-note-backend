'use strict';

const response = require('./response');
const connection = require('./connect');

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
    let {sort, search, sort_by} = req.query;
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    
    var query = `SELECT notes.id, notes.title, notes.note, notes.time, categories.name AS category FROM notes INNER JOIN categories ON notes.category_id = categories.id `;

    if(search) query = query + `WHERE CONCAT(title,note) LIKE '%${search}%' OR CONCAT(note, title) LIKE '%${search}%' `;
    
    let by = 'time';                            
    let order = 'desc';                         
    sort ? order = sort : order;                 
    sort ? by = 'title' : by;                   
    if(sort_by){
        by = sort_by;
        order = 'asc';
    }else{
        by = by;
    }                  

    query = query + `ORDER BY ${by} ${order} `; 

    let queryNoLimit = query;

    let num = page == 1 ? page-1 : (page-1)*limit;
    query = query + `LIMIT ${num},${limit} `;

    connection.query(
        query,
        function (error, rows, field) {
            if (error) {
                throw error;
            } else {
                connection.query(queryNoLimit, function (err, row, field){
                    let total = row.length;
                    let totalPage = Math.ceil(total/limit);
                    let currPage = parseInt(page);
                    let numLimit = parseInt(limit);

                    let info = [total, currPage, totalPage, numLimit];
                    
                    response.info(rows, info, res);
                });
            }
        }
    );
};

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
};

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
        `UPDATE notes SET title=?, note=?, time=current_time(), category_id=? WHERE id=?`,
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