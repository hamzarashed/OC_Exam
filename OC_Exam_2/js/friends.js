var deleteFriend = function (sender) {
  showDialog("إلغاء الصداقة", "هل أنت متأكد من إلغاء طلب الصداقة؟", [
    {
      label: "نعم",
      callback: function () {
        var currentFriendContainer = $(sender).closest(".frindSection")[0];
        if (currentFriendContainer) {
          var friendName =
            currentFriendContainer.querySelector(".friendName").textContent;

          if (friendName == "ماهر مسعود" && !localStorage.getItem("22")) {
            localStorage.setItem("22", 1);
          } else {
            localStorage.setItem("22", 0);
            let wrong = JSON.parse(localStorage.getItem("wrongAnswers"));
            let q22 = {
              id: 22,
              q: "22 - ضمن موقع التواصل الاجتماعي (Social Media) احذف الصديق ماهر مسعود من صفحة ملفك الشخصي",
            };
            wrong.push(q22);
            localStorage.setItem("wrongAnswers", JSON.stringify(wrong));
          }

          // 1. Remove friend node from ui
          var mainContainer = document.getElementsByClassName("container")[0];
          mainContainer.removeChild(currentFriendContainer);

          // 2. Remove friend data from global friends list
          var friends = getItem("friends", true);
          var friendIndex = -1;
          for (var i = 0; i < friends.length; i++) {
            if (
              friends[i].name.trim().toLowerCase() ==
              friendName.trim().toLowerCase()
            ) {
              friendIndex = i;
              break;
            }
          }

          if (friendIndex > -1) {
            friends.splice(friendIndex, 1);
            storeItem("friends", friends, true);
          }

          // 3. Edit on the frieds counter
          document.getElementById("friendsCount").textContent =
            "الأصدقاء (" + friends.length + ")";
        }
      },
    },
    { label: "لا" },
  ]);
};
//_________________________________________

var loadFriends = function () {
  var friends = getItem("friends", true);

  document.write(
    "<h4 id='friendsCount'>الأصدقاء (" + friends.length + ")</h4>"
  );

  for (var i = 0; i < friends.length; i++) {
    document.write('<div class="frindSection">');
    document.write('<div class="friendMainContainer">');
    document.write('<div class="friendPhotoContainer">');
    document.write(
      '<img src="' + friends[i].src + '" alt="" class="friendPhoto" />'
    );
    document.write('<label class="friendName">' + friends[i].name + "</label>");
    document.write("</div>");
    document.write(
      '<img src="../img/R.png" alt="" class="deleteFriend" onclick="deleteFriend(this);" />'
    );
    document.write("</div>");
    document.write("<br /><hr /><br />");
    document.write("</div>");
  }
};
//_________________________________________
