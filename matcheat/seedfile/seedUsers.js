require("dotenv/config");
require("../db/index");
const User = require("../models/User.model");
const users = require("../students.json");

seed();

async function seed() {
  try {
    await cleanDatabase();
    const amountOfUsers = await createUsers();
    console.log(`Created ${amountOfUsers} users`);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

async function cleanDatabase() {
  await User.deleteMany();
}

async function createUsers() {
  const formatedUsers = users.map((el, index) => {
    return {
      username: el.github.username,
      firstName: "none",
      lastName: "none",
      email: el.name + "@ironhack.fr",
      hash: "erjbgvolnrsfd",
      salt: "kjrsbdvkjbnzr",
      availableDates: [Date(2022, 12, 1)],
      // image: {
      //   type: Schema.Types.ObjectId,
      //   ref: "FileModel",
      // },
    };
  });
  console.log(formatedUsers.length);
  const allUSers = await User.create(formatedUsers);
  return allUSers.length;
}

// {
//     "name": "Anthony",
//     "fullname": "Anthony Babin",
//     "morningSunshine": {
//       "date": "2022-11-21T00:00:00.000Z"
//     },
//     "github": {
//       "username": "anthobab",
//       "link": "https://github.com/anthobab"
//     },
//     "projects": [],
//     "status": "student"
//   },
