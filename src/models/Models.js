const Users = {
		user: {
			email: String,
			id_user: Number,
			login_code: String,
			password: String,
			person: {
				address: Number,
				card_id_person: String,
				date_born: Date,
				first_name: String,
				gender: {
					gender_name: String,
					id_gender: Number
				},
				id_person: String,
				last_name: String,
				phone: String
			},
			register_date: Date,
			rol_user: {
				id_rol: Number,
				rol_name: String
			},
			user_name: String,
			user_state: Boolean
		}
	}

export {
	Users
}