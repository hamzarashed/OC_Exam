var profileName = getItem("profileName");
var posts = getItem("posts", true) || [];
var friendsPosts = getItem("friendsPosts", true);
var friends = getItem("friends", true);
//_______________________________________________

var getMainPostTemplate = function () {
  return '\
			<div class="post">\
				[postLabel]\
				<br />\
				[shareText]\
				<label class="postText">[postText]</label><br/><br/>\
				<div class="postActions">\
					<label class="likePost" onclick="likePostClick(this);">إعجاب</label>\
					<label class="sharePost" onclick="sharePostClick(this);">مشاركة</label>\
					<label class="deletePost" onclick="deletePostClick(this);">حذف</label>\
				</div>\
				<div class="comments">\
				</div>\
				<div class="writeComment">\
					<textarea class="writeComment" placeholder="اكتب تعليق..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>\
					<button class="btn writeCommentBtn" onclick="writeCommentBtnClick(this);">نشر</button>\
				</div>\
				<br /><br />\
			</div>\
	';
};

// Post Templatef
var getPostTemplate = function () {
  var postTemplate = getMainPostTemplate();
  postTemplate = postTemplate.replace(
    "[postLabel]",
    '<span class="postName">[postName]</span>'
  );
  return postTemplate;
};

// Friend  Post Template
var getFriendPostTemplate = function () {
  var postTemplate = getMainPostTemplate();
  postTemplate = postTemplate.replace(
    "[postLabel]",
    '<span class="postName">[postName]</span> » <span class="toProfileName">[toProfileName]</span>'
  );
  return postTemplate;
};

// Shared Post Template: When someone shared a friend post to his own profile.
var getSharedPostTemplate = function () {
  var postTemplate = getMainPostTemplate();
  postTemplate = postTemplate.replace(
    "[postLabel]",
    '<span class="postName">[postName]</span><span style="font-size: 13px;"> مشاركة </span><span class="fromProfileName">[fromProfileName]</span><span style="font-size: 13px;"> نشر</span>'
  );
  return postTemplate;
};

// Friend Shared Post Template: When someone shared a post to friend's profile.
var getFriendSharedPostTemplate = function () {
  var postTemplate = getMainPostTemplate();
  postTemplate = postTemplate.replace(
    "[postLabel]",
    '<span class="postName">[postName]</span><span style="font-size: 13px;"> شاركة تعليق مع </span><span class="toProfileName">[toProfileName]</span>'
  );
  return postTemplate;
};

//_____________________________________

// Comment Template
var getCommentTemplate = function () {
  return '\
					<div class="comment">\
						<label class="commentName">[commentName]</label>[deleteComment]<br />\
						<label class="commentText">[commentText]</label><br />\
					</div>\
	';
};
//_________________________________________________________________________________________________________

//                                 Create objects data

var createPostObjectData = function (
  postWriter,
  postText,
  optSharedFrom,
  optIsSharedToMe
) {
  var post = { name: postWriter, postText: postText, comments: [] };

  if (optSharedFrom) {
    post.sharedFrom = optSharedFrom;
  }

  if (optIsSharedToMe) {
    post.isSharedToMe = optIsSharedToMe;
  }

  return post;
};
//_________________________________________________________________________________________________________

var getPostObjectFromPostDiv = function (postDiv) {
  var post = null;
  var isMyPost;

  if (postDiv.profileName == profileName) {
    tempPosts = posts;
    isMyPost = true;
  } else {
    tempPosts = friendsPosts[postDiv.profileName];
    isMyPost = false;
  }

  var index;
  for (var i = 0; i < tempPosts.length; i++) {
    if (
      tempPosts[i].name == postDiv.name &&
      tempPosts[i].postText == postDiv.postText
    ) {
      post = tempPosts[i];
      index = i;
      break;
    }
  }

  return { post: post, isMyPost: isMyPost, index: index };
};
//_____________________________________

var saveUpdatedPosts = function (isMyPost) {
  if (isMyPost) {
    storeItem("posts", posts, true);
  } else {
    storeItem("friendsPosts", friendsPosts, true);
  }
};
//_________________________________________________________________________________________________________

//                                 Post Type => Status, hyperLink

var preparePostType = function (placeholder) {
  document.getElementById("newPostInput").placeholder = placeholder;
  document.getElementById("newPostBtn").postType = "Status";
};
//_____________________________________

var onPostTypeClick = function (sender, placeholder) {
  if (sender.id.toLowerCase() == "status") {
    $("#Hyperlink").removeClass("active");
  } else {
    $("#Status").removeClass("active");
  }

  $(sender).addClass("active");

  document.getElementById("newPostInput").placeholder = placeholder;
  document.getElementById("newPostBtn").postType = sender.id;
};
//_________________________________________________________________________________________________________

