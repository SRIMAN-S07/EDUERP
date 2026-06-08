const axios = require("axios");

const names = [

  "Dr. Arun Kumar",
  "Dr. Vignesh",
  "Prof. Karthik",
  "Dr. Surya",
  "Prof. Naveen",
  "Dr. Dinesh",
  "Prof. Sathish",
  "Dr. Gokul",
  "Prof. Hari",
  "Dr. Rahul",

  "Dr. Priya",
  "Prof. Anitha",
  "Dr. Keerthana",
  "Prof. Divya",
  "Dr. Nivetha",
  "Prof. Swetha",
  "Dr. Harini",
  "Prof. Ramya",
  "Dr. Pavithra",
  "Prof. Deepika"

];

const departments = [
  "CSC",
  "BCA",
  "BTH"
];

const roles = [
  "Professor",
  "HOD",
  "Lab Assistant"
];

async function addStaff() {

  for (let i = 1; i <= 30; i++) {

    const staff = {

      name:
        names[
          Math.floor(
            Math.random() *
            names.length
          )
        ] + " " + i,

      department:
        departments[
          Math.floor(
            Math.random() *
            departments.length
          )
        ],

      role:
        roles[
          Math.floor(
            Math.random() *
            roles.length
          )
        ],

      year: "23",

      type: "S"

    };

    await axios.post(
      "http://localhost:5000/staff",
      staff
    );

    console.log(
      `${staff.name} Added`
    );

  }

}

addStaff();