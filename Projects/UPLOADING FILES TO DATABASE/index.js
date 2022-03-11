let fileName = "";

function navigate(newfile){
    window.location.href = newfile
}
let videoextensions = ['.avi', '.m4p', '.mav', '.mp2', '.mp4', '.mpe', '.mpeg', '.mpg', '.mpv', '.webm', '.wmv'];
let imageextensions = ['.apng', '.avif', '.gif', '.jfif', '.jpeg', '.jpg', '.pjp', '.pjpeg', '.png', '.svg', '.webp']
function binary_search(extensions, x){
    let start=0, end=extensions.length-1;
         
    while (start<=end){
        let mid=Math.floor((start + end)/2);
        if (extensions[mid]===x) return true;
        else if (extensions[mid] < x)
            start = mid + 1;
        else
            end = mid - 1;
    }
  
    return false;
}
function back(){
    history.back();
}
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
            document.getElementById("videoid").style.display = "block"
            document.getElementById("imgPreview").style.display = "none"
            document.getElementById("otherfile").style.display = "none"

            var $source = $('#video_here');
            $source[0].src = URL.createObjectURL(this.files[0]);
            $source.parent()[0].load();
        }
        else if(img){
            document.getElementById("videoid").style.display = "none"
            document.getElementById("otherfile").style.display = "none"
            document.getElementById("imgPreview").style.display = "block"
            
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
            document.getElementById("videoid").style.display = "none"
            document.getElementById("imgPreview").style.display = "none"
            document.getElementById("otherfile").style.display = "block"
        }
        //console.log(fileName)
        //console.log(img, vid)
    });

});