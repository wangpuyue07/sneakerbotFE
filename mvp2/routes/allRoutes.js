module.exports = function(app) {

    app.use('/api/users', require('./users/users.route.js'));

    /**
     * SPOTS
     */
    app.use('/api/persons', require('./spots/persons.route.js'));
    app.use('/api/staff', require('./spots/staff.route.js'));
    app.use('/api/spots', require('./spots/spots.route.js'));
    app.use('/api/organisations', require('./spots/organisations.route'));
    app.use('/api/stores', require('./spots/stores.route'));

    app.use('/api/feedback', require('./feedback/feedback.route'));
    app.use('/api/requests', require('./feedback/request.route'));
    app.use('/api/requestFeedback', require('./feedback/requestFeedback.route'));
    app.use('/api/products', require('./products/product.route'));
    app.use('/api/notifications', require('./news/notifications.route'));

    app.use('/api/insights', require('./insights/insights.route'));

    /**
     * NEWS
     */
    app.use('/api/news', require('./news/news.route.js'));

    /**
     * Activity
     */
    app.use('/api/activity', require('./activity/activity.route.js'));
    app.use('/api/activity/comments', require('./activity/comments.route.js'));

    /**
     * WEB
     */
    app.use('/auth', require('./auth'));
    app.use('/', require('./web.route.js'));

};
