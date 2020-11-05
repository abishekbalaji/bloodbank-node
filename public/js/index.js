$("#password, #confirm_password").on("keyup", function () {
  if (
    $("#password").val() === $("#confirm_password").val() &&
    $("#password").val() !== ""
  ) {
    $("#message").text(" Matching").css("color", "green");
    document.getElementById("submit").disabled = false;
  } else {
    $("#message").text(" Not Matching").css("color", "red");
    document.getElementById("submit").disabled = true;
  }
});

// const handleAccept = (id) => {
//   console.log(id);
//   console.log("no id");
//   let xhttp = new XMLHttpRequest();
//   xhttp.open("POST", "/accept-request", true);
//   xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   const params = { id };
//   const paramsJSON = JSON.stringify(params);
//   console.log(paramsJSON);
//   xhttp.send(paramsJSON);
// };

// const handleReject = (id) => {
//   console.log("reject id", id);
//   console.log("no id");
// };
