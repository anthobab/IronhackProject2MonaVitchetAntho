/**              Variable declarations                 */

const nextBtn = document.getElementById("nextBtn");
const matchBtn = document.getElementById("matchBtn");
const matchCardContainer = document.getElementById("matchCardContainer");
const matchCardzone = document.getElementById("matchCard");
const matchCardTemplate = document.getElementById("matchCardTemplate");

/*Init : list the available users
for available dates
which doesn't have match document with my user name*/
matchCardContainer.innerHTML = "";

/*                      Functions                      */

function initCards(allCards) {
  var newCards = matchCardContainer.querySelectorAll(
    ".match-card:not(.removed)"
  );
  // console.log("number of new cards", newCards.length);
  newCards.forEach(function (card, index) {
    card.style.zIndex = allCards.length - index;
    card.style.transform =
      "scale(" + (20 - index) / 20 + ") translateY(-" + 30 * index + "px)";
    card.style.opacity = (10 - index) / 10;
  });

  matchCardzone.classList.add("loaded");
}

function addHammer(allCards) {
  allCards.forEach(function (el) {
    var hammertime = new Hammer(el);

    hammertime.on("pan", function (event) {
      el.classList.add("moving");
    });

    hammertime.on("pan", function (event) {
      if (event.deltaX === 0) return;
      if (event.center.x === 0 && event.center.y === 0) return;

      matchCardzone.classList.toggle("swipe_love", event.deltaX > 0);
      matchCardzone.classList.toggle("swipe_nope", event.deltaX < 0);

      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;

      event.target.style.transform =
        "translate(" +
        event.deltaX +
        "px, " +
        event.deltaY +
        "px) rotate(" +
        rotate +
        "deg)";
    });

    hammertime.on("panend", async function (event) {
      el.classList.remove("moving");
      matchCardzone.classList.remove("swipe_love");
      matchCardzone.classList.remove("swipe_nope");

      var moveOutWidth = document.body.clientWidth;
      var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

      event.target.classList.toggle("removed", !keep);

      if (keep) {
        event.target.style.transform = "";
      } else {
        var endX = Math.max(
          Math.abs(event.velocityX) * moveOutWidth,
          moveOutWidth
        );
        var toX = event.deltaX > 0 ? endX : -endX;
        var endY = Math.abs(event.velocityY) * moveOutWidth;
        var toY = event.deltaY > 0 ? endY : -endY;
        var xMulti = event.deltaX * 0.03;
        var yMulti = event.deltaY / 80;
        var rotate = xMulti * yMulti;

        await loveNopeAction(event.deltaX > 0, event.target);

        event.target.style.transform =
          "translate(" +
          toX +
          "px, " +
          (toY + event.deltaY) +
          "px) rotate(" +
          rotate +
          "deg)";

        initCards(allCards);
      }
    });
  });
}

/** What happen if love : */
function createButtonListener(love, allCards) {
  return async function (event) {
    var cards = document.querySelectorAll(".match-card:not(.removed)");
    var moveOutWidth = document.body.clientWidth * 1.5;

    if (!cards.length) return false;

    var card = cards[0];

    card.classList.add("removed");

    if (love) {
      card.style.transform =
        "translate(" + moveOutWidth + "px, -100px) rotate(-30deg)";
    } else {
      card.style.transform =
        "translate(-" + moveOutWidth + "px, -100px) rotate(30deg)";
    }

    await loveNopeAction(love, card);

    initCards(allCards);

    event.preventDefault();
  };
}

async function loveNopeAction(love, card) {
  console.log(
    "Date : is ",
    Date(card.querySelector(".dates span").textContent),
    card.getAttribute("data-id")
  );
  if (love) {
    //action if loved

    const matchStatus = await axios.post(
      process.env.SERVER_URL + "/matchAxios/createMatch",
      {
        matchee: `${card.getAttribute("data-id")}`,
        date: `${Date(card.querySelector(".dates span").textContent)}`,
      }
    );

    console.log("loved", card, matchStatus);
  } else {
    console.log("noped", card);
  }
}

var nopeListener = createButtonListener(
  false,
  matchCardContainer.querySelectorAll(".match-card")
);
var loveListener = createButtonListener(
  true,
  matchCardContainer.querySelectorAll(".match-card")
);

async function listAvailableUsers(event) {
  // preventDefault() allow us to not send the information directly to the server

  if (event !== undefined) {
    event.preventDefault();

    const { data } = await axios.get(
      process.env.SERVER_URL + "/matchAxios/findAllUsers"
    );
    console.log("\n \n axios get data \n \n", data);
    console.log(data);
    return data;
  }
}

