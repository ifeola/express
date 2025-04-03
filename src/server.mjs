import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

const users = [
	{
		id: 101,
		username: "jdoe",
		first_name: "John",
		last_name: "Doe",
		email: "john.doe@example.com",
		is_active: true,
		role: "admin",
		created_at: "2023-05-15T08:30:00Z",
		last_login: "2024-05-20T10:15:22Z",
	},
	{
		id: 102,
		username: "asmith",
		first_name: "Alice",
		last_name: "Smith",
		email: "alice.s@sample.net",
		is_active: true,
		role: "editor",
		created_at: "2023-06-20T11:00:00Z",
		last_login: "2024-05-21T09:05:10Z",
	},
	{
		id: 103,
		username: "bwilliams",
		first_name: "Bob",
		last_name: "Williams",
		email: "bob.williams@email.org",
		is_active: false,
		role: "viewer",
		created_at: "2023-07-01T14:45:10Z",
		last_login: "2024-03-10T18:20:05Z",
	},
	{
		id: 104,
		username: "cjohnson",
		first_name: "Charlie",
		last_name: "Johnson",
		email: "charlie.j@domain.com",
		is_active: true,
		role: "member",
		created_at: "2024-01-10T09:00:00Z",
		last_login: "2024-05-18T15:30:45Z",
	},
	{
		id: 105,
		username: "davis_d",
		first_name: "Diana",
		last_name: "Davis",
		email: "d.davis@sample.com",
		is_active: true,
		role: "member",
		created_at: "2024-02-28T16:22:00Z",
		last_login: null,
	},
];

app.get("/", (request, response) => {
	response.send("Hello World! I'm learning Express.js");
});

app.get("/api/users", (request, response) => {
	response.status(201).send(users);
});

app.get("/api/users/:id", (request, response) => {
	const userId = request.params.id;
	const parsedUserId = parseInt(userId);
	console.log(parsedUserId);

	if (isNaN(parsedUserId)) return response.status(401).send("Invalid User ID");

	const user = users.find((user) => parsedUserId === user.id);
	if (!user) return response.status(401).send("Error: User not found!");

	return response.send(user);
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
