let state = {
  querySet: dataTableDataPage1,
  page: 1,
  window: 3,
};

const table = document.querySelector(".datatable-content tbody");

function buildTable() {
  table.innerHTML = "";
  pagination(state.page);

  for (let data of state.querySet.result) {
    let row = table.insertRow(-1);
    let user = row.insertCell(0);
    user.innerHTML = data.user;

    let app = row.insertCell(1);
    app.innerHTML = data.app;

    let role = row.insertCell(2);
    role.innerHTML = data.role;

    let create_date = row.insertCell(3);
    create_date.innerHTML = data.create_date;

    let update_date = row.insertCell(3);
    update_date.innerHTML = data.update_date;
  }
  pageButtons(state.querySet.pages);
}

buildTable();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function pagination(page) {
  const dataTableDataPageList = [
    dataTableDataPage1,
    dataTableDataPage2,
    dataTableDataPage3,
    dataTableDataPage4,
    dataTableDataPage5,
  ];

  for (ele of dataTableDataPageList) {
    if (page === ele.page) {
      state.querySet = ele;
      return;
    }
  }
  return;
}

function pageButtons(pages) {
  const wrapper = document.getElementById("datatable-pagination");

  wrapper.innerHTML = ``;

  let maxLeft = state.page - Math.floor(state.window / 2);
  let maxRight = state.page + Math.floor(state.window / 2);

  if (maxLeft < 1) {
    maxLeft = 1;
    maxRight = state.window;
  }

  if (maxRight > pages) {
    maxLeft = pages - (state.window - 1);

    if (maxLeft < 1) {
      maxLeft = 1;
    }
    maxRight = pages;
  }

  for (let page = maxLeft; page <= maxRight; page++) {
    wrapper.innerHTML += `<button value=${page} class="page">${page}</button>`;
  }

  if (state.page != 1) {
    wrapper.innerHTML =
      `<button value=${1} class="page">First</button>` + wrapper.innerHTML;
  }

  if (state.page != pages) {
    wrapper.innerHTML += `<button value=${pages} class="page">Last</button>`;
  }

  const pageElements = document.querySelectorAll(".page");
  for (const pageElement of pageElements) {
    pageElement.addEventListener("click", function (event) {
      const eventPage = Number(event.currentTarget.value);
      state.page = eventPage;
      // console.log("state.page_init", state.querySet.result);
      pagination(state.page);
      // console.log("state.page_after", state.querySet.result);
      console.log(state.page);
      table.innerHTML = "";
      buildTable();
    });
  }
}
