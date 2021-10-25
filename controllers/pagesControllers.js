const path = require("path")
const Information = require("../models/Information")
const pagesControllers = {
	home: (req, res) => {
		try {
			res.render("index", {
				title: "Home",
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
        name: req.session.name,
        image: req.session.image,
        lastname: req.session.lastname,
			})
		} catch (error) {
			console.log(error)
			res.redirect("/")
		}
	},

	profile: (req, res) => {
		try {
			res.render("profile", {
				title: "Profile",
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
        name: req.session.name,
        image: req.session.image,
        lastname: req.session.lastname,
			})
		} catch (error) {
			console.log(error)
			res.redirect("/")
		}
	},

	page404: (req, res) => {
		res.render("page404", {
			title: "page404"
		})
	},

	information: (req, res) => {
		try {
			res.render("information", {
				title: "Information",
				loggedIn: req.session.loggedIn,
				userId: req.session.userId,
				name: req.session.name,
				image: req.session.image,
        lastname: req.session.lastname,
			})
		} catch (error) {
			console.log(error)
			res.redirect("/page404")
		}
	},

	noAutorizado: (req, res) => {
		try {
			res.render("noAutorizado", {
				title: "No Autorizado",
				loggedIn: req.session.loggedIn,
				name: req.session.name
			})
		} catch (error) {
			console.log(error)
			res.render("page404", {
				title: "page404"
			})
		}
	},

	getInformation: async (req, res) => {
		if (req.session.loggedIn) {
			const info = await Information.find()
			return res.render("information", {
				title: "Information",
				info,
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
        name: req.session.name,
        image: req.session.image,
        lastname: req.session.lastname,
			})
		}

		res.redirect("/no-autorizado")
	},

	form: async (req, res) => {
		const { title, src, description } = req.body
		try {
			let formulario = new Information({
				title,
				src,
				description,
			})
			let information = await formulario.save()
			console.log(information)
		} catch (error) {
			console.log(error)
		}
	}
}

module.exports = pagesControllers
