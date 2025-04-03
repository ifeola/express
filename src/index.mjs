import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;
const mockUsers = [
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

// Localhost:3000 - base route
app.get("/", (req, res) => {
	res.send("Hello World!");
});

// localhost:3000/api/users - Route to get users
app.get("/api/users", (request, response) => {
	response.send(mockUsers);
});

// localhost:3000/api/products - Route to get products
app.get("/api/products", (request, response) => {
	response.send([
		{
			id: 201,
			name: "Laptop",
			category: "Electronics",
			price: 999.99,
			in_stock: true,
			created_at: "2024-01-15T10:00:00Z",
			last_updated: "2024-05-20T12:30:00Z",
		},
		{
			id: 202,
			name: "Smartphone",
			category: "Electronics",
			price: 699.99,
			in_stock: false,
			created_at: "2024-02-01T11:00:00Z",
			last_updated: "2024-05-21T09:05:10Z",
		},
	]);
});

// Route Parameters
// localhost:3000/api/users/:id - Route to get user by ID
app.get("/api/users/:id", (request, response) => {
	console.log(request.params);
	const parsedID = parseInt(request.params.id);
	console.log(parsedID);

	if (isNaN(parsedID)) {
		return response.status(400).send("Invalid ID");
	}

	const user = mockUsers.find((user) => user.id === parsedID);
	if (!user) {
		return response.status(404).send("User not found");
	}
	return response.send(user);
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

// Localhost:3000 - base route
// localhost:3000/user - user route
// localhost:3000/products - products route

// HTTP request methods
/* GET - Read data
POST - Create data
PUT - Update data
DELETE - Delete data
PATCH - Update part of data
OPTIONS - Get allowed methods */
