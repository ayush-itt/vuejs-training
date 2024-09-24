const mongoose = require("mongoose");

class Database {
    constructor() {
        if (!Database.instance) {
            this.connectionObj = null;
            Database.instance = this;
        }
        return Database.instance;
    }

    async connect() {
        if (!this.connectionObj) {
            try {
                this.connectionObj = await mongoose.connect(
                    `${process.env.MONGODB_URI}`,
                    {
                        useNewUrlParser: true,
                    }
                );
                console.log(
                    `🔐 MongoDB Connected: ${this.connectionObj.connection.host}`
                );
            } catch (error) {
                throw new Error(
                    `😥 MongoDB Connection Error: ${error.message}`
                );
            }
        }
    }

    async disconnect() {
        try {
            if (this.connectionObj) {
                await mongoose.disconnect();
                console.log("🔗 MongoDB Disconnected!!");
                this.connectionObj = null;
            }
        } catch (error) {
            throw new Error(`😥 MongoDB Disconnect Error : ${error.message}`);
        }
    }
}

const database = new Database();
module.exports = database;
