/**
 * Variable declarations
 */
const nextBtn = document.getElementById("nextBtn");
const matchBtn = document.getElementById("matchBtn");

const matchCard = document.getElementById("matchCard");

const matchPic = document.getElementById("matchPic");

const matchPseudo = document.getElementById("matchPseudo");
const matchFirstName = document.getElementById("matchFirstName");
const matchLastName = document.getElementById("matchLastName");
const matchAge = document.getElementById("matchAge");
const matchDates = document.getElementById("matchDates");

/*Init : list the available users
for available dates
which doesn't have match document with my user name*/

/**
 * Event listeners
 */

nextBtn.addEventListener("submit", handleCreate);
matchBtn.addEventListener("submit", handleEdit);
fetchPhoneButton.addEventListener("click", fetchPhones);

async function listAvailableUsers(event) {
  // preventDefault() allow us to not send the information directly to the server
  // Instead we will send an AJAX request that will do the job for us :)
  if (event === undefined) {
    event.preventDefault();
  }
  axios.get("/");
}

getImageBtn.addEventListener("click", async () => {
  const { data } = await axios({
    method: "get",
    baseURL: "http://localhost:3000/image",
  });

  console.log(data);

  const img = document.createElement("img");
  img.src = data.image;

  document.body.append(img);
});

sayHiBtn.addEventListener("click", async () => {
  const { data } = await axios({
    method: "post",
    baseURL: "http://localhost:3000/message",
    data: { msg: "hello" },
  });

  console.log(data);
});

//   const newlyCreatedPhone = await axios.(
//     "http://localhost:3000/phone",
//     phone
//   );

//   const name = createForm.querySelector("input[name='name']").value;
//   const price = createForm.querySelector("input[name='price']").value;

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
//   const { data } = await axios.get("http://localhost:3000/phone");
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
