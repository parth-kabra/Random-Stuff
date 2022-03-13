/* Global Variables */
let fileName = "";
let videoextensions = ['.avi', '.m4p', '.mav', '.mp2', '.mp4', '.mpe', '.mpeg', '.mpg', '.mpv', '.webm', '.wmv'];
let imageextensions = ['.apng', '.avif', '.gif', '.jfif', '.jpeg', '.jpg', '.pjp', '.pjpeg', '.png', '.svg', '.webp']

/* Functions */
function navigate(newfile){ window.location.href = newfile }

function back(){ history.back() }

function binary_search(extensions, x){

    let start=0, end=extensions.length-1;
         
    while (start<=end){

        let mid=Math.floor((start + end)/2);

        if (extensions[mid]===x) return true;

        else if (extensions[mid] < x) start = mid + 1;

        else end = mid - 1;
    }
  
    return false;
}

function changevisibility(keep, remove1, remove2){
    document.getElementById(keep).style.display = "block";
    document.getElementById(remove1).style.display = "none";
    document.getElementById(remove2).style.display = "none";
}

function popup(title, text, button, icon){
    var TEXT;
    const n = fileName.length;
    if(n - (n - fileName.lastIndexOf('.') + 1) <= 5){
        TEXT = fileName + text;
    }
    else{
        TEXT = fileName.substr(0, 5) + '...' + fileName.substr(fileName.lastIndexOf('.')).toUpperCase() + text
    }
    swal({
        icon : icon,
        title: title,
        text: TEXT,
        button: button,
        className : "popup"
    });
}

/* EventListener Callback for uploading a file */
$(document).ready(() => {

    $(document).on("change", "#file_upload", function(evt) {

        document.getElementById("upload").style.display = "block";
        
        fileName = evt.target.files[0].name;
        
        let img = false;
        let vid = false;
        let tofind = fileName.substr(fileName.lastIndexOf('.'))
        
        if(binary_search(videoextensions, tofind)){
            vid = true;
            img = false;
        }
        
        else if(binary_search(imageextensions, tofind)){
            vid = false;
            img = true;
        }
        
        if(vid){

            changevisibility("videoid", "imgPreview", "otherfile")

            var $source = $('#video_here');

            $source[0].src = URL.createObjectURL(this.files[0]);

            $source.parent()[0].load();
        }
        else if(img){

            changevisibility("imgPreview", "videoid", "otherfile")

            const file = this.files[0];
            
            if (file) {
                let reader = new FileReader();
    
                reader.onload = function (event) {
                    
                        $("#imgPreview")
                        .attr("src", event.target.result);
                };
    
                reader.readAsDataURL(file);
            }
        }
        
        else{
            
            changevisibility("otherfile", "videoid", "imgPreview")
            
        }
    });
});