fileDivIndex = null;
  $('#edit-menue').toggle();
document.getElementById('docs-file-menu').onclick = function (e) {
    document.onclick();
    e.stopPropagation();
    var menuElement = document.getElementById('file_menu');
    if (menuElement.style['display']) {
        menuElement.style['display'] = '';
    }
    else {
        menuElement.style['display'] = 'none';
    }
};

$('#docs-edit-menu').click(function (e) {
    document.onclick();
    e.stopPropagation();
    $('#edit-menue').toggle();
});

$('#docs-view-menu').click(function (e) {
    document.onclick();
    e.stopPropagation();
    $('#viewMenue').toggle();
});

$('#docs-insert-menu').click(function (e) {
    document.onclick();
    e.stopPropagation();
    $('#insertMenue').toggle();
});

$('#docs-tools-menu').click(function (e) {
    document.onclick();
    e.stopPropagation();
    $('#toolMenue').toggle();
});

$('#docs-help-menu').click(function (e) {
    document.onclick();
    e.stopPropagation();
    $('#helpMenue').toggle();
});

$('#docs-extensions-menu').click(function (e) {
    document.onclick();
    e.stopPropagation();
    $('#addOnsMenue').toggle();
});

$('#docs-table-menu').click(function (e) {
    document.onclick();
    e.stopPropagation();
    $('#tableMenue').toggle();
});

$('#docs-format-menu').click(function (e) {
    document.onclick();
    e.stopPropagation();
    $('#formatMenue').toggle();
});

$('#renameClick').click(function (e) {
    var titleElement = $('.docs-title-input');
    titleElement.focus();
    titleElement.select();
});

$('#revisionHistoryClick').click(function (e) {
    $('#docs-header').css('display', 'none');
    $('#docs-bars').css('display', 'none');

    $('#docs-revisions-sidebar').css('display', '');
    $('#docs-chrome-cover').
        css('display', '').
        append('<div class="docs-revisions docs-revisions-default-color"><div class="docs-revisions-close-container"><div class="docs-revisions-close goog-flat-button goog-inline-block" aria-label="Back" role="button" aria-disabled="false" data-tooltip="Back" aria-hidden="false" tabindex="0" style="-webkit-user-select: none;"><div class="goog-flat-button-outer-box goog-inline-block"><div class="goog-flat-button-inner-box goog-inline-block"><div class="docs-icon goog-inline-block "><div class="docs-icon-img-container docs-icon-img docs-icon-arrow-back-white" aria-hidden="true">&nbsp;</div></div></div></div></div></div><div class="docs-revisions-since"><div class="docs-revisions-newchanges-container"><div class="docs-revisions-newchanges docs-revisions-text">Revision history</div></div><div class="docs-revisions-timestamp docs-revisions-text">January 26, 4:45 PM</div></div><div class="docs-revisions-switch docs-revisions-text docs-revisions-default-color goog-inline-block goog-flat-button goog-flat-button-disabled" role="button" data-tooltip="See changes since you last viewed this document" aria-label="See changes since you last viewed this document" aria-hidden="true" aria-disabled="true" style="-webkit-user-select: none; display: none;">See new changes</div><div class="docs-revisions-authors"><img class="docs-revisions-photo" src="../img/K.png" style="border-bottom-color: #26A69A" data-tooltip="khalid abu-sharkh" aria-label="khalid abu-sharkh"></div></div>');

    if (lastFile) {
        storeItem('lastviewedFileHistory', lastFile, true);
    }
});

$(document).ready(function () {
    var href = window.location.href;
    if (href.split('?').length == 2) {
        lastFile = JSON.parse(decodeURI(href).split('?')[1].split('=')[1]);
        $('#txtTitle').val(lastFile.fileName.split('.')[0]);
        if (lastFile.fileContent) {
            $('#textContent').val(lastFile.fileContent);
        }
        updateTitle();
        fileDivIndex = lastFile.fileDivIndex;

        $('#txtTitle').keyup(function (e) {
            updateDrive();
            updateTitle();
        });
    }
    else {
        //saveCurrentFileInfo();
        $('#txtTitle').keyup(function (e) {
            saveCurrentFileInfo();
        });
        $('#textContent').keyup(function () {
            saveCurrentFileInfo();
        });
    }

});

updateTitle = function () {
    var title = $('#txtTitle').val() || 'بلا اسم';
    $('title').html(title + ' - Google مستندات');
};

updateDrive = function () {
    if (window.opener) {
        var title = ($('#txtTitle').val() || 'بلا اسم') + '.docx';
        if (fileDivIndex != null) {
            window.opener.updateFileInDrive(title, $('#textContent').val(), fileDivIndex)
        }
        else {
            fileDivIndex = window.opener.addFileToDrive(title, null, $('#textContent').val(), true);
        }
    }
};

saveCurrentFileInfo = function () {
    var currentFile = {
        title: $('#txtTitle').val(),
        content: $('#textContent').val()
    };

    updateTitle();
    updateDrive();
    storeItem('newFileInfo', currentFile, true);
};

$('#newMenueButton').click(function (e) {
    e.stopPropagation();
    var refButton = $('#newMenueButton');
    var x = refButton.clientX + refButton.width();
    var y = e.clientY - 3;
    $('#newSubMenue').css({ 'top': y.toString() + 'px', 'left': x.toString() + 'px' });
    $('#newSubMenue').toggle();
});

$('.goog-control').hover(function (e) {
    e.stopPropagation();
    $('.goog-control').removeClass('goog-control-hover');
    var parentTarget = $(e.target).closest('.goog-control');
    if (parentTarget) {
        parentTarget.addClass('goog-control-hover')
    }
});

$('body').hover(function (e) {
    $('.goog-control').removeClass('goog-control-hover');
});