async function AddCards(event) {
  console.log("start of AddCards function ");
  const users = await listAvailableUsers(event);
  /******** Create cards : */
  console.log(users);
  users.forEach((userData, index) => {
    //clone card temmplate
    const matchCardDomClone =
      matchCardTemplate.content.firstElementChild.cloneNode(true); // firstElementChild allow to add event listener before append
    // const matchCardDomClone = matchCardTemplate.content.cloneNode(true);
    if (userData.image) {
      matchCardDomClone.querySelector(".pic img").src = userData.image.url;
    }
    matchCardDomClone.querySelector(".username span.card-data").textContent =
      userData.username;

    matchCardDomClone.querySelector(
      ".name span.card-data.first-name"
    ).textContent = userData.firstName;

    matchCardDomClone.querySelector(
      ".name span.card-data.last-name"
    ).textContent = userData.lastName;

    matchCardDomClone.querySelector(".age span.card-data").textContent =
      userData.age;

    matchCardDomClone.querySelector(".dates span.card-data").textContent =
      userData.availableDates;

    matchCardDomClone.dataset.id = userData._id;

    matchCardContainer.appendChild(matchCardDomClone);
  });
}

async function AddCardsAndinit(event) {
  await AddCards(event);
  const allCards = matchCardContainer.querySelectorAll(".match-card");
  initCards(allCards);
  addHammer(allCards);
}

/**
 * Event listeners
 */

window.addEventListener("load", AddCardsAndinit);

// nextBtn.addEventListener("click", async (event) => {});

nextBtn.addEventListener("click", nopeListener);
matchBtn.addEventListener("click", loveListener);

/*************** Swipe function  ****************************************/

//getImageBtn.addEventListener("click", async () => {
//  const { data } = await axios({
//    method: "get",
//    baseURL: process.env.SERVER_URL + "/image",
//  });
//
//  console.log(data);
//
//  const img = document.createElement("img");
//  img.src = data.image;
//
//  document.body.append(img);
//});
//
//sayHiBtn.addEventListener("click", async () => {
//  const { data } = await axios({
//    method: "post",
//    baseURL: process.env.SERVER_URL + "/message",
//    data: { msg: "hello" },
//  });
//
//  console.log(data);
//});
//
////   const newlyCreatedPhone = await axios.(
////     process.env.SERVER_URL + "/phone",
////     phone
////   );
//
////   const name = createForm.querySelector("input[name='name']").value;
////   const price = createForm.querySelector("input[name='price']").value;

//   const phone = { name, price };

//   console.log(newlyCreatedPhone);
//   await fetchPhones();
// }

// async function handleEdit(event) {
//   event.preventDefault();
//   const name = editName.value;
//   const price = editPrice.value;
//   const id = editForm.dataset.id;
//   const phone = { name: name, price: price };
//   console.log(id);
//   const url = `http://localhost:3000/phone/${id}`;
//   try {
//     // const updatedPhone = await axios({
//     // 	method: "PATCH",
//     // 	baseURL: url,
//     // 	data: phone,
//     // })
//     const { data } = await axios.patch(url, phone);

//     await axios({
//       method: "PATCH",
//     });

//     console.log(data);
//     await fetchPhones();
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function fetchPhones() {
//   const { data } = await axios.get(process.env.SERVER_URL + "/phone");
//   listPhones.innerHTML = "";
//   data.forEach((phone) => {
//     const li = document.createElement("li");
//     li.innerHTML = `<span class="name">${phone.name}</span> cost
//      $<span class="price">${phone.price}</span>
//      <span class="edit"><i data-id="${phone._id}" class="fa-solid fa-pen-to-square"></i></span>
//      <span class="delete"><i class="fa-solid fa-trash"></i></span>`;
//     // We might need the id later on (To update or delete !)
//     // Storing it inside of a dataset.
//     li.dataset.id = phone._id;
//     const edit = li.querySelector("span.edit");
//     edit.addEventListener("click", addEditDataToForm);

//     const deleteButton = li.querySelector(".delete");
//     deleteButton.addEventListener("click", handleDelete);
//     listPhones.append(li);
//   });
// }

// function addEditDataToForm({ target }) {
//   const li = target.closest("li");
//   const name = li.querySelector(".name");
//   const price = li.querySelector(".price");
//   editName.value = name.textContent;
//   editPrice.value = price.textContent;
//   editForm.dataset.id = li.dataset.id;
// }

// async function handleDelete({ target }) {
//   const li = target.closest("li");
//   const id = li.dataset.id;
//   await axios.delete(`http://localhost:3000/phone/${id}`);
//   await fetchPhones();
// }
