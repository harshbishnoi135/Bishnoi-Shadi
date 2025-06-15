import bcrypt from "bcryptjs"; // Importing bcryptjs for password hashing

const users = [
    {
        email: "admin@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        fullProfile: {
            firstame: "Admin",
            lastName: "User", 
            gender: "M",
            dateOfBirth: new Date("1990-01-01"),
            height: 175,
            city: "New York",
            state: "NY",
            country: "USA",
            phone: "123-456-7890",
            maritalStatus: "Single",
            occupation: "Software Engineer",
            annualIncome: 120000,
            lastGraduatingCollege: "Stanford University",
            fieldOfStudy: "Computer Science",
            fatherGotra: "Kashyap",
            motherGotra: "Bharadwaj",
            grandmotherGotra: "Vashisht",
            motherMotherGotra: "Gautam",
            fatherOccupation: "Business Owner",
            motherOccupation: "Professor"
        },
        isAdmin: true,
        membership: [{
            plan: "Premium",
            buyDate: new Date("2023-01-01")
        }]
    },
    {
        email: "testuser1@gmail.com", 
        password: bcrypt.hashSync("123456", 10),
        fullProfile: {
            firstame: "Test",
            lastName: "User",
            gender: "F",
            dateOfBirth: new Date("1995-05-15"),
            height: 165,
            city: "Los Angeles",
            state: "CA", 
            country: "USA",
            phone: "987-654-3210",
            maritalStatus: "Single",
            occupation: "Doctor",
            annualIncome: 150000,
            lastGraduatingCollege: "UCLA Medical School",
            fieldOfStudy: "Medicine",
            fatherGotra: "Sandilya",
            motherGotra: "Atri",
            grandmotherGotra: "Kashyap",
            motherMotherGotra: "Bharadwaj",
            fatherOccupation: "Engineer",
            motherOccupation: "Teacher"
        },
        isAdmin: false,
        membership: [{
            plan: "Essential",
            buyDate: new Date("2023-06-15")
        }]
    },
];

export default users;