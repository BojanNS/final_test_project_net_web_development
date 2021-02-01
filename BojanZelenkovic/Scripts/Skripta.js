$(document).ready(function () {

    // podaci od interesa
    var host = window.location.host;


    var zaposleniEndPoint = "/api/zaposleni";
    var jediniceEndPoint = "/api/jedinice";

    var token = null;

    var headers = {};

    var formAction = "Create";
    var editingId;


    // pocetno stanje
    $("#divReg").hide();
    $("#divPrijava").hide();
    $("#prijavaDiv").hide();
    $("#divPretraga").hide();
    $("#divForma").hide();
    $("#info2").hide();


    $("body").on("click", "#odjavise", odjava); 
    $("body").on("click", "#obrisiZaposleni", obrisiZaposleni); 


    //---------------------------------------------------------
    $("#btnZaposleni").click(function () {
        var reqUrlZaposleni = "http://" + host + zaposleniEndPoint;

        $.getJSON(reqUrlZaposleni, setZaposleniInfo, "json");
    });

    $("#btnLista").click(function () {
        var reqUrlJedinice = "http://" + host + jediniceEndPoint;

        $.getJSON(reqUrlJedinice, setJediniceLista, "json");
    });


    $("#btnPrijavise").click(function (e) {
        $("#divPrijava").show();
        $("#divReg").hide();
        $("#regPrijava").hide();
    });
    $("#btnOdustajanje1").click(function () {
        $("#divPrijava").hide();
        $("#divReg").hide();
        $("#regPrijava").show();
        $("#priEmail").val("");
        $("#priLoz").val("");
    })
    $("#btnOdustajanje").click(function () {
        $("#regEmail").val("");
        $("#regLoz").val("");
        $("#divPrijava").hide();
        $("#divReg").hide();
        $("#regPrijava").show();
    });
    $("#btnOdustajanje2").click(function () {
        $("#zaposleniRola").val("");
        $("#zaposleniImeIPrezime").val("");
        $("#zaposleniGodinaRodjenja").val("");
        $("#zaposleniGodinaZaposlenja").val("");
        $("#zaposleniplata").val("");
    });


    $("#btnZaposleni").trigger("click");
    $("#btnLista").trigger("click");

    $("#btnRegistracija").click(function () {
        $("#divReg").show();
        $("#regPrijava").hide();
    });

    //---------------------------------------------------------

    $("#zaposleniForma").submit(function (e) {
        e.preventDefault();
        if (token) {
            headers.Authorization = "Bearer " + token;
        }

        var zaposlenirola = $("#zaposleniRola").val();
        var zaposleniImeIPrezime = $("#zaposleniImeIPrezime").val();
        var zaposleniGodRodj = $("#zaposleniGodinaRodjenja").val();
        var zaposleniGodinaZaposlenja = $("#zaposleniGodinaZaposlenja").val();
        var zaposleniPlata = $("#zaposleniplata").val();

        var jedinicaId = $("select[name ='selectListRep']").val();

        var sendDataPost = {
            "ImeIPrezime": zaposleniImeIPrezime,
            "Rola": zaposlenirola,
            "GodinaRodjenja": zaposleniGodRodj,
            "GodinaZaposlenja": zaposleniGodinaZaposlenja,
            "Plata": zaposleniPlata,
            "OrganizacionaJedinicaId": jedinicaId
        }
        console.log(sendDataPost);

        var reqUrlPostZaposleni = "http://" + host + zaposleniEndPoint;
        $.ajax({
            url: reqUrlPostZaposleni,
            type: 'POST',
            data: sendDataPost,
            headers: headers,

        }).done(function () {
            alert("Uspesno ste kreirali zaposlenog!")
            $("#btnZaposleni").trigger("click");
            $("#zaposleniRola").val("");
            $("#zaposleniImeIPrezime").val("");
            $("#zaposleniGodinaRodjenja").val("");
            $("#zaposleniGodinaZaposlenja").val("");
            $("#zaposleniplata").val("");

        }).fail(function () {
            alert("Greska prilikom dodavanja!");
        })

    });



    // REGISTRACIJA
    $("#registracija").submit(function (e) {


        e.preventDefault();

        var email = $("#regEmail").val();
        var password = $("#regLoz").val();


        var reqUrlRegister = "http://" + host + "/Api/Account/Register";

        var sendDataRegister = {
            "Email": email,
            "Password": password,
            "ConfirmPassword": password
        };

        console.log(sendDataRegister);
        $.ajax({
            url: reqUrlRegister,
            type: 'POST',
            data: sendDataRegister,

        }).done(function () {
            $("#regEmail").val("");
            $("#regLoz").val("");
            $("#divPrijava").show();
            $("#divReg").hide();
                
        }).fail(function () {
            alert("Nesto nije u redu! Neuspesno registrovanje!");
        })
    });

    // PRIJAVA

    $("#prijava").submit(function (e) {
        e.preventDefault();
        $("#prijavaDiv").empty();

        var userName = $("#priEmail").val();
        var password = $("#priLoz").val();


        var sendDataLogin = {
            "username": userName,
            "password": password,
            "grant_type": "password"
        };

        var reqUrlLogin = "http://" + host + "/Token";
        $.ajax({
            url: reqUrlLogin,
            type: 'POST',
            data: sendDataLogin,

        }).done(function (data) {
            console.log(data);
            token = data.access_token;
            console.log(token);
            $("#divPrijava").hide();
            $("#info2").show();
            $("#prijavaDiv").append("<p id='infoOdjava'>Prijavljeni korisnik: " + data.userName + "</p>");
            $("#prijavaDiv").append("<button class='btn' id='odjavise'>Odjava</button>")
            $("#prijavaDiv").show();
            $("#btnZaposleni").trigger("click");
            $("#divPretraga").show();
            $("#regPrijavaDiv").hide();
            $("#divNajduzaTradicija").show();
            $("#divForma").show();


        }).fail(function () {
            alert("Nesto nije u redu! Neuspesno prijavljivanje!");
        })


    });

    // PRETRAGA
    //------------------------------------------------------------------------------------
    $("#pretragaForma").submit(function (e) {

        e.preventDefault();

        if (token) {
            headers.Authorization = "Bearer " + token;
        }

        var startGodina = +$("#start").val();
        var krajGodina = +$("#kraj").val();

        var sendDataPretraga = {
            "Najmanje": startGodina,
            "Najvise": krajGodina
        };

        $.ajax({
            url: "http://" + host + "/api/pretraga",
            type: 'POST',
            data: sendDataPretraga,
            headers: headers,

        }).done(function (data, status) {
            console.log(data);
            $("#start").val("");
            $("#kraj").val("");

            var zaposleniData = $("#zaposleniData");
            zaposleniData.empty()
            var table;

            if (token) {
                table = $("<table class='zaposleniTabela'><tr style='text-align:center'><th>Ime i prezime</th><th>Rola</th><th>Godina zaposlenja</th><th>Godina rodjenja</th><th>Jedinica</th><th>Plata</th><th></th></tr></table>");
            }
            else {

                table = $("<table class='zaposleniTabela'><tr><th style='text-align:center'>Ime i prezime</th><th>Rola</th><th>Godina zaposlenja</th><th>Jedinica</th></tr></table>");

            }

            for (let i = 0; i < data.length; i++) {

                var row;
                var stringId = data[i].Id.toString();
                if (token) {
                    row = $("<tr><td>" + data[i].ImeIPrezime + "</td><td>" + data[i].Rola + "</td><td>" + data[i].GodinaZaposlenja + "</td><td>" + data[i].GodinaRodjenja + "</td><td>" + data[i].OrganizacionaJedinica.Ime + "</td><td>" + data[i].Plata + "</td><td><button  class='btn btn - link' id='obrisiZaposleni' name=" + stringId + ">Brisanje</button></tr>");
                }
                else {
                    row = $("<tr><td>" + data[i].ImeIPrezime + "</td><td>" + data[i].Rola + "</td><td>" + data[i].GodinaZaposlenja + "</td><td>" + data[i].OrganizacionaJedinica.Ime + "</td></tr>");

                }

                table.append(row);
            }
            zaposleniData.append(table);

        }).fail(function () {
            alert("Greska prilikom pretrage!")
        })

    });

    // ODJAVA 
    function odjava() {
        token = null;
        headers = {};
        $("#prijavaDiv").hide();
        $("#priEmail").val("");
        $("#priLoz").val("");
        $("#regPrijavaDiv").show();
        $("#btnHoteli").trigger("click");
        $("#divForma").hide();
        $("#divPretraga").hide();
        $("#divNajduzaTradicija").hide();
        $("#regPrijava").show();
        $("#btnZaposleni").trigger("click");

    }

    // BRISANJE 

    function obrisiZaposleni() {
        var zaposleniId = this.name;

        if (token) {
            headers.Authorization = "Bearer " + token;
        }

        var reqUrlDeleteZaposleni = "http://" + host + zaposleniEndPoint + "/" + zaposleniId;
        console.log(reqUrlDeleteZaposleni);


        $.ajax({
            url: reqUrlDeleteZaposleni,
            type: 'DELETE',
            headers: {
                "Authorization": headers.Authorization
            },
            success: function () {
                $("#btnZaposleni").trigger("click");
            }

        });

    }


    // select lista

    function setJediniceLista(data, status) {
        if (status === "success") {

            console.log(data);
            var selectList = $("<select style='margin-bottom:20px' name='selectListRep' id='listaLanaca'></select>");

            for (let i = 0; i < data.length; i++) {
                var jedinica = data[i].Id.toString();
                var option = "<option value=" + jedinica + ">" + data[i].Ime + "</option>"
                selectList.append(option);
            }

            $(selectList).insertBefore("#divBefore");

        }

    }



    // tabela zaposleni

    function setZaposleniInfo(data, status) {
        if (status === "success") {
            console.log(data);
            var zaposleniData = $("#zaposleniData");
            zaposleniData.empty();

            var table;

            if (token) {
                table = $("<table class='zaposleniTabela'><tr style='text-align:center'><th>Ime i prezime</th><th>Rola</th><th>Godina zaposlenja</th><th>Godina rodjenja</th><th>Jedinica</th><th>Plata</th><th></th></tr></table>");
            }
            else {

                table = $("<table class='zaposleniTabela'><tr><th style='text-align:center'>Ime i prezime</th><th>Rola</th><th>Godina zaposlenja</th><th>Jedinica</th></tr></table>");

            }

            for (let i = 0; i < data.length; i++) {
                var row;
                var stringId = data[i].Id.toString();
                if (token) {
                    row = $("<tr><td>" + data[i].ImeIPrezime + "</td><td>" + data[i].Rola + "</td><td>" + data[i].GodinaZaposlenja + "</td><td>" + data[i].GodinaRodjenja + "</td><td>" + data[i].OrganizacionaJedinica.Ime + "</td><td>" + data[i].Plata + "</td><td><button  class='btn' id='obrisiZaposleni' name=" + stringId + ">Brisanje</button></tr>");
                }
                else {
                    row = $("<tr><td>" + data[i].ImeIPrezime + "</td><td>" + data[i].Rola + "</td><td>" + data[i].GodinaZaposlenja + "</td><td>" + data[i].OrganizacionaJedinica.Ime + "</td></tr>");

                }
                table.append(row);
            }

            zaposleniData.append(table);
        }
    };
});



