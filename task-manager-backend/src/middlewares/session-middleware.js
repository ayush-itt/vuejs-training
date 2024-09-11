const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const expireTimeInSeconds = parseInt(process.env.SESSION_EXPIRES_IN);

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    expireAfterSeconds: expireTimeInSeconds,
    collection: process.env.SESSION_COLLECTION_NAME,
});

const sessionOptions = {
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: store,
    cookie: {
        secure: JSON.parse(process.env.IS_PRODUCTION),
        maxAge: expireTimeInSeconds * 1000,
    },
};

const sessionMiddleware = session(sessionOptions);

module.exports = sessionMiddleware;
