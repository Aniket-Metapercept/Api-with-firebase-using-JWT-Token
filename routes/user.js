const auth = require('../Authentication')
const { getAllUser, createUser, getUserById, updateUserById, deleteUserById, login } = require('../controller/user')

const router = require('express').Router()

router.get('/',auth,getAllUser)

router.get('/:id',getUserById)
router.post('/register',createUser)
router.post('/login',login)
router.put('/:id',updateUserById)
router.delete('/:id',deleteUserById)


module.exports = router