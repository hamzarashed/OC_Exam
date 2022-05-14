attachmentFilePaths = ['attachments/الثقافة.docx','attachments/المجلة.docx'];
let fileDivs = [];

var showHideGoogleApps = function () {
    $('#googleApps').toggle();
};
$('#gbwa').click(function (e) {
    $('#googleApps').toggle();
});
$(document).ready(function () {

});

$('#mainContent').mousedown(function (e) {
    if (e.which === 3) {
        e.stopPropagation();
        $('#newMenue').css({ 'display': '', 'top': e.clientY.toString() + 'px', 'left': e.clientX.toString() + 'px' });
    }
});

$("body").click(function (e) {
    var driveButton = $("#myDriveButton");
    driveButton.removeClass("button_pressed");
});

$('#myDriveButton').click(function (e) {
    e.stopPropagation();
    var driveButton = $("#myDriveButton");
    driveButton.addClass("button_pressed");
    var top = driveButton.offset().top + driveButton.outerHeight();
    var left = driveButton.offset().left;
    $('#newMenue').css({ 'display': '', 'top': top + 'px', 'left': left + 'px' });
});

//$('#gbwa').click(function () {
//    $('#googleAppsList').addClass('appsMenu_shown');
//});

$(document).ready(function () {

    var allFiles = attachmentFilePaths;
    var loadedFiles = getItem(uploadFileKeyName, true);
    if (loadedFiles) {
        allFiles = allFiles.concat(loadedFiles);
    }


    for (var i = 0 ; i < allFiles.length ; i++) {
        var path = allFiles[i];
        var filename = path.split('/').pop();
        addFileToDrive(filename, path);
    }

    var createdFiles = getItem(createdFileKeyName, true);
    if (createdFiles) {
        for (var i = 0 ; i < createdFiles.length ; i++) {
            var file = createdFiles[i];
            addFileToDrive(file.fileName, file.fileName, file.fileContent, false);
        }
    }

    $('#btnDownload').click(function (e) {
        if (lastFile && lastFile.filePath) {
            window.location.href = lastFile.filePath;
        }
    });

    $('#btnShare').click(function () {
        $('#shareDiv').css('display', '');
        if (lastFile) {
            var shardEmails = [];
            for (var i = 0 ; i < sharedFiles.length ; i++) {
                if (lastFile.fileName && lastFile.fileName == sharedFiles[i].fileName) {
                    shardEmails.push(sharedFiles[i]['sharedEmail']);
                }
            }
            if (shardEmails.length > 0) {
                $('.simple-sharing-shared-people').html(shardEmails.join());
            }
        }
    });
});

document.getElementById('gbqfb').onclick = function () {
    document.getElementById('gbqfq').value = '';
};

document.getElementById('newButton').onclick = function (e) {
    e.stopPropagation();
    var newMenueElement = document.getElementById('newMenue');
    if (newMenueElement.style['display']) {
        $('#newMenue').css({ 'display': '', 'left': 'auto', 'top': '168px' });
    }
    else {
        newMenueElement.style['display'] = 'none';
    }
};

this.uploadFile = this.uploadFile || $("<input type='file' name='files[]'>")
       .css({
           'visibility': 'hidden',
           'display': 'none',
           "height": 20
       });

this.uploadFile.change(function (e) {

    var currentFile = this.files[this.files.length - 1];
    addFileToDrive(currentFile.name);

});

var createdFileKeyName = "CreatedFiles";
updateFileInDrive = function (f, fileContent, index) {
    if (fileDivs[index]) {
        var div = fileDivs[index];
        div.find('#fileNameSpan').html(f);

        var createdFileIndex = index;
        if (attachmentFilePaths.length)
            createdFileIndex -= (attachmentFilePaths.length);

        var uploadedFiles = getItem(uploadFileKeyName, true);
        if (uploadedFiles && uploadedFiles.length > 0) {
            createdFileIndex -= (uploadedFiles.length);
        }
        var createdFiles = getItem(createdFileKeyName, true);
        if (createdFiles[createdFileIndex]) {
            createdFiles[createdFileIndex].fileName = f;
            createdFiles[createdFileIndex].fileContent = fileContent;
            storeItem(createdFileKeyName, createdFiles, true);
        }
    }
};

