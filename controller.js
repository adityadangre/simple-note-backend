'use strict';

const response = require('./response');
const connection = require('./connect');

// exports.showAll = function (req, res) {
//     connection.query(
//         `SELECT * FROM notes, categories`,
//         function (error, rows, field){
//             if(error){
//                 throw error;
//             }else{
//                 response.ok(rows, res);
//             }
//         }
//     );
// };

exports.showNotes = function (req, res){
    let {sort, search, search_by} = req.query;
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    
    var query = `SELECT notes.id, notes.title, notes.note, notes.time, categories.name AS category, categories.id AS category_id FROM notes LEFT JOIN categories ON notes.category_id = categories.id `;

    search_by = search_by || 'CONCAT(title,note)';
    if (search) query = query + `WHERE ${search_by} LIKE '%${search}%' OR ${search_by} LIKE '%${search}%' `;

    let order = 'desc';                
    sort ? order = sort : order;             

    query = query + `ORDER BY time ${order} `; 

    let queryNoLimit = query;

    let num = page == 1 ? page-1 : (page-1)*limit;
    query = query + `LIMIT ${num},${limit} `;
    console.log(query);

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

                    !rows.length == 0 ? response.info(rows, info, res) : response.empty(rows, res);                    
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
                !rows.length == 0 ? response.ok(rows, res) : response.empty(rows, res);
            }
        }
    );
};

exports.showNote = function (req, res) {
    let id = req.params.id;

    connection.query(
        `SELECT notes.id, notes.title, notes.note, notes.time, categories.name AS category FROM notes INNER JOIN categories ON notes.category_id = categories.id  WHERE notes.id=?`,
        [id],
        function (error, rows, field){
            if(error){
                throw error;
            }else{
                !rows.length == 0 ? response.ok(rows, res) : response.empty(rows, res);
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
                !rows.length == 0 ? response.ok(rows, res) : response.empty(rows, res);
            }
        }
    );
};

exports.addCategory = function (req, res) {
    let name = req.body.name;
    let icon = req.body.icon;
    let color = req.body.color;

    connection.query(
        `INSERT INTO categories SET name=?, icon=?, color=?`,
        [name, icon, color],
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
        `INSERT INTO notes SET title=?, note=?, time=CURRENT_DATE, category_id=?`,
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
        `UPDATE notes SET title=?, note=?, category_id=? WHERE id=?`,
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