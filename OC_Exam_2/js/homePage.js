
var isHomePage = true;

var posts = getItem("posts", true);
var friendsPosts = getItem("friendsPosts", true);

//_________________________________________

var loadHomePagePostsSection = function () {
	var profileName = getItem("profileName");

	// Load My Posts
	if (posts && posts.length > 0) {
		for(var i = 0; i < posts.length; i++) {
			var createdPost = addPost(profileName, posts[i]);
			
			if (createdPost) {
				var postComments = posts[i].comments || [];
				if (postComments.length > 0) {
					var commentsContainer = createdPost.querySelector(".comments");
					for (var j = 0; j < postComments.length; j++) {									
						var isCommentAdded = addComment(postComments[j].name, postComments[j].commentText, commentsContainer);
					}
				}
			}
		}
	}

	// Load Friends Posts
	for (var friendName in friendsPosts) {
		var friendPosts = friendsPosts[friendName];
		
		for (var i = 0; i < friendPosts.length; i++) {
			if (friendPosts[i].name == profileName || friendPosts[i].name == friendName) {
				var createdPost = addPost(friendName, friendPosts[i]);
				
				if (createdPost) {
					var postComments = friendPosts[i].comments || [];
					if (postComments.length > 0) {
						var commentsContainer = createdPost.querySelector(".comments");
						for (var j = 0; j < postComments.length; j++) {									
							var isCommentAdded = addComment(postComments[j].name, postComments[j].commentText, commentsContainer);
						}
					}
				}
			}
		}
	}
};
//_______________________________________________________________________________________________________
