const app = require("./app");
require("dotenv").config({ path: "./test.env" });

app.listen(process.env.PORT, () =>
  console.log(
    "Server is running now on port http://localhost:" + process.env.PORT
  )
);
