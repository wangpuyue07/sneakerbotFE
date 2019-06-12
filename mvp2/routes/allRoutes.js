module.exports = function (app) {

    app.use('/api/users', require('./users/users.route.js'));

    /**
     * SPOTS
     */
    app.use('/api/staff', require('./spots/staff.route.js'));
    app.use('/api/organisations', require('./spots/organisations.route'));
    app.use('/api/stores', require('./spots/stores.route'));

    app.use('/api/feedback', require('./feedback/feedback.route'));
    app.use('/api/requestFeedback', require('./feedback/requestFeedback.route'));

    app.use('/api/products', require('./products/product.route'));
    app.use('/api/notifications', require('./news/notifications.route'));

    app.use('/api/suggestion', require('./suggestion/suggestion.route'));


    app.use('/api/insights', require('./insights/insights.route'));

    app.use('/api/dashboard', require('./dashboard/dashboard.route'));


    app.use('/api/principal', require('./principals/principals.route'));

    /**
     * NEWS
     */
    app.use('/api/news', require('./news/news.route.js'));

    /**
     * VEND INTEGRATION
     */
    app.use('/api/vend', require('./vend/vend.route.js'));

    /**
     * Activity
     */
    // app.use('/api/activity', require('./activity/activity.route.js'));
    app.use('/api/comments', require('./comments/comments.route.js'));
    app.use('/api/vote', require('./votes/votes.route.js'));

    /**
     * WEB
     */
    /**
     * /auth update
     */
    app.use('/auth', require('./auth'));
    app.use('/', require('./web.route.js'));

};


