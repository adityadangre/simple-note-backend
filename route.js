'use strict';

module.exports = function (app) {
    const controller = require('./controller');

    // ========== GET ==========
    app.get('/', controller.welcome);
    app.get('/note/:id', controller.note);
    app.get('/category/:id', controller.category);

    // ========== POST ==========
    app.post('/category/add', controller.addCategory);
    app.post('/note/add', controller.addNote);

    // ========== PATCH ==========
    app.patch('/category/edit/:id', controller.editCategory);
    app.patch('/note/edit/:id', controller.editNote);

    // ========== DELETE ==========
    // app.delete('/note/:id', controller.dnote);
    // app.delete('/category/:id', controller.dcategory);
}