import bcrypt from "bcryptjs"; // Importing bcryptjs for password hashing

const users = [
    {
        email: "admin@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        firstame: "Admin",
        lastName: "User",
        gender: "M",
        dateOfBirth: new Date("1990-01-01"),
        age: 33,
        height: 175,
        city: "New York",
        state: "NY", 
        country: "USA",
        phone: "123-456-7890",
        maritalStatus: "Single"
    },
    {
        email: "testuser1@gmail.com", 
        password: bcrypt.hashSync("123456", 10),
        firstame: "Test",
        lastName: "User",
        gender: "F",
        dateOfBirth: new Date("1995-05-15"),
        age: 28,
        height: 165,
        city: "Los Angeles",
        state: "CA",
        country: "USA", 
        phone: "987-654-3210",
        maritalStatus: "Single"
    },
];

export default users;