// Add Post
var addPost = function (currentProfileName, post, optAppendPostAtTop) {
  var postContainer = null;
  if (post.postText) {
    var postTemplate = null;

    var postText =
      post.postType == "hyperlink"
        ? "<a class='postedLink' target='_blank' href='" +
          post.postText +
          "'>" +
          post.postText +
          "</a>"
        : post.postText;

    var shareTextContainer;
    if (post.shareText) {
      shareTextContainer =
        "<label class='shareText'>" + post.shareText + "</label><br />";
    }

    if (post.sharedFrom) {
      postTemplate = getSharedPostTemplate();
      postTemplate = post.shareText
        ? postTemplate.replace("[shareText]", shareTextContainer)
        : postTemplate.replace("[shareText]", "");
      postTemplate = postTemplate
        .replace("[postName]", post.name)
        .replace("[fromProfileName]", post.sharedFrom)
        .replace("[postText]", postText);
    } else if (post.isSharedToMe) {
      postTemplate = getFriendSharedPostTemplate();
      postTemplate = post.shareText
        ? postTemplate.replace("[shareText]", shareTextContainer)
        : postTemplate.replace("[shareText]", "");
      postTemplate = postTemplate
        .replace("[postName]", post.name)
        .replace("[toProfileName]", currentProfileName)
        .replace("[postText]", postText);
    } else {
      if (
        post.name.trim().toLowerCase() ==
        currentProfileName.trim().toLowerCase()
      ) {
        postTemplate = getPostTemplate();
        postTemplate = postTemplate.replace("[shareText]", "");
        postTemplate = postTemplate
          .replace("[postName]", post.name)
          .replace("[postText]", postText);
      } else {
        postTemplate = getFriendPostTemplate();
        postTemplate = postTemplate.replace("[shareText]", "");
        postTemplate = postTemplate
          .replace("[postName]", post.name)
          .replace("[toProfileName]", currentProfileName)
          .replace("[postText]", postText);
      }
    }

    var postsDiv = $("#posts");

    // Draw the post on the window ui.
    if (postsDiv) {
      var temp = document.createElement("div");
      temp.innerHTML = postTemplate;
      postContainer = temp.children[0];
      postContainer.profileName = currentProfileName;
      postContainer.name = post.name;
      postContainer.postText = post.postText;
      postContainer.sharedFrom = post.sharedFrom || "";
      postContainer.isSharedToMe = post.isSharedToMe || false;

      if (optAppendPostAtTop) {
        postsDiv.prepend(postContainer);
      } else {
        postsDiv.append(postContainer);
      }

      if (post.shareText) {
        $(postContainer).find(".postText").addClass("sharedPost");
      }

      if (post.isLike) {
        var likePostLink = postContainer.querySelector(".likePost");
        likePostClick(likePostLink);
      }
    }
  }

  return postContainer;
};
//_____________________________________

// Add Comment
var addComment = function (commentName, commentText, commentsContainer) {
  var isCommentAdded = false;

  if (commentText) {
    var commentTemplate = getCommentTemplate();
    commentTemplate = commentTemplate
      .replace("[commentName]", commentName)
      .replace("[commentText]", commentText);

    if (commentName == profileName) {
      commentTemplate = commentTemplate.replace(
        "[deleteComment]",
        "<img class='deleteComment' src='../img/close.png' onclick='deleteComment(this);' />"
      );
    } else {
      commentTemplate = commentTemplate.replace("[deleteComment]", "");
    }

    commentsContainer.innerHTML = commentsContainer.innerHTML + commentTemplate;

    isCommentAdded = true;
  }

  return isCommentAdded;
};
//_____________________________________

var loadPostsSection = function () {
  if (posts && posts.length > 0) {
    for (var i = 0; i < posts.length; i++) {
      var createdPost = addPost(profileName, posts[i]);

      if (createdPost) {
        var postComments = posts[i].comments || [];
        if (postComments.length > 0) {
          var commentsContainer = createdPost.querySelector(".comments");
          for (var j = 0; j < postComments.length; j++) {
            var isCommentAdded = addComment(
              postComments[j].name,
              postComments[j].commentText,
              commentsContainer
            );
          }
        }
      }
    }
  }
};
//_____________________________________

// Add Post Button Click (add post on my profile or on home page)
var addPostBtnClick = function (sender) {
  var newPostText = sender.parentElement.querySelector("#newPostInput");

  if (newPostText) {
    var postText = newPostText.value;
    var post = createPostObjectData(profileName, postText);
    post.postType = sender.postType.toLowerCase();

    var postContainer = addPost(profileName, post, true);

    if (postContainer) {
      posts.unshift(post);
      storeItem("posts", posts, true);
      newPostText.value = "";
    }
  }
};
//_____________________________________

