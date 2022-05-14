
//disable right click		
$('body').bind("contextmenu", function (e) {
    return false;
});

sharedFiles = [];
uploadFileKeyName = "UploadedFilesNames";

$('.permissionOptions').hover(function (e) {
    $('.permissionOptions').removeClass('goog-menuitem-highlight');
    var selection = getSelectionfromParents($(e.target), 'permissionOptions');
    if (selection) {
        selection.addClass('goog-menuitem-highlight');
    }
});

$('.permissionOptions.goog-menuitem').click(function (e) {
    $('#permissionOptionList').hide();
    $('.permissionOptions').removeClass('goog-option-selected');
    var selection = getSelectionfromParents($(e.target), 'permissionOptions');
    if (selection) {
        selection.addClass('goog-option-selected');

        $('#permssionOptionClick .goog-flat-menu-button-caption').text(selection.text());
    }
});

getSelectionfromParents = function (selector, className) {
    var element = selector;
    var i = 0;
    while (!element.hasClass(className)) {
        element = selector.parent();
        if (i++ > 5) {
            break;
        }
    }
    return element.hasClass(className) ? element : null;
};

$('#shareEmailTextArea').keyup(function (e) {
    var emailText = $('#shareEmailTextArea').val();
    if (emailText && emailText.length > 0) {
        $('#shareNoteDiv').css('display', '');
        $('#shareDiv').height(300);
    }
    else {
        $('#shareNoteDiv').css('display', 'none');
        $('#shareDiv').height(215);
    }
});

$('#doneShareButton').click(function (e) {
    var emailText = $('#shareEmailTextArea').val();
    if (emailText) {
        $('#shareDiv').css('display', 'none');
        $('.simple-sharing-shared-people').append(emailText);

        var sharedFile = jQuery.extend(true, {}, lastFile);
        sharedFile['sharedEmail'] = emailText;
        sharedFile['shareNote'] = $('#shareNoteTextArea').val();
        var permetionOption = document.getElementById('permissionOptionList');
        var Children = permetionOption.children;
        for (i = 0; i < Children.length; i++) {
            if ($(Children[i]).text().trim().toLowerCase() == $('#permssionOptionClick').text().trim().toLowerCase()) {
                sharedFile['permissionOption'] = Children[i].getAttribute("value");
                break;
            }
        }
        //sharedFile['permissionOption'] = $('#permssionOptionClick').text().trim();

        sharedFiles.push(sharedFile);

        storeItem("sharedFiles", sharedFiles, true);
    }
    $('#shareNoteTextArea').val('');
    $('#shareEmailTextArea').val('');
    $('.simple-sharing-shared-people').html('');
    $('#shareDiv').css('display', 'none');
});

$('#permssionOptionClick').click(function (e) {
    e.stopPropagation();
    var permssionlistElement = $('#permissionOptionList');
    var permssionClickElement = $('#permssionOptionClick');

    permssionlistElement.parent().css({ position: 'relative' });
    permssionlistElement.css({ top: permssionClickElement.offset().top + permssionClickElement.height(), left: permssionClickElement.offset().left, position: 'absolute' });

    permssionlistElement.toggle();
});

$('.shareClick').click(function (e) {
    $('#shareDiv').css('display', '');
});

document.onclick = function () {
    var newMenueElement = $('.menue');
    if (newMenueElement.css('display') || newMenueElement.css('display') != 'none') {
        newMenueElement.css('display', 'none');
    }
};


$('.newGoogleDocs').click(function (e) {

    if (!window.openedDocuments)
    {
        window.openedDocuments = [];
    }

    if (window.location.href.toLowerCase().indexOf('document') > -1) {
        window.openedDocuments.push(window.open("GoogleDocument.html", "_blank"));
    }
    else {
        window.openedDocuments.push(window.open("GoogleDocument.html", "_blank"));
    }
});


function closeOpenedDocuments()
{
    if (window.openedDocuments)
    {
        for (var index in window.openedDocuments)
        {
            window.openedDocuments[index].close();
        }
    }
}




