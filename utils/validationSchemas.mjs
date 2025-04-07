export const createUserValidationSchema = {
	username: {
		isLength: {
			options: {
				min: 5,
				max: 32,
			},
			errorMessage:
				"Username must be at least 5 characters and at most 32 characters",
		},
		notEmpty: {
			errorMessage: "Username cannot be empty",
		},
		isString: {
			errorMessage: "Username must be a string",
		},
	},
	name: {
		notEmpty: true,
	},
	email: {
		notEmpty: true,
	},
	role: {
		notEmpty: true,
	},
	location: {
		notEmpty: true,
	},
	avatar: {
		notEmpty: true,
	},
};

export const createFilterValidationSchema = {
	filter: {
		isString: {
			errorMessage: "Must be a string",
		},
		notEmpty: {
			errorMessage: "Must not be empty",
		},
		isLength: {
			options: {
				min: 3,
				max: 10,
			},
			errorMessage:
				"Filter must be at least 3 characters and at most 10 characters",
		},
	},
};
