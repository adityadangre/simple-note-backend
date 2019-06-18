'use strict'

module.exports = function (app) {
    const controller = require('./controller');

    // ========== GET ==========
    app.get('/', controller.welcome);
    app.get('/note/:id', controller.note);
    app.get('/category/:id', controller.category);

    // ========== POST ==========
    app.post('/categories', controller.icategory);
    app.post('/notes', controller.inote);

    // ========== PATCH ==========
    

    // ========== DELETE ==========
    // app.delete('/note/:id', controller.dnote);
    // app.delete('/category/:id', controller.dcategory);
}