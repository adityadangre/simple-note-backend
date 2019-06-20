'use strict';

module.exports = function (app) {
    const controller = require('./controller');

    // ========== GET ==========
    app.get('/', controller.showAll);
    app.get('/notes', controller.showNotes);
    app.get('/notes/:id', controller.showNote);
    app.get('/categories', controller.showCategories);
    app.get('/categories/:id', controller.showCategory);

    // ========== POST ==========
    app.post('/notes', controller.addNote);
    app.post('/categories', controller.addCategory);

    // ========== PATCH ==========
    app.patch('/notes/:id', controller.editNote);
    app.patch('/categories/:id', controller.editCategory);

    // ========== DELETE ==========
    app.delete('/notes/:id', controller.deleteNote);
    app.delete('/categories/:id', controller.deleteCategory);
}