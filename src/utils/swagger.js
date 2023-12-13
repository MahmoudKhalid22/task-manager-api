const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager Api docs",
      description:
        "this is task manager api for users to write their notes and save it in database with time and completed and users also can search for their notes and order it by completion",
      version: "1.0.0",
      contact: {
        name: "Mahmoud Khalid",
        url: "https://my-portfolio-khalid.netlify.app",
        email: "mahmoud0122549@gmail.com",
      },
    },
    servers: [{ url: "http://localhost:4000/" }],
  },
  apis: ["./src/router/*.js", "./src/model/*.js"],
};

const spaces = swaggerJsDoc(options);

function docs(app) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(spaces));
}

module.exports = { docs };
