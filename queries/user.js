const connection = require('../db')
const express = require("express")
// const app = express()
const router = express.Router();

//GET ALL users
router.get('/getAll', (req, res) => {
	const select_all = "SELECT * FROM users;"
	connection.query(select_all, (err, result) => {
		if (err) {
			res.status(400).json({ message: err.sqlMessage })
		} else {
			res.status(200).json(result)
		}
	})
})

//GET user BY ID
router.get('/getById/:id', (req, res) => {
	const id = req.params.id;
	const select_byId = "SELECT * FROM users WHERE id = ?;"
	connection.query(select_byId, id, (err, result) => {
		if (err) {
			res.status(400).json({ message: err.sqlMessage })
		} else {
			if (result.length != 0) {
				res.status(200).json(result)
			} else {
				res.status(404).json({ message: `${id} doesn't exist` })
			}
		}
	})
})

//ADD user
router.post('/add', (req, res) => {
	const username = req.body.name;
    const email = req.body.email;
    const gender = req.body.gender;


	const insert_query = "INSERT INTO users(name, email,gender) VALUES (?, ?,?);"
	connection.query(insert_query, [username, email,gender], (err, result) => {
		if (err) {
			res.status(400).json({ message: err.sqlMessage })
		} else {
			res.status(200).json({ message: `${result.affectedRows} user was added..!` })
		}
		console.log(result);
	})
})

//DELETE user BY ID
router.delete('/deleteById/:id', (req, res) => {
	const id = req.params.id;

	const delete_query = "DELETE FROM users WHERE id = ?"
	connection.query(delete_query, id, (err, result) => {
		if (err) {
			res.status(400).json({ message: err.sqlMessage })
		} else {
			if (result.affectedRows != 0) {
				res.status(200).json({ message: `${result.affectedRows} user was deleted..!` })
			} else {
				res.status(404).json({ message: `${id} doesn't exist `})
			}
		}
	})
})

//UPDATE user BY ID
router.patch("/updateById/:id", (req, res) => {
	const id = req.params.id;

	const select_byId = "SELECT * FROM users WHERE id = ?;"
	connection.query(select_byId, id, (err, result) => {
		if (err) {
			res.status(400).json({ message: err.sqlMessage })
		} else {
			if (result.length != 0) {
				const old_values = result[0]

				const updated_values = {...old_values, ...req.body}
				
				const values = [updated_values.name, updated_values.email,updated_values.gender ,id]
				console.log(values);

				const update_query = "UPDATE users SET name = ?, email = ?,gender=? WHERE id = ?"
				connection.query(update_query, values, (err, result) => {
					if (err) {
						res.status(400).json({message: err.sqlMessage})
					} else {
						if (result.changedRows != 0) {
							res.status(200).json({message: `${result.changedRows} user was updated..!`})
						} else {
							res.status(404).json({message: `${id} doesn't updated`})
						}
					}
					console.log(result);
					
				})
			} else {
				res.status(404).json({ message: `${id} doesn't exist` })
			}
		}
	})
})

module.exports = router