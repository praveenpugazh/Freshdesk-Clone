let listContact = `https://newaccount1613468060864.freshdesk.com/api/v2/contacts`;
let table = document.getElementById("table");
let tableHead = document.getElementById("table-head");
let createContact = document.getElementById("create-cont-btn");
let modal = document.getElementById("modal");
let contactCloseBtn = document.getElementById("close-btn");
let saveContactBtn = document.getElementById("save-btn");
let cancelContactBtn = document.getElementById("cancel-btn");
let editBtn = document.getElementById("edit-btn");

fetch(listContact, {
  headers: {
    Authorization: "NGFDTUxDc1NzVFQzeVlNVUFJZTpY",
  },
})
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
    data.forEach((item) => {
      function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(
          newNode,
          referenceNode.nextSibling
        );
      }
      let contactDetails = document.createElement("tr");
      let cThumb = document.createElement("td");
      let smallIcon = document.createElement("div");
      smallIcon.classList.add("small-icon-contact");
      smallIcon.innerText = item.name.substring(0, 1);
      cThumb.appendChild(smallIcon);
      contactDetails.appendChild(cThumb);
      contactDetails.classList.add("contact-details");
      let cName = document.createElement("td");
      cName.innerText = item.name;
      contactDetails.appendChild(cName);
      let cTitle = document.createElement("td");
      if (item.title == undefined) {
        cTitle.innerText = "--";
      } else {
        cTitle.innerText = item.title;
      }
      contactDetails.appendChild(cTitle);
      let cId = document.createElement("td");
      cId.innerText = item.id;
      contactDetails.appendChild(cId);
      let email = document.createElement("td");
      email.innerText = item.email;
      contactDetails.appendChild(email);
      let phone = document.createElement("td");
      phone.innerText = item.phone;
      contactDetails.appendChild(phone);
      let editContact = document.createElement("button");
      editContact.classList.add("edit-btn");
      editContact.innerHTML = "Edit";
      let deleteContact = document.createElement("button");
      deleteContact.classList.add("delete-btn");
      deleteContact.innerHTML = "Delete";
      contactDetails.appendChild(editContact);
      contactDetails.appendChild(deleteContact);
      insertAfter(tableHead, contactDetails);
      editContact.addEventListener("click", () => {
        modal.style.right = 0;
        let contactFullName = document.getElementById("contact-name");
        let contactEmail = document.getElementById("contact-email");
        let contactPhone = document.getElementById("contact-phone");
        contactFullName.value = cName.textContent;
        contactEmail.value = email.textContent;
        contactPhone.value = phone.textContent;
        let newObject = {
          name: contactFullName.value,
          email: contactEmail.value,
          phone: contactPhone.value,
        };
        fetch(`${listContact}/${cId.textContent}`, {
          method: "PUT",
          headers: {
            Authorization: "NGFDTUxDc1NzVFQzeVlNVUFJZTpY",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newObject),
        })
          .then((resp) => resp.json())
          .then((data) => console.log(data));
      });
      deleteContact.addEventListener("click", () => {
        console.log("clicked");
        async function deleteC() {
          let resp = await fetch(`${listContact}/${cId.textContent}`, {
            method: "Delete",
            headers: {
              Authorization: "NGFDTUxDc1NzVFQzeVlNVUFJZTpY",
              "Content-Type": "application/json",
            },
          });
          location.reload();
        }
        deleteC();
      });
    });

    createContact.addEventListener("click", () => {
      modal.style.right = 0;
    });
    contactCloseBtn.addEventListener("click", () => {
      modal.style.right = "100%";
    });
    cancelContactBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.style.right = "100%";
    });

    saveContactBtn.addEventListener("click", (e) => {
      // e.preventDefault();
      console.log(e);
      let contactFullName = document.getElementById("contact-name");
      let contactEmail = document.getElementById("contact-email");
      let contactPhone = document.getElementById("contact-phone");
      let contactTitle = document.getElementById("contact-title");

      let newObject = {
        name: contactFullName.value,
        email: contactEmail.value,
        phone: contactPhone.value,
      };
      console.log(newObject);
      try {
        fetch(listContact, {
          method: "POST",
          headers: {
            Authorization: "NGFDTUxDc1NzVFQzeVlNVUFJZTpY",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newObject),
        });
        alert("contact saved");
        modal.style.right = "100%";
      } catch (err) {
        alert(error);
      }
    });
  });
