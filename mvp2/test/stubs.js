var constants = require('../lib/constants');

exports.userContext = {
    names: [{text: 'Newmarket'}],
    id: 'ae1ad665-6371-44aa-ad55-017961330b8c',
    image: 'abdjoiusdfiuouoiusf.jpg',
    staffId: 'ae1ad665-6371-44aa-ad55-017961330b8d',
    organisation: {
        id: 'ae1ad665-6371-44aa-ad55-017961330b8b'
    }
};

exports.getHydratedActivity = function () {
    return {
        id: '46153751-ee60-4d32-8728-8adc0b6c0000',
        subjectId: '5a4fa566-f535-4138-b6be-a35d20bb1111',
        object: {
          staffId : '5a4fa566-f535-4138-b6be-a35d20bb9999'
        },
        action: constants.actions.commented,
        mentions: []
    }
};