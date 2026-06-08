const axios = require("axios");

const names = [

  "Arun",
  "Vignesh",
  "Karthik",
  "Sanjay",
  "Rahul",
  "Hari",
  "Dinesh",
  "Naveen",
  "Gokul",
  "Sathish",

  "Surya",
  "Madhan",
  "Kavin",
  "Jeeva",
  "Lokesh",
  "Manoj",
  "Bharath",
  "Ashwin",
  "Ajith",
  "Praveen"

];

const departments = [
  "CSC",
  "BCA",
  "BTH"
];

async function addStudents() {

  for (let i = 1; i <= 100; i++) {

    const student = {

      name:
        names[
          Math.floor(
            Math.random() *
            names.length
          )
        ] + " " + i,

      age:
        Math.floor(
          Math.random() * 4
        ) + 18,

      department:
        departments[
          Math.floor(
            Math.random() *
            departments.length
          )
        ],

      year: "23",

      type:
        i % 2 === 0
          ? "U"
          : "P"

    };

    await axios.post(
      "http://localhost:5000/students",
      student
    );

    console.log(
      `${student.name} Added`
    );

  }

}

addStudents();