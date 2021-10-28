const path = require("path")
const bcryptjs = require("bcryptjs")
const User = require("../models/User")
const userControllers = {
	signUp: (req, res) => {
		try {
			res.render("signup", {
				title: "Sign Up",
				error: null,
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
        name: req.session.name,
        image: req.session.image,
        lastname: req.session.lastname,
			})
		} catch (error) {
			console.log(error)
			res.render("page404", {
				title: "page404"
			})
		}
	},
	signIn: (req, res) => {
		try {
			res.render("signin", {
				title: "Sign In",
				error: null,
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
        name: req.session.name,
        image: req.session.image,
        lastname: req.session.lastname,
			})
		} catch (error) {
			console.log(error)
			res.render("page404", {
				title: "page404"
			})
		}
	},
	newUser: async (req, res) => {
		const { name, lastname, email, password, image } = req.body
		let passwordHash = bcryptjs.hashSync(password)
		let user = new User({
			name,
			lastname,
			email,
			password: passwordHash,
			image
		})
		try {
			let userExist = await User.findOne({ email })
			if (!userExist) {
				let newUser = await user.save()
				req.session.loggedIn = true
				req.session.name = newUser.name
				req.session.userId = newUser._id
				req.session.image = newUser.image
        req.session.lastname = newUser.lastname
				return res.redirect("/")
			} else {
				res.render("signup", {
					title: "Sign Up",
					error: "email in use",
					loggedIn: req.session.loggedIn,
					userId: req.session.userId,
					name: req.session.name,
					image: req.session.image,
          lastname: req.session.lastname,
				})
			}
		} catch (error) {
			console.log(error)
			res.render("page404", {
				title: "page404"
			})
		}
	},

	logUser: async (req, res) => {
		const { email, password } = req.body
		try {
			let user = await User.findOne({ email })

			if (bcryptjs.compareSync(password, user.password)) {
				req.session.loggedIn = true
				req.session.name = user.name
				req.session.userId = user._id
				req.session.image = user.image
        req.session.lastname = user.lastname
				return res.redirect("/")
			} else {
				res.render("signin", {
					title: "Sign In",
					error: "email or password incorrect",
					loggedIn: req.session.loggedIn,
					userId: req.session.userId,
					name: req.session.name,
					image: req.session.image,
          lastname: req.session.lastname,
				})
			}
		} catch (error) {
			console.log(error)
			res.render("page404", {
				title: "page404"
			})
		}
	},

	signOut: (req, res) => {
		try {
			req.session.destroy(() => {
				res.redirect("/")
			})
		} catch (error) {
			console.log(error)
			res.render("page404", {
				title: "page404"
			})
		}
	}
}

module.exports = userControllers