addFileToDrive = function (fileName, optPath, optFileContent, optIsNew) {
    //$('#content').css('display', '')
    var container = $('#mainContent');
    var imagePath = "https://cdn.iconscout.com/icon/free/png-256/docx-file-14-504256.png";
    var fileExtention = fileName && fileName.split('.')[1] && fileName.split('.')[1].toUpperCase();
    if (fileExtention && (fileExtention == 'DOCX' || fileExtention == 'DOC')) {
        imagePath = "https://cdn.iconscout.com/icon/free/png-256/docx-file-14-504256.png";
    }
    fileDivs = []
    var div = $('<div class="a-v-hc-m a-cc-La" role="option" tabindex="0" style="width: calc(12.5% - 16px);margin-left:16px;margin-top:16px;margin-right:16px" data-target="doc" data-is-doc-name="true" draggable="true" data-id="0B4H7iskINwA1YmZKdkZZa3hqdG8" aria-disabled="false" aria-selected="true"><div class="a-v-hc-Hm-wd-vd"></div><div class="k-v-hc k-v-ta k-v-mc-cc-La k-ji-ae k-v-da"><div class="k-I-ja-bi"></div><div class="k-v-ta-za-m"><div class="k-v-ta-za ub-yb-Xn-od"  style="background-image:"";"><div class="k-v-ta-za-Ln-vd"></div><div class="k-v-ta-za-er"></div><img class="k-v-ta-za-Aa" src="https://cdn.iconscout.com/icon/free/png-256/docx-file-14-504256.png" alt=""></div></div><div class="k-v-ta-P-m"><div class="k-v-ta-P" aria-label="icons-hdpi.png Image"><div class="k-v-ta-d"><div class="a-d"><img src="https://cdn.iconscout.com/icon/free/png-256/docx-file-14-504256.png" alt="Image"></div></div><div class="k-v-M" aria-label="icons-hdpi.png"><span id="fileNameSpan" class="k-ta-P-x">' + fileName + '</span></div></div></div></div></div>');
    fileDivs.push(div);
    var fileDivIndex = fileDivs.length - 1;
    div.mousedown(function (e) {
        if (e.which === 3) {
            e.stopPropagation();
            $('#rightClickMenue').css({ 'display': '', 'top': e.clientY.toString() + 'px', 'left': e.clientX.toString() + 'px' });
            lastFile = {
                fileName: fileName,
                filePath: optPath,
                fileDivIndex: fileDivIndex,
                fileContent: optFileContent
            };
        }
    });

    if (fileExtention && fileExtention == 'DOCX') {
        div.dblclick(function (e) {
            lastFile = {
                fileName: fileName,
                filePath: optPath,
                fileDivIndex: fileDivIndex,
                fileContent: optFileContent
            };
            window.open("GoogleDocument.html?file=" + JSON.stringify(lastFile), "_blank");
        });
    }
    container.append(div);

    //width: calc(25% - 16px);

    $('#defualtBackground').detach();

    if (!optPath && !optIsNew) {
        var uploadedFiles = [fileName];
        var oldValues = getItem(uploadFileKeyName, true);
        if (oldValues && Array.isArray(oldValues)) {
            uploadedFiles = uploadedFiles.concat(oldValues);
        }
        storeItem(uploadFileKeyName, uploadedFiles, true);
    }

    else if (optIsNew) {
        var createdFiles = [{ fileName: fileName, fileContent: optFileContent }];
        var oldValues = getItem(createdFileKeyName, true);
        if (oldValues && Array.isArray(oldValues)) {
            createdFiles = createdFiles.concat(oldValues);
        }
        storeItem(createdFileKeyName, createdFiles, true);

    }

    return fileDivIndex;
};

var me = this;
document.getElementById('fileUpload').onclick = function (e) {
    me.uploadFile.click();
};

this.uploadFolder = this.uploadFolder || $("<input type='file' webkitdirectory multiple/>").css({
    'visibility': 'hidden',
    'display': 'none',
    "height": 20
});

document.getElementById('folderUpload').onclick = function (e) {
    me.uploadFolder.click();
};

$('.a-U-ag').click(function (e) {
    $('.a-U-ag').removeClass('a-U-ag-da');
    var parentTarget = $(e.target).closest('.a-U-ag');
    if (parentTarget) {
        parentTarget.addClass('a-U-ag-da');
    }
});

$('#sharedWithMeButton').click(function (e) {
    $('.mainDivs').css('display', 'none')
    $('#sharedwithmeDiv').css('display', '');
});

$('#myDriveButton').click(function (e) {
    $('.mainDivs').css('display', 'none')
    $('#mainContent').css('display', '');
});

$('#photoButton').click(function (e) {
    $('.mainDivs').css('display', 'none')
    $('#photoDiv').css('display', '');
});

$('#recentButton').click(function (e) {
    $('.mainDivs').css('display', 'none')
    $('#recentDiv').css('display', '');
});

$('#starsButton').click(function (e) {
    $('.mainDivs').css('display', 'none')
    $('#starsDiv').css('display', '');
});
