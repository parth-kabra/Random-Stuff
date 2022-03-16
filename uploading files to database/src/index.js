let fileName = "";
let videoextensions = [".avi", ".m4p", ".mav", ".mp2", ".mp4", ".mpe", ".mpeg", ".mpg", ".mpv", ".webm", ".wmv"];
let imageextensions = [".apng", ".avif", ".gif", ".jfif", ".jpeg", ".jpg", ".pjp", ".pjpeg", ".png", ".svg", ".webp"];

function binary_search(extensions, x) {
    let start = 0,
        end = extensions.length - 1;

    while (start <= end) {
        let mid = Math.floor((start + end) / 2);

        if (extensions[mid] === x) return true;
        else if (extensions[mid] < x) start = mid + 1;
        else end = mid - 1;
    }

    return false;
}

function changevisibility(keep, remove1, remove2) {
    document.getElementById(keep).style.display = "block";
    document.getElementById(remove1).style.display = "none";
    document.getElementById(remove2).style.display = "none";
}

function popup(title, text, button, icon, success = true) {
    var TEXT;
    if (success) {
        const n = fileName.length;
        if (n - (n - fileName.lastIndexOf(".") + 1) <= 5) {
            TEXT = fileName + text;
        } else {
            TEXT = fileName.substr(0, 5) + "..." + fileName.substr(fileName.lastIndexOf(".")).toUpperCase() + text;
        }
    } else {
        TEXT = text;
    }
    swal({
        icon: icon,
        title: title,
        text: TEXT,
        button: button,
        className: "popup",
    });
}

function upload_file() {
    const btn = document.getElementById("upload");
    const file = document.getElementById("file_upload").files[0];
    const storageRef = firebase.storage().ref();
    const final = storageRef.child(`storage/${fileName}`);
    const task = final.put(file);
    task.on(
        "state_changed",

        function progress(progress) {
            popup("Processing...", "trying to upload file..", "Ok", "icons8-processing-100.png", false);
            const button = document.getElementsByClassName("swal-button")[0];
            button.style.background = "#FCD354";
            button.addEventListener("mouseover", function () {
                button.style.background = "#FCD354";
            });
        },

        function error(err) {
            swal.close();
            popup("Error", "File was not uploaded to database, please try again", "Ok", "icons8-multiply-100.png", false);
            const button = document.getElementsByClassName("swal-button")[0];
            button.style.background = "#E74C3C";
            button.addEventListener("mouseover", function () {
                button.style.background = "#E74C3C";
            });
        },

        function completed() {
            swal.close();
            popup("Success", " was successfully uploaded to database", "Aww yiss!", "okicon.png");
            const button = document.getElementsByClassName("swal-button")[0];
            button.style.background = "#32D96C";
            button.addEventListener("mouseover", function () {
                button.style.background = "#32D96C";
            });
        }
    );
}
function AlertFilesize() {
    if (window.ActiveXObject) {
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var filepath = document.getElementById("file_upload").value;
        var thefile = fso.getFile(filepath);
        var sizeinbytes = thefile.size;
    } else {
        var sizeinbytes = document.getElementById("file_upload").files[0].size;
    }

    var fSExt = new Array("Bytes", "KB", "MB", "GB");
    fSize = sizeinbytes;
    i = 0;
    while (fSize > 900) {
        fSize /= 1024;
        i++;
    }

    const filesize = Math.round(fSize * 100) / 100;
    if (fSExt[i] == "GB") {
        return false;
    } else if (filesize > 10 && fSExt[i] == "MB") {
        return false;
    }
    return true;
}

$(document).ready(() => {
    $(document).on("change", "#file_upload", function (evt) {
        if (!AlertFilesize()) {
            popup("Memory Limit Exceed", "Your file's size should be less than or equal to 10MB", "Ok", "icons8-warning-100.png", false);
            const button = document.getElementsByClassName("swal-button")[0];
            button.style.background = "#FCD354";
            button.addEventListener("mouseover", function () {
                button.style.background = "#FCD354";
            });
            return;
        }

        document.getElementById("upload").style.display = "block";

        fileName = evt.target.files[0].name;

        let img = false;
        let vid = false;
        let tofind = fileName.substr(fileName.lastIndexOf("."));

        if (binary_search(videoextensions, tofind)) {
            vid = true;
            img = false;
        } else if (binary_search(imageextensions, tofind)) {
            vid = false;
            img = true;
        }

        if (vid) {
            changevisibility("videoid", "imgPreview", "otherfile");

            var $source = $("#video_here");

            $source[0].src = URL.createObjectURL(this.files[0]);

            $source.parent()[0].load();
        } else if (img) {
            changevisibility("imgPreview", "videoid", "otherfile");

            const file = this.files[0];

            if (file) {
                let reader = new FileReader();

                reader.onload = function (event) {
                    $("#imgPreview").attr("src", event.target.result);
                };

                reader.readAsDataURL(file);
            }
        } else {
            changevisibility("otherfile", "videoid", "imgPreview");
        }
    });
});
