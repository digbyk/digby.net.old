require('dotenv').load({ silent: true });

var contentful = require('contentful');

var client = contentful.createClient({
	space: process.env.CONTENTFUL_SPACE,
	accessToken: process.env.CONTENTFUL_TOKEN,
	secure: true,
	host: process.env.CONTENTFUL_HOST,
	resolveLinks: true
});

var contentService = {
    getContentById: function getContentById(id) {
        return {};
    }
};

module.exports = contentService;