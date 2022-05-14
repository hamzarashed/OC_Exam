
/* tabs = [
	{ tabName = "", tabContent: <div id=''>....</div>, isSelected: true }, ....
];
*/
var createTabs = function (tabs) {
	var tabsContainer = document.createElement("div");
	tabsContainer.id = "tabs";
	
	var tabLinks = document.createElement("ul");
	tabLinks.id = "tabLinks";
	
	var tabContents = document.createElement("div");
	tabContents.id = "tabContents";
	
	if(tabs && tabs.length > 0) {
		for (var i = 0; i < tabs.length; i++) {
			var tabName = tabs[i].tabName;
			var tabContent = null;
			if (tabs[i].tabContent) {
				tabContent = tabs[i].tabContent;
			} else if (tabs[i].tabContentID) {
				tabContent = document.getElementById(tabs[i].tabContentID);
			}
			
			var isSelected = tabs[i].isSelected;
			
			var tabLink = document.createElement("li");
			tabLink.className = "tabLink";
			tabLink.linkTo = tabContent.id;
			tabLink.textContent = tabName;			
			tabLinks.appendChild(tabLink);
			tabLink.addEventListener("click", onTabLinkClick);
						
			tabContent.className = "tabContent";
			tabContents.appendChild(tabContent);
			
			if (isSelected) {
				$(tabLink).addClass("selected");
				$(tabContent).addClass("selected");
			}
		}
	}
	
	tabsContainer.appendChild(tabLinks);
	tabsContainer.appendChild(tabContents);
	
	return tabsContainer;
};

var onTabLinkClick = function () {
	var tabLinks = document.getElementsByClassName("tabLink");
	for (var i = 0; i < tabLinks.length; i++) {
		$(tabLinks[i]).removeClass("selected");
	}
	
	var tabContents = document.getElementsByClassName("tabContent");
	for (var i = 0; i < tabContents.length; i++) {
		$(tabContents[i]).removeClass("selected");
		$(tabContents[i]).css("display", "none");
	}
	
	$(this).addClass("selected");

	var selectedContent = document.getElementById(this.linkTo);
	$(selectedContent).addClass("selected");
	$(selectedContent).css("display", "block");
};











