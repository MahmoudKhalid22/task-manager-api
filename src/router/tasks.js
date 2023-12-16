/**
 * @swagger
 * /tasks:
 *   post:
 *    tags:
 *      - add a new task
 *    parameters:
 *     - in: header
 *       name: Authorization
 *       schema:
 *          type: string
 *       required: true
 *       description: Bearer token for user authentication
 *       example: "Bearer abcxyz123456"
 *
 *    requestBody:
 *          content:
 *           application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Task'
 *    responses:
 *       '200':
 *          description: Added task to database
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
/**
 * @swagger
 * /tasks:
 *   get:
 *    tags:
 *      - Get all tasks
 *    description: get all tasks from database
 *
 *    parameters:
 *     - in: header
 *       name: Authorization
 *       schema:
 *          type: string
 *       required: true
 *       description: Bearer token for user authentication
 *       example: "Bearer abcxyz123456"
 *
 *    responses:
 *       '200':
 *          description: get all tasks
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *    tags:
 *      - get a specific task by id
 *    parameters:
 *     - in: header
 *       name: Authorization
 *       schema:
 *          type: string
 *       required: true
 *       description: Bearer token for user authentication
 *       example: "Bearer abcxyz123456"
 *    responses:
 *       '200':
 *          description: get a specific task by id
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *    tags:
 *      - update a task by id
 *    parameters:
 *     - in: header
 *       name: Authorization
 *       schema:
 *          type: string
 *       required: true
 *       description: Bearer token for user authentication
 *       example: "Bearer abcxyz123456"
 *    requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: "#/components/schemas/Task"
 *    responses:
 *       '200':
 *          description: updated the task
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *    tags:
 *      - delete a task by id
 *    parameters:
 *     - in: header
 *       name: Authorization
 *       schema:
 *          type: string
 *       required: true
 *       description: Bearer token for user authentication
 *       example: "Bearer abcxyz123456"
 *
 *    responses:
 *       '200':
 *          description: deleted the task
 *          content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "the task has been deleted"
 */

const router = require("express").Router();
const auth = require("../auth/auth");
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controller/tasks");

// CREATING A TASK
router.post("/tasks", auth, createTask);

// GETTING ALL TASK
router.get("/tasks", auth, getTasks);

// GETTING A TASK BY ID
router.get("/tasks/:id", auth, getTask);

// UPDATING A TASK
router.patch("/tasks/:id", auth, updateTask);

// DELETING A TASK
router.delete("/tasks/:id", auth, deleteTask);

// GET /tasks?completed=true

module.exports = router;
