'use strict';

module.exports = function (app) {
    const controller = require('./controller');

    // ========== GET ==========
    app.get('/', controller.welcome);
    app.get('/notes', controller.notes);
    app.get('/note/:id', controller.note);
    app.get('/categories', controller.categories);
    app.get('/category/:id', controller.category);

    // ========== POST ==========
    app.post('/note', controller.addNote);
    app.post('/category', controller.addCategory);

    // ========== PATCH ==========
    app.patch('/note/:id', controller.editNote);
    app.patch('/category/:id', controller.editCategory);

    // ========== DELETE ==========
    app.delete('/note/:id', controller.deleteNote);
    app.delete('/category/:id', controller.deleteCategory);
}