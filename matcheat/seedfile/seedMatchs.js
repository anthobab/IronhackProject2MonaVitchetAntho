require("../db/index");
const User = require("../models/User.model");
const users = require("../students.json");
const Match = require("../models/Match.model");
const emptyMatchData = require("../emptyMatchData.json");
// const matchs = emptyMatchData.map((el) => {
//   return {
//     matcher: el.matcher,
//     matchee: el.matchee,
//   };
// });

seed();

async function seed() {
  try {
    await cleanDatabase();
    // const amountOfUsers = await createUsers();
    const amountOfMatchs = await createMatch();
    // console.log(`Created ${amountOfUsers} users`);
    console.log(`Created ${amountOfMatchs.length} matchs`);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

async function cleanDatabase() {
  //   await User.deleteMany();
  await Match.deleteMany();
  console.log("cleaned db");
}

async function createMatch() {
  const allUsers = await User.find();
  const matches = [];
  for (let i = 0; i < emptyMatchData.length; i++) {
    const emptyMatcher = emptyMatchData[i];
    emptyMatcher.matcher = allUsers[i]._id;
    emptyMatcher.date = Date.now();
    console.log(emptyMatcher);
    matches.push(emptyMatcher);
  }
  const matchList = await Match.create(matches);
  return matchList;
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
