const table = document.querySelector(".datatable-content tbody");

function populateTable() {
  table.innerHTML = "";
  for (let data of dataTableData) {
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
}

populateTable();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var state = {
  querySet: tableData,

  page: 1,
  rows: 5,
  window: 5,
};

buildTable();

function pagination(querySet, page, rows) {
  var trimStart = (page - 1) * rows;
  var trimEnd = trimStart + rows;

  var trimmedData = querySet.slice(trimStart, trimEnd);

  var pages = Math.round(querySet.length / rows);

  return {
    querySet: trimmedData,
    pages: pages,
  };
}

function pageButtons(pages) {
  var wrapper = document.getElementById("pagination-wrapper");

  wrapper.innerHTML = ``;
  console.log("Pages:", pages);

  var maxLeft = state.page - Math.floor(state.window / 2);
  var maxRight = state.page + Math.floor(state.window / 2);

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

  for (var page = maxLeft; page <= maxRight; page++) {
    wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info">${page}</button>`;
  }

  if (state.page != 1) {
    wrapper.innerHTML =
      `<button value=${1} class="page btn btn-sm btn-info">&#171; First</button>` +
      wrapper.innerHTML;
  }

  if (state.page != pages) {
    wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info">Last &#187;</button>`;
  }

  $(".page").on("click", function () {
    $("#table-body").empty();

    state.page = Number($(this).val());

    buildTable();
  });
}

function buildTable() {
  var table = $("#table-body");

  var data = pagination(state.querySet, state.page, state.rows);
  var myList = data.querySet;
  console.log("myList", myList);

  for (let i = 0; i < myList.length; i++) {
    //Keep in mind we are using "Template Litterals to create rows"
    var row = `<tr>
                <td>${myList[i].rank}</td>
                <td>${myList[i].first_name}</td>
                <td>${myList[i].last_name}</td>
                `;
    table.append(row);
  }

  pageButtons(data.pages);
}
