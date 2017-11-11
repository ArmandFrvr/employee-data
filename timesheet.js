// Firebase
var config = {
  apiKey: "AIzaSyCopT6ktqSMasmgzxfZqY6kZEMG-rO1OGo",
  authDomain: "employee-data-4e28d.firebaseapp.com",
  databaseURL: "https://employee-data-4e28d.firebaseio.com",
  projectId: "employee-data-4e28d",
  storageBucket: "",
  messagingSenderId: "1096149541764"
};

firebase.initializeApp(config);
var database = firebase.database();



// database.ref().push({
//   name: name,
//   email: email,
//   age: age,
//   comment: comment,
//   dateAdded: firebase.database.ServerValue.TIMESTAMP

// });

$(document).ready(function() {

  // Whenever something is added to the database, we need to update the UI
  var ref = database.ref();
  var filter = ref.orderByChild("dateAdded"); // .limitToLast(1)
  filter.on("child_added", function(snapshot) {

    var table = $("#employee-table");
    var newRow = "<tr>"
    newRow += "<td>" + snapshot.val().name + "</td>";
    newRow += "<td>" + snapshot.val().role + "</td>";
    newRow += "<td>" + snapshot.val().startDate + "</td>";
    newRow += "<td>" + "Months TBD" + "</td>";
    newRow += "<td>" + snapshot.val().monthlyRate + "</td>";
    newRow += "<td>" + "Total TBD" + "</td>";
    newRow += "</tr>">

    $(table).append(newRow);
  });



  // When we click submit, add the new person to the database and update the UI
  $("#submit-button").on("click", function() {

    event.preventDefault();

    // Add new data to database
    database.ref().push({
      name: $("#employee-name").val().trim(),
      role: $("#employee-role").val().trim(),
      startDate: $("#employee-start-date").val().trim(),
      monthlyRate: $("#employee-monthly-rate").val().trim(),
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    // Clear out the input fields
    $("#employee-name").val("");
    $("#employee-role").val("");
    $("#employee-start-date").val("");
    $("#employee-monthly-rate").val("");

    // Refresh the display
    // addRowToTable();
  });

});

