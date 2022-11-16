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
  let emptyMatcher;
  for (let i = 0; i < emptyMatchData.length; i++) {
    emptyMatcher = emptyMatchData[i];
    emptyMatcher.matcher = allUsers[emptyMatcher.matcher]._id;
    emptyMatcher.matchee = allUsers[emptyMatcher.matchee]._id;
    emptyMatcher.date = Date.now();
    matches.push(emptyMatcher);

    //if (i % 2 === 0) {
    //  emptyMatcher = emptyMatchData[i];
    //  emptyMatcher.matcher = allUsers[i];
    //  emptyMatcher.date = Date.now();
    //  matches.push(emptyMatcher);
    //} else if (i % 2 !== 0) {
    //  emptyMatcher.matchee = allUsers[i];
    //  emptyMatcher.date = Date.now();
    //  matches.push(emptyMatcher);
    //}
    console.log(emptyMatcher);
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
