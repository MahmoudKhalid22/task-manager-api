const router = require('express').Router();
const multer = require('multer');
const { createUser,loginUser,logoutUser,logoutAll,getUser,updateUser,deleteUser,uploadUser,getUserById,getUserAvatar } = require('../controller/users');
const auth = require('../auth/auth');
const User = require('../model/users')

// REGISTER NEW USER
router.post('/users',createUser);

// LOGIN
router.post('/users/login',loginUser);


// LOGOUT
router.post('/users/logout',auth,logoutUser);


// LOGOUT USER FROM ALL SESSIONS
router.post('/users/logoutAll',auth,logoutAll);

// GET ONE USER
router.get('/users/me',auth ,getUser);

router.get('/users/:id', getUserById)

// UPDATE USER
router.patch('/users/me',auth,updateUser);

// DELETE USER
router.delete('/users/me', auth, deleteUser)



const upload = multer({
	limits:{
	   fileSize: 1000000,
	},
	fileFilter(req,file,cb) {
//		console.log(file.originalname,file.originalname.includes('.jpg'))
		if(!file.originalname.includes('png'))
		  {
			if(!file.originalname.includes('jpg')){
				if(!file.originalname.includes('jpeg')){

				return cb(new Error('it must be an image'))
			}
			}
			}		
		cb(undefined,true)
	}	
})

router.post('/upload',auth,upload.single('avatar'),uploadUser
,(error,req,res,next) => res.status(500).json({error:error.message}));

router.get('/users/:id/avatar',getUserAvatar)



module.exports = router;