// Add Comment Button Click
var writeCommentBtnClick = function (sender) {
  var currentPost = $(sender).closest(".post")[0];

  var commentInputText = sender.parentElement.querySelector(".writeComment");
  var commentsContainer =
    sender.parentElement.parentElement.querySelector(".comments");

  if (commentInputText && commentsContainer) {
    var isCommentAdded = addComment(
      profileName,
      commentInputText.value,
      commentsContainer
    );

    if (isCommentAdded) {
      var postData = getPostObjectFromPostDiv(currentPost);
      if (postData.post) {
        if (!postData.post.comments) {
          postData.post.comments = [];
        }

        postData.post.comments.push({
          name: profileName,
          commentText: commentInputText.value,
        });
        saveUpdatedPosts(postData.isMyPost);
      }
      commentInputText.value = "";
    }
  }
};
//_____________________________________

var deleteComment = function (sender) {
  var currentPost = $(sender).closest(".post")[0];
  var currentComment = $(sender).closest(".comment")[0];

  var commentName = currentComment.querySelector(".commentName");
  var commentText = currentComment.querySelector(".commentText");

  var postData = getPostObjectFromPostDiv(currentPost);
  if (postData.post) {
    var index;
    var comments = postData.post.comments;
    for (var i = 0; i < comments.length; i++) {
      if (
        comments[i].name == commentName.textContent &&
        comments[i].commentText == commentText.textContent
      ) {
        index = i;
        break;
      }
    }

    if (index >= 0) {
      postData.post.comments.splice(index, 1);
      saveUpdatedPosts(postData.isMyPost);

      $(currentComment).remove();
    }
  }
};
//_________________________________________________________________________________________________________

// Like Post
var likePostClick = function (sender) {
  var isLike;
  if (sender.liked) {
    delete sender.liked;
    sender.style.color = "black";
    sender.style.fontWeight = "normal";
    isLike = false;
  } else {
    sender.liked = true;
    sender.style.color = "red";
    sender.style.fontWeight = "bold";
    isLike = true;
  }

  var currentPost = $(sender).closest(".post")[0];
  var postData = getPostObjectFromPostDiv(currentPost);
  if (postData.post) {
    postData.post.isLike = isLike;
    saveUpdatedPosts(postData.isMyPost);
  }
};
//_____________________________________

// Share Post
var sharePostClick = function (sender) {
  var currentPost = $(sender).closest(".post")[0];
  var currentPostName = currentPost.name;
  var currentPostText = currentPost.postText;

  if (currentPost) {
    var shareDiv = $("<div>");
    var shareOnMyProfileOption = $(
      "<input type='radio' name='share' id='onMyProfile' checked>"
    ).on("click", function () {
      $("#shareFriendName").attr("disabled", "");
    });
    shareDiv
      .append(shareOnMyProfileOption)
      .append("مشاركة هذا التعليق في ملفي الشخصي")
      .append("<br />");

    var shareOnFriendProfileOption = $(
      "<input type='radio' name='share' id='onFriendProfile'>"
    ).on("click", function () {
      $("#shareFriendName").removeAttr("disabled");
      $("#shareFriendName").focus();
    });
    shareDiv
      .append(shareOnFriendProfileOption)
      .append("مشاركة هذا التعليق في الملف الشخصي الخاص بصديقي");

    var friendsDropdown = $("<select id='shareFriendName' disabled>");
    friendsDropdown.append("<option></option>");

    for (var i = 0; i < friends.length; i++) {
      friendsDropdown.append(
        $(`<option value = '${friends[i].name}'>${friends[i].name}</option>`)
      );
    }
    shareDiv.append("&nbsp;&nbsp;&nbsp;").append(friendsDropdown);

    var saySomethingTextInp = $(
      "<textarea id='saySomethingText' placeholder='اترك تعليقا على هذا الموضوع.......'>"
    )
      .attr({
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        spellcheck: "false",
      })
      .css({ width: "278px", resize: "none" });
    shareDiv.append("<br /><br />").append(saySomethingTextInp);

    //-----------------
    var onShareBtnClick = function () {
      var isShareToMyProfile = $("#onMyProfile").prop("checked");
      var saySomethingText = $("#saySomethingText").val();
      if (isShareToMyProfile) {
        var post = createPostObjectData(profileName, currentPostText);
        post.sharedFrom = currentPostName;
        post.shareText = saySomethingText;
        var postContainer = addPost(profileName, post, true);

        posts.unshift(post);
        storeItem("posts", posts, true);

        showDialog("مشاركة تعليق", "تمت مشاركة التعليق بنجاح في ملفك الشخصي", [
          { label: "OK" },
        ]);
      } else {
        var selectedFriendName = $("#shareFriendName").val();

        if (selectedFriendName) {
          var post = createPostObjectData(profileName, currentPostText);
          post.isSharedToMe = true; // isSharedToMe: me refers to the person that will have this post on his profile, in this case the friend name that we want to share this post with him.
          post.shareText = saySomethingText;

          if (typeof isHomePage !== "undefined" && isHomePage) {
            var postContainer = addPost(selectedFriendName, post, true);
          }

          if (!friendsPosts[selectedFriendName]) {
            friendsPosts[selectedFriendName] = [];
          }

          friendsPosts[selectedFriendName].unshift(post);
          storeItem("friendsPosts", friendsPosts, true);

          showDialog(
            "مشاركة تعليق",
            "تمت مشاركة التعليق بنجاح مع الملف الشخصي الخاص ب" +
              selectedFriendName,
            [{ label: "OK" }]
          );
        } else {
          showDialog(
            "حدوث خطأ",
            "يجب اختيار صديق لمشاركة التعليق مع ملفه الشخصي",
            [{ label: "OK" }]
          );
        }
      }
    };

    showDialog(
      "مشاركة تعليق",
      shareDiv,
      [{ label: "مشاركة", callback: onShareBtnClick }],
      { "font-size": "12px", width: "400px", height: "100px" }
    );
  }
};
//_____________________________________

