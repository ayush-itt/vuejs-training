const database = require("./config/mongodb-config");
const app = require("./app");
require("dotenv").config({ path: "./.env" });

database
    .connect()
    .then(() =>
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️  Server is running at port🛡️ ${process.env.PORT}`);
        })
    )
    .catch((err) => {
        console.error(err);
        process.exit(1); // Exit with a non-zero status code to indicate an error
    });
