import { Router } from "express"
import { CreateUserController } from "./controllers/CreateUserController"
import { CreateTagController } from "./controllers/CreateTagController"
import { ensureAdmin } from "./middlewares/ensureAdmin"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController"
import { CreateComplimentController } from "./controllers/CreateComplimentController"
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated"
import { ListUserReceiverComplimentsController } from "./controllers/ListUserReceiverComplimentsController"
import { ListUserSenderComplimentsController } from "./controllers/ListUserSenderComplimentsController"
import { ListTagController } from "./controllers/ListTagController"
import { ListUserController } from "./controllers/ListUserController"

const router = Router()

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()
const listUserSenderComplimentsController = new ListUserSenderComplimentsController()
const listUserReceiverComplimentsController = new ListUserReceiverComplimentsController()
const listTagController = new ListTagController()
const listUserController = new ListUserController()

router.post('/users', createUserController.handle)
router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle)
router.post('/login', authenticateUserController.handle)
router.post('/compliments', ensureAuthenticated, createComplimentController.handle)
router.get('/users/compliments/send', ensureAuthenticated, listUserSenderComplimentsController.handle)
router.get('/users/compliments/receive', ensureAuthenticated, listUserReceiverComplimentsController.handle)
router.get('/tags', ensureAuthenticated, listTagController.handle)
router.get('/users', ensureAuthenticated, listUserController.handle)

export { router }