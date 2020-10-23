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

