const path = require("path")
const Comment = require("../models/Comment")

const commentsControllers = {
	reviews: async (req, res) => {
		if (req.session.loggedIn) {
			const comments = await Comment.find()

			return res.render("reviews", {
				title: "Reviews",
				comments,
				error: null,
				edited: false,
				loggedIn: req.session.loggedIn,
				userId: req.session.userId,
				name: req.session.name,
				image: req.session.image,
        lastname: req.session.lastname,
			})
		}
		res.redirect("/no-autorizado")
	},

	addComment: async (req, res) => {
		const { comment, _id } = req.body
		let newComment

		if (!_id) {
			newComment = new Comment({
				comment,
				loggedIn: req.session.loggedIn,
				userId: req.session.userId,
				name: req.session.name,
				image: req.session.image,
        lastname: req.session.lastname,
			})
      console.log(newComment.lastname)
		} else {
			newComment = await Comment.findOne({ _id })
			newComment.comment = comment
		}
		try {
			newComment.save()
			res.redirect("/reviews")
		} catch (error) {
			console.log(error)
			res.render("page404", {
				title: "page404"
			})
		}
	},

	deleteComment: async (req, res) => {
		const idComment = req.params._id
		try {
			await Comment.findByIdAndDelete({
				_id: idComment
			})
			res.redirect("/reviews")
		} catch (error) {
			console.log(error)
			res.render("page404", {
				title: "page404"
			})
		}
	},

	editComment: async (req, res) => {
		const idComment = req.params._id
		try {
			let commentActual = await Comment.findOne({
				_id: idComment
			})
			let comments = await Comment.find()
			res.render("reviews", {
				title: "Reviews",
				comments,
				error: null,
				edited: commentActual,
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
	}
}

module.exports = commentsControllers