// Delete Post
var deletePostClick = function (sender) {
  var currentPost = $(sender).closest(".post")[0];
  var currentPostText = currentPost.postText;
  console.log(currentPostText);

  var deletePost = function () {
    var postData = getPostObjectFromPostDiv(currentPost);
    if (postData.post) {
      if (postData.isMyPost) {
        posts.splice(postData.index, 1);
      } else {
        friendsPosts[currentFriendProfile.name].splice(postData.index, 1);
      }
      saveUpdatedPosts(postData.isMyPost);

      document.getElementById("posts").removeChild(currentPost);
    }
  };

  showDialog("حذف تعليق", "هل أنت متأكد من إزالة هذا التعليق؟", [
    { label: "نعم", callback: deletePost },
    { label: "لا" },
  ]);

  if (currentPostText == "سأنظم رحلة في بداية هذا الشهر ، من سينضم؟") {
    localStorage.setItem("25", 1);
  } else {
    localStorage.setItem("25", 0);
    let wrong = JSON.parse(localStorage.getItem("wrongAnswers"));
    let q25 = {
      id: 25,
      q: "25 - ضمن موقع التواصل الاجتماعي (Social Media) وعلى صفحة ملفك الشخصي أزل المنشور الذي يتضمن النص التالي سأنظم رحلة في بداية هذا الشهر من سينضم ؟",
    };
    wrong.push(q25);
    localStorage.setItem("wrongAnswers", JSON.stringify(wrong));
  }
};
//_________________________________________________________________________________________________________
//                                          Load Sections

var loadPhotosSection = function () {
  var photos = getItem("photos", true);

  document.write(
    "<a href='photos.html'><h4>الصور (" + photos.length + ")</h4></a>"
  );

  for (var i = 0; i < photos.length; i++) {
    document.write(
      '<img src="' + photos[i] + '" alt="" class="photosCategory" />'
    );
  }
};
//_____________________________________

var loadFriendsSection = function () {
  document.write(
    "<a href='friends.html'><h4>الأصدقاء (" + friends.length + ")</h4></a>"
  );

  for (var i = 0; i < friends.length; i++) {
    document.write(
      "<a href='javascript:void(0);' onclick='openFriendProfile(this);'>"
    );
    document.write('<div class="friendPhotoContainer">');
    document.write(
      '<img src="' + friends[i].src + '" alt="" class="friendPhoto" />'
    );
    document.write('<label class="friendName">' + friends[i].name + "</label>");
    document.write("</div>");
    document.write("</a>");
  }
};
//_____________________________________

var loadLikesSection = function () {
  var likes = getItem("likes", true);

  document.write(
    "<a href='likes.html'><h4>الإعجابات (" + likes.length + ")</h4></a>"
  );

  for (var i = 0; i < likes.length; i++) {
    document.write('<div class="likeContainer">');
    document.write(
      '<img src="' + likes[i].src + '" alt="" class="likePhoto" />'
    );
    document.write("<label>" + likes[i].name + "</label>");
    document.write("</div>");
  }
};
//_________________________________________________________________________________________________________
