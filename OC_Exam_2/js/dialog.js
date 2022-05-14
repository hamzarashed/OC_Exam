
// content: maybe a string or a dom object
// buttons: [{ label:.., callback:.. }]
var showDialog = function (title, content, buttons, contentCSS) {
	// 1. Create main dialog div
	var dialogDiv = $("<div>").addClass("dialog");
	
	
	// 2. Create dialog title
	var dialogTitle = $("<div>").addClass("dialogTitle");
	
	var dialogTitleText = $("<span>").addClass("dialogTitleText").append(title);
	var dialogTitleClose = $("<span>").addClass("dialogTitleClose").on("click", function () { hideDialog(this); });		
	dialogTitle.append(dialogTitleText).append(dialogTitleClose);	
	
	
	// 3. Create dialog content
	var dialogContent = $("<div>").addClass("dialogContent").append(content);
	if (contentCSS) {
		dialogContent.css(contentCSS);
	}
	
	// 4. Create dialog buttons
	var dialogButtons = $("<div>").addClass("dialogButtons");
	if (buttons && buttons.length > 0) {
		for (var i = 0; i < buttons.length; i++) {
			var btn = createButton(buttons[i].label, buttons[i].callback);
			dialogButtons.append(btn);
		}
	}
	
	
	dialogDiv.append(dialogTitle).append(dialogContent).append(dialogButtons);
	dialogDiv.css({ "right": (0.5 * (window.outerWidth - 300)) + "px", "top": (0.28 * (window.outerHeight - 150)) + "px" });
	$("body").append(dialogDiv);
};

var createButton = function (buttonTitle, callBackFunction) {
	var btn = $("<button>").append(buttonTitle);
	btn.on("click", function() {
		if(callBackFunction && callBackFunction instanceof Function) {
			callBackFunction();
			hideDialog(this);
		}
		else {
			hideDialog(this);
		}
	});
	
	return btn;
};

var hideDialog = function (sender) {
	var dialogDiv = $(sender).closest(".dialog");
	$(dialogDiv).remove();
};




















