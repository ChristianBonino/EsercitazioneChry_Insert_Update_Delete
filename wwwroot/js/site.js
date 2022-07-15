
function insertPerson() {
    var body = {};
    body.Nome = $('#personName').val();
    body.Cognome = $('#personLastName').val();
    $.ajax({
        method: "POST",
        url: "/api/Person/InsertPerson",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(body),
        dataType: "json",
        success: function (data, status) {
            console.log(body);
            console.log(data);
            console.log(status);
            alert(status);
            this.always();
        },
        error: function (error, status) {
            console.log(body);
            console.log(error);
            console.log(status);
            alert(status);
            this.always();
        },
        always: function () { }
    });
};

function getTabellaPersons() {
    $.ajax({
        method: "GET",
        url: "/api/Person/GetAllPersons",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status) {
            console.log(data);

            let tableData = `
                             <table id="Persons" class="table table-striped table-bordered" style="background-color: azure;">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Cognome</th>
                                        <th>ID Univoco</th>
                                        <th>Delete</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>`;

            for (var i = 0; i < data.length; i++) {
                tableData += `<tr>
                                <td> ${data[i].nome} </td>
                                <td> ${data[i].cognome} </td>
                                <td> ${data[i].id} </td>
                                <td id="${data[i].id}" onclick="deletePerson(this)">
                                    <i class="fa fa-trash text-primary" aria-hidden="true"></i> 
                                <td id="${data[i].id}" onclick="showModalForEditPerson(this)">
                                    <i class="fa fa-edit text-primary" aria-hidden="true"></i> </td>
                              </tr>`;
            }
            tableData += `<tbody>`;
            $("#myPerson").append(tableData);
            $("button").hide();
            this.always();
        },
        error: function (error, status) {
            console.log(error);
            console.log(status);
            this.always();
        },
        always: function () { }
    });
};

function showModalForEditPerson(id) {
    nameP = document.createElement("p");
    nameP.style.textAlign = "center";
    nameP.innerText = 'Nome';
    document.getElementById("modal-body").appendChild(nameP);
    nameTextArea = document.createElement("input");
    nameP.appendChild(nameTextArea);

    lastNameP = document.createElement("p");
    lastNameP.style.textAlign = "center";
    lastNameP.innerText = 'Cognome';
    document.getElementById("modal-body").appendChild(lastNameP);
    lastNameTextArea = document.createElement("input");
    lastNameP.appendChild(lastNameTextArea);

    OKbutton = document.createElement("button");
    OKbutton.innerText = "OK";
    OKbutton.id = "modalOKButton";
    OKbutton.classList.add("btn");
    OKbutton.classList.add("btn-success");
    OKbutton.onclick = function () {
        updatePerson(id);
    }
    $(".modal-footer").append(OKbutton);
    CancelButton = document.createElement("button");
    CancelButton.innerText = "Cancel";
    CancelButton.id = "modalCancelButton";
    CancelButton.classList.add("btn");
    CancelButton.classList.add("btn-danger");
    CancelButton.onclick = function () {
        hideModal();
    }
    $(".modal-footer").append(CancelButton);
    document.getElementById("modal").style.display = "block";
};

function hideModal() {
    document.getElementById("modal-header").innerText = "";
    $(".modal-body").empty();
    $(".modal-footer").empty();
    document.getElementById("modal").style.display = "none";
}

function updatePerson(id) {
    var body = {};
    body.ID = $(id).attr("id");
    body.Nome = nameTextArea.value;
    body.Cognome = lastNameTextArea.value;
    $.ajax({
        method: "PATCH",
        url: "/api/Person/UpdatePerson",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(body),
        dataType: "json",
        success: function (data, status) {
            console.log(body);
            console.log(data);
            console.log(status);
            if (data == "200") {
                $("#Persons").remove(); // elimina tabella in view
                getTabellaPersons(); // ripristina tabella in view
                hideModal();
            }
            this.always();
        },
        error: function (error, status) {
            console.log(body);
            console.log(error);
            console.log(status);
            this.always();
        },
        always: function () { }
    });
};

function deletePerson(id) {
    const idPerson = $(id).attr("id");
    $.ajax({
        method: "DELETE",
        url: "/api/Person/DeletePerson?id=" + idPerson,
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        success: function (data, status) {
            console.log(data);
            alert(data);
            if (data == "Record eliminato") {
                $("#Persons").remove(); // elimina tabella in view
                getTabellaPersons(); // ripristina tabella in view
            }
            this.always();
        },
        error: function (error, status) {
            console.log(error);
            console.log(status);
            this.always();
        },
        always: function () { }
    });
};
