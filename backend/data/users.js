import bcrypt from "bcryptjs"; // Importing bcryptjs for password hashing

const users = [
    {
        name: "Admin User",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "Test User 1",
        email: "testuser1@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    },
    {
        name: "Test User 2",
        email: "testuser2@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
];

export default users;