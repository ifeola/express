import express from "express";
import { query, validationResult, body, matchedData } from "express-validator";

const app = express();
app.use(express.json());

// Middleware
const middleware = (request, response, next) => {
	const { method, url } = request;
	console.log(method, url);
	next();
};

const PORT = process.env.PORT || 3000;

const users = [
	{
		id: "user-01a",
		name: "Aarav Patel",
		email: "aarav.patel@example.com",
		username: "aaravp",
		role: "Software Engineer",
		location: "Mumbai, India",
		avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Aarav",
	},
	{
		id: "user-02b",
		name: "Nia Johnson",
		email: "nia_johnson@example.com",
		username: "niaj",
		role: "Data Scientist",
		location: "Toronto, Canada",
		avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Nia",
	},
	{
		id: "user-03c",
		name: "Jamal Al-Farsi",
		email: "jamal.a@example.com",
		username: "jamalf",
		role: "UX Designer",
		location: "Dubai, UAE",
		avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Jamal",
	},
	{
		id: "user-04d",
		name: "Yuki Tanaka",
		email: "yuki.tanaka@example.co.jp",
		username: "yukit",
		role: "Product Manager",
		location: "Tokyo, Japan",
		avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Yuki",
	},
	{
		id: "user-05e",
		name: "Fatima Khan",
		email: "fatima.khan@example.com",
		username: "fatimak",
		role: "Marketing Specialist",
		location: "Lahore, Pakistan",
		avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Fatima",
	},
	{
		id: "user-06f",
		name: "André Silva",
		email: "andre.silva@example.br",
		username: "andres",
		role: "Graphic Designer",
		location: "São Paulo, Brazil",
		avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Andre",
	},
	{
		id: "user-07g",
		name: "Leilani Wong",
		email: "leilani.w@example.com",
		username: "leilaniw",
		role: "Student",
		location: "Honolulu, USA",
		avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Leilani",
	},
	{
		id: "user-08h",
		name: "Malik Williams",
		email: "malik.w@example.com",
		username: "malikw",
		role: "DevOps Engineer",
		location: "London, UK",
		avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Malik",
	},
	{
		id: "user-09i",
		name: "Elena Rodríguez",
		email: "elena.rodriguez@example.es",
		username: "elenar",
		role: "Journalist",
		location: "Madrid, Spain",
		avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Elena",
	},
	{
		id: "user-10j",
		name: "Tunde Okafor",
		email: "tunde.o@example.ng",
		username: "tundeo",
		role: "Entrepreneur",
		location: "Lagos, Nigeria",
		avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Tunde",
	},
];

app.get("/", (request, response) => {
	response.status(200).send("Welcome to the User API");
});

// Get user by User ID
app.get("/api/users/:id", (request, response) => {
	let userId = request.params.id;
	// let parsedUserId = parseInt(userId);
	if (!userId) {
		return response.send(`You've just entered an invalid userID - ${userId}`);
	}
	let user = users.find((user, index) => userId === user.id);
	if (!user) return response.send("User not found!");

	return response.status(200).send(user);
});

// Using query
app.get(
	"/api/users",
	query("filter")
		.isString()
		.notEmpty()
		.withMessage("Must not be exmpty")
		.isLength({ min: 3, max: 10 })
		.withMessage("Must be at least 3 characters and at most 10"),
	(request, response) => {
		const result = validationResult(request);
		console.log(result);
		const {
			query: { filter, value },
		} = request;

		if (filter && value) {
			return response.send(
				users.filter((user) => user[filter].includes(value))
			);
		}

		return response.send(users);
	}
);

// Post Request
// Making Post Requests by using thunder client
app.post(
	"/api/users",
	body("username")
		.notEmpty()
		.withMessage("Username cannit be empty")
		.isLength({ min: 5, max: 32 })
		.withMessage(
			"Username must be at least 5 characters and at most 32 characters"
		)
		.isString()
		.withMessage("Must be a string"),
	(request, response) => {
		const result = validationResult(request);
		console.log(result);

		if (!result.isEmpty())
			return response.status(400).send({ errors: result.array() });

		const data = matchedData(request);
		const newUser = { id: users[users.length - 1].id + 1, ...data };
		users.push(newUser);
		return response.status(201).send(users);
	}
);

// Put Request
app.put("/api/users/:id", (request, response) => {
	const {
		body,
		params: { id },
	} = request;

	const userIndex = users.findIndex((user) => user.id === id);
	if (userIndex === -1) return response.status(404);
	users[userIndex] = { id: id, ...body };
	return response.sendStatus(200);
});

// Patch Request
app.patch("/api/users/:id", (request, response) => {
	const {
		body,
		params: { id },
	} = request;

	const userIndex = users.findIndex((user) => {
		return user.id === id;
	});

	users[userIndex] = { ...users[userIndex], ...body };
	return response.sendStatus(201);
});

// Delete Request
app.delete("/api/users/:id", (request, response) => {
	const {
		params: { id },
	} = request;

	const userIndex = users.findIndex((user) => user.id === id);
	if (userIndex === -1) return response.sendStatus(404);
	users.splice(userIndex, 1);
	return response.sendStatus(200);
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
