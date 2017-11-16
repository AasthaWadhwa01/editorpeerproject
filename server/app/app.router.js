const path = require('path');
const apiRoutes = require('../api');

// All routes used in application
const useRoutes = function(app) {

    app.use('/api/snippets', apiRoutes.snippetRoutes);
    app.use('/api/users', apiRoutes.userRoutes);
    app.use('/api/forums', apiRoutes.forumRoutes);
    app.use('/api/login', apiRoutes.loginRoutes);
    app.use('/api/chat', apiRoutes.chatRoutes)

};

module.exports = {
    useRoutes: useRoutes
};
