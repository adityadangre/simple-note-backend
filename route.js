'use strict';

module.exports = function (app) {
    const controller = require('./controller');

    // ========== GET ==========
    app.get('/', controller.welcome);
    app.get('/note/:id', controller.note);
    app.get('/category/:id', controller.category);

    // ========== POST ==========
    app.post('/category', controller.addCategory);
    app.post('/note', controller.addNote);

    // ========== PATCH ==========
    app.patch('/category/:id', controller.editCategory);
    app.patch('/note/:id', controller.editNote);

    // ========== DELETE ==========
    app.delete('/note/:id', controller.deleteNote);
    app.delete('/category/:id', controller.deleteCategory);
}