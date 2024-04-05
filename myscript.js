var petNameV, ownerNameV, ownerCPFV, consultationDateV, symptomsV;

function readForm() {
    petNameV = document.getElementById("petName").value; 
    ownerNameV = document.getElementById("ownerName").value;
    ownerCPFV = document.getElementById("roll").value;
    consultationDateV = document.getElementById("consultationDate").value;
    symptomsV = document.getElementById("symptoms").value;
    console.log(petNameV, ownerNameV, ownerCPFV, consultationDateV, symptomsV);
}

document.getElementById("insert").onclick = function () {
    readForm();

    firebase
    .database()
    .ref("consultations/" + petNameV)
    .set({
        petName: petNameV,
        ownerName: ownerNameV,
        ownerCPF: ownerCPFV,
        consultationDate: consultationDateV,
        symptoms: symptomsV,
    });
    alert("Consulta Agendada");
    clearForm();
};

document.getElementById("read").onclick = function () {
    readForm();

    firebase
    .database()
    .ref("consultations/" + petNameV)
    .once("value", function (snap) {
        if (snap.exists()) {
            var data = snap.val();
            document.getElementById("petName").value = data.petName;
            document.getElementById("ownerName").value = data.ownerName;
            document.getElementById("roll").value = data.ownerCPF;
            document.getElementById("consultationDate").value = data.consultationDate;
            document.getElementById("symptoms").value = data.symptoms;
        } else {
            alert("Consulta não encontrada.");
            clearForm();
        }
    });
};

document.getElementById("update").onclick = function () {
    readForm();

    firebase
    .database()
    .ref("consultations/" + petNameV)
    .update({
        petName: petNameV,
        ownerName: ownerNameV,
        ownerCPF: ownerCPFV,
        consultationDate: consultationDateV,
        symptoms: symptomsV,
    });
    alert("Consulta Atualizada");
    clearForm();
};

document.getElementById("delete").onclick = function () {
    readForm();

    firebase
    .database()
    .ref("consultations/" + petNameV)
    .remove();
    alert("Consulta Cancelada");
    clearForm();
};

function clearForm() {
    document.getElementById("petName").value = "";
    document.getElementById("ownerName").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("consultationDate").value = "";
    document.getElementById("symptoms").value = "";
}
