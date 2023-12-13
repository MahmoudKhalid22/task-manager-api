/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          userData:
 *            type: object
 *            properties:
 *             name:
 *              type: string
 *              description: the name of the user
 *             email:
 *              type: string
 *              description: the email of the user
 *             _id:
 *              type: string
 *              description: The auto-generated id of the user
 *             created_at:
 *              type: string
 *              description: the date of creating user
 *             updatedAt:
 *              type: string
 *              description: the date of updating user
 *          tokens:
 *            type: string
 *            items:
 *             token:
 *               type: string
 *               description: the token sent to user
 *      UserOnly:
 *        type: object
 *        properties:
 *             name:
 *              type: string
 *              description: the name of the user
 *             email:
 *              type: string
 *              description: the email of the user
 *             _id:
 *              type: string
 *              description: The auto-generated id of the user
 *             created_at:
 *              type: string
 *              description: the date of creating user
 *             updatedAt:
 *              type: string
 *              description: the date of updating user
 *
 *
 *      Register:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            description: the name of the new user
 *          email:
 *            type: string
 *            description: the email of the user
 *          password:
 *            type: string
 *            description: the password of the account
 *      Login:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *            description: the email that user created
 *          password:
 *             type: string
 *             description: the password of the user
 *
 */
/**
 * @swagger
 *  /users:
 *    post:
 *     desctiption: create a new user
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Register'
 *     responses:
 *      '200':
 *        description: the response of this request
 *        content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *
 *
 */
/**
 * @swagger
 * /users/login:
 *  post:
 *    description: login user
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Login'
 *    responses:
 *       '200':
 *        description: the response of this request
 *        content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *
 */
/**
 * @swagger
 * /users/logout:
 *  post:
 *    description: logout user
 *    parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer token for user authentication
 *          example: "Bearer abcxyz123456"
 *    responses:
 *       '200':
 *        description: the response of logout user
 *        content:
 *         application/json:
 *            schema:
 *               type: string
 *               example: user logged out
 *
 */
/**
 * @swagger
 * /users/logoutAll:
 *  post:
 *    description: logout user
 *    parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer token for user authentication
 *          example: "Bearer abcxyz123456"
 *    responses:
 *       '200':
 *        description: the response of logout user
 *        content:
 *         application/json:
 *            schema:
 *               type: string
 *               example: all users logged out
 *
 */
/**
 * @swagger
 * /users/me:
 *  get:
 *    description: get the user information
 *    parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer token for user authentication
 *          example: "Bearer abcxyz123456"
 *    responses:
 *       '200':
 *        description: the response of logout user
 *        content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *
 *
 */
/**
 * @swagger
 * /users/{id}:
 *  get:
 *    description: get a specific user by id
 *    parameters:
 *           - name: id
 *             in: path
 *             required: true
 *             schema:
 *              type: string
 *              description: The ID of the user
 *    responses:
 *       '200':
 *        description: the response of get a specific user
 *        content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/UserOnly'
 *
 */
/**
 * @swagger
 * /users/me:
 *  patch:
 *    description: update user
 *    parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer token for user authentication
 *          example: "Bearer abcxyz123456"
 *    requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Register"
 *    responses:
 *       '200':
 *        description: the response of logout user
 *        content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/User'
 *
 */
/**
 * @swagger
 * /users/me:
 *  delete:
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: string
 *        required: true
 *        description: Bearer token for user authentication
 *        example: "Bearer abcxyz123456"
 *    responses:
 *        '200':
 *          description: delete user
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: "Successfully deleted user"
 *
 */

const router = require("express").Router();
const multer = require("multer");
const {
  createUser,
  loginUser,
  logoutUser,
  logoutAll,
  getUser,
  updateUser,
  deleteUser,
  uploadUser,
  getUserById,
  getUserAvatar,
} = require("../controller/users");
const auth = require("../auth/auth");
const User = require("../model/users");

// REGISTER NEW USER
router.post("/users", createUser);

// LOGIN
router.post("/users/login", loginUser);

// LOGOUT
router.post("/users/logout", auth, logoutUser);

// LOGOUT USER FROM ALL SESSIONS
router.post("/users/logoutAll", auth, logoutAll);

// GET ONE USER
router.get("/users/me", auth, getUser);

router.get("/users/:id", getUserById);

// UPDATE USER
router.patch("/users/me", auth, updateUser);

// DELETE USER
router.delete("/users/me", auth, deleteUser);

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    //		console.log(file.originalname,file.originalname.includes('.jpg'))
    if (!file.originalname.includes("png")) {
      if (!file.originalname.includes("jpg")) {
        if (!file.originalname.includes("jpeg")) {
          return cb(new Error("it must be an image"));
        }
      }
    }
    cb(undefined, true);
  },
});

router.post(
  "/upload",
  auth,
  upload.single("avatar"),
  uploadUser,
  (error, req, res, next) => res.status(500).json({ error: error.message })
);

router.get("/users/:id/avatar", getUserAvatar);

module.exports = router;
