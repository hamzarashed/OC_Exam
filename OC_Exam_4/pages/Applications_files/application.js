var uninstalledAppsCookieKeyName = "UnInstalledApps";
var installedAppsCookieKeyName = "InstalledApps";
var updatedAppsCookieKeyName = "UpdatedApps";

$(document).ready(function () {
    $('.uninstall-link').click(function (e) {
        var target = $(e.target);
        target.closest('tr').css('display', 'none');
        var uninstalledApps = [target.attr('name')];
        var apps = getItem(uninstalledAppsCookieKeyName, true);
        if (apps && apps.length > 0) {
            uninstalledApps = uninstalledApps.concat(apps)
        }
        storeItem(uninstalledAppsCookieKeyName, uninstalledApps, true);
    });


    $('.update-link').click(function (e) {
        var target = $(e.target);
        target.html('محدث').attr('disabled', 'disabled');

        //target.closest('tr').css('display', 'none');
        var updatedApps = [target.attr('name')];
        var apps = getItem(updatedAppsCookieKeyName, true);
        if (apps && apps.length > 0) {
            updatedApps = updatedApps.concat(apps);
        }
        storeItem(updatedAppsCookieKeyName, updatedApps, true);
    });
    
    $('.intsall-link').click(function (e) {
        var target = $(e.target);
        target.html('مثبت').attr('disabled', 'disabled');

        //target.closest('tr').css('display', 'none');
        var installedApps = [target.attr('name')];
        var apps = getItem(installedAppsCookieKeyName, true);
        if (apps && apps.length > 0) {
            installedApps = installedApps.concat(apps);
        }
        storeItem(installedAppsCookieKeyName, installedApps, true);
    });
    
});