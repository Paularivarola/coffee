const express = require("express")
const router = express.Router()
const pagesControllers = require("../controllers/pagesControllers")
const userControllers = require("../controllers/userControllers")
const commentsControllers = require("../controllers/commentsControllers")
const validator = require("../controllers/validator")

router.route("/")
.get(pagesControllers.home)

router.route("/profile")
.get(pagesControllers.profile)

router.route("/signup")         
.get(userControllers.signUp)
.post(validator, userControllers.newUser)

router.route("/signin")
.get(userControllers.signIn)
.post(userControllers.logUser)

router.route("/information")
.get(pagesControllers.getInformation)
.post(pagesControllers.form)

router.route("/page404")
.get(pagesControllers.page404)

router.route("/signout")
.get(userControllers.signOut)

router.route('/reviews')
.get(commentsControllers.reviews)
.post(commentsControllers.addComment)

router.route("/edit-comment/:_id")
.get(commentsControllers.editComment)

router.route("/delete-comment/:_id")
.get(commentsControllers.deleteComment)

router.route("/no-autorizado")
.get(pagesControllers.noAutorizado)

module.exports = router