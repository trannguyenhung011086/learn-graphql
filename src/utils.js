const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
    getUserId: context => {
        const Authorization = context.request.get('Authorization');
        if (Authorization) {
            const token = Authorization.replace('Bearer ', '');
            const { userId } = jwt.verify(token, config.appSecret);
            return userId;
        }
        throw new Error('Not authenticated!');
    },
};
