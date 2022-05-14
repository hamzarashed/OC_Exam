let selectedNetworkName = null;

$(document).ready(function () {
  $(".hi").click(function () {
    document.getElementById("Wireless").checked = true;
    let password = document.getElementById("password").value;
    if (
      localStorage.getItem("SunlightWifi") == "home195" &&
      localStorage.getItem("nameNetwork") == "SunlightWifi" &&
      !localStorage.getItem("34")
    ) {
      localStorage.setItem("34", 1);
      window.close();
      window.open("../index.html");
    } else {
      localStorage.setItem("34", 0);
      let q34 =
        "34 - ضمن الإعدادت قم بالاتصال بالإنترنت مستخدما الشبكة اللاسلكية SunlightWifi وكلمة المرور home195";
      let wrong = JSON.parse(localStorage.getItem("wrongAnswers"));
      let q27 = {
        id: 34,
        q: q34,
      };
      wrong.push(q27);
      localStorage.setItem("wrongAnswers", JSON.stringify(wrong));
      window.close();
      window.open("../index.html");
    }
  });

  $(".join-network-link").click(function (e) {
    selectedNetworkName = $(e.target).attr("name");
    localStorage.setItem("nameNetwork", selectedNetworkName);
    $("#popup").css("display", "block");
  });

  $("#joinButton").click(function (e) {
    //var joinedNetworkInfo = {
    //    name: selectedNetworkName,
    //    password: $('#password').val()
    //};

    storeItem(selectedNetworkName, $("#password").val());

    $("#password").val("");
    $("#popup").css("display", "none");
  });
});
