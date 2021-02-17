let main = document.getElementById("main");
let createTicketBtn = document.getElementById("create-ticket-btn");
let modal = document.getElementById("modal");
let contactCloseBtn = document.getElementById("close-btn");
let saveContactBtn = document.getElementById("save-btn");
let cancelContactBtn = document.getElementById("cancel-btn");

console.log(createTicketBtn);
let api = "https://newaccount1613468060864.freshdesk.com/api/v2/tickets";

fetch(api, {
  headers: {
    Authorization: "NGFDTUxDc1NzVFQzeVlNVUFJZTpY",
  },
})
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
    data.forEach((item) => {
      let ticketDiv = document.createElement("div");
      ticketDiv.classList.add("ticket-div");
      let h3 = document.createElement("h3");
      h3.innerHTML = `${item.subject} <span>#${item.id}</span>`;
      let dueBy = document.createElement("p");
      dueBy.innerHTML = `<span>Due since </span>${item.due_by}`;
      ticketDiv.appendChild(h3);
      ticketDiv.appendChild(dueBy);
      main.appendChild(ticketDiv);
      let contactId = `${item.requester_id}`;
      async function fetchContact() {
        let contactApi = `https://newaccount1613468060864.freshdesk.com/api/v2/contacts/${contactId}`;
        let resp = await fetch(contactApi, {
          headers: {
            Authorization: "NGFDTUxDc1NzVFQzeVlNVUFJZTpY",
          },
        });
        let contactData = await resp.json();
        // console.log(contactData);
        let createdBy = document.createElement("p");
        createdBy.innerText = contactData.name;
        let smallIconDiv = document.createElement("div");
        smallIconDiv.classList.add("small-icon-div");
        let smallIcon = document.createElement("div");
        smallIcon.classList.add("small-icon");
        smallIcon.innerText = contactData.name.substring(0, 1);
        smallIconDiv.append(smallIcon);
        smallIconDiv.append(createdBy);
        ticketDiv.prepend(smallIconDiv);
        let priority = document.createElement("p");
        priority.classList.add("priority");
        if (item.priority == 1) {
          priority.innerText = "low";
        } else if (item.priority == 2) {
          priority.innerText = "medium";
        } else if (item.priority == 3) {
          priority.innerText = "high";
        } else if (item.priority == 4) {
          priority.innerText = "urgent";
        }
        let prioritySelect = document.createElement("select");
        let priorityOptions = "";
        let lowhighArr = ["low", "medium", "high", "urgent"];
        for (i = 0; i < 4; i++) {
          if (priority.innerText == lowhighArr[i]) {
            priorityOptions += `<option selected>${lowhighArr[i]}</option>`;
          } else {
            priorityOptions += `<option>${lowhighArr[i]}</option>`;
            priorityOptions.value = `${lowhighArr[i]}`;
          }
        }
        prioritySelect.innerHTML = priorityOptions;
        ticketDiv.append(prioritySelect);
        priority.classList.add("status");
        let status = document.createElement("p");
        if (item.status == 2) {
          status.innerText = "open";
        } else if (item.status == 3) {
          status.innerText = "pending";
        } else if (item.status == 4) {
          status.innerText = "resolved";
        } else if (item.status == 5) {
          status.innerText = "closed";
          ticketDiv.style.backgroundColor = "rgba(0, 0, 1, 0.14)";
          ticketDiv.style.color = "rgba(0, 0, 1, 0.4)";
        }
        let statusSelect = document.createElement("select");
        let statusOptions = "";
        let statusArr = ["open", "pending", "resolved", "closed"];
        for (i = 0; i < 4; i++) {
          if (status.innerText == statusArr[i]) {
            statusOptions += `<option selected>${statusArr[i]}</option>`;
          } else {
            statusOptions += `<option>${statusArr[i]}</option>`;
            statusOptions.value = `${statusArr[i]}`;
          }
        }
        statusSelect.innerHTML = statusOptions;
        ticketDiv.append(statusSelect);
        if (item.status == 2) {
          status.innerText = "open";
        } else if (item.status == 3) {
          status.innerText = "pending";
        } else if (item.status == 4) {
          status.innerText = "resolved";
        } else if (item.status == 5) {
          status.innerText = "closed";
          ticketDiv.style.backgroundColor = "rgba(0, 0, 1, 0.14)";
          ticketDiv.style.color = "rgba(0, 0, 1, 0.4)";
          prioritySelect.disabled = true;
        }
        prioritySelect.addEventListener("change", () => {
          let newPriority = lowhighArr.indexOf(prioritySelect.value) + 1;
          let newobj = {
            priority: newPriority,
          };
          console.log(JSON.stringify(newobj));
          async function fetchApi() {
            let resp = await fetch(`${api}/${item.id}`, {
              method: "PUT",
              headers: {
                Authorization: "NGFDTUxDc1NzVFQzeVlNVUFJZTpY",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newobj),
            });
            alert("priority updated");
            location.reload();
          }
          fetchApi();
        });
        statusSelect.addEventListener("change", () => {
          let newStatus = statusArr.indexOf(statusSelect.value) + 2;
          let newobj = {
            status: newStatus,
            // status: status.innerText,
          };
          console.log(JSON.stringify(newobj));
          async function fetchApis() {
            let res = await fetch(`${api}/${item.id}`, {
              method: "PUT",
              headers: {
                Authorization: "NGFDTUxDc1NzVFQzeVlNVUFJZTpY",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newobj),
            });
            alert("status updated");
            location.reload();
          }
          fetchApis();
        });
      }
      fetchContact();
      createTicketBtn.addEventListener("click", () => {
        modal.style.right = 0;
      });
      contactCloseBtn.addEventListener("click", () => {
        modal.style.right = "100%";
      });
      cancelContactBtn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.right = "100%";
      });
      saveContactBtn.disabled = true;
    });
  });
