const mongoose = require("mongoose");

class Database {
    constructor() {
        if (!Database.instance) {
            this.conn = null;
            Database.instance = this;
        }
        return Database.instance;
    }

    async connect() {
        if (!this.conn) {
            try {
                this.conn = await mongoose.connect(
                    `${process.env.MONGODB_URI}`,
                    {
                        useNewUrlParser: true,
                    }
                );
                console.log(
                    `🔐 MongoDB Connected: ${this.conn.connection.host}`
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
            if (this.conn) {
                await mongoose.disconnect();
                console.log("🔗 MongoDB Disconnected!!");
                this.conn = null;
            }
        } catch (error) {
            throw new Error(`😥 MongoDB Disconnect Error : ${error.message}`);
        }
    }
}

const database = new Database();
module.exports = database;
