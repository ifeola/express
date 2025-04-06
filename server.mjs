import express from "express";

const app = express();

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
app.get("/api/users", (request, response) => {
	console.log(request.query);

	const {
		query: { filter, value },
	} = request;

	if (filter && value) {
		return response.send(users.filter((user) => user[filter].includes(value)));
	}

	return response.send(users);
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
