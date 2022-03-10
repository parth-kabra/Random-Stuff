let fileName = "";
/*function print(){
    console.log(fileName);
}*/
function navigate(newfile){
    window.location.href = newfile
}
$(document).ready(function(){
    $('#file_upload').change(function(e){
        fileName = e.target.files[0].name;
    });
});
$(document).ready(() => {
    $("#file_upload").change(function () {
        const file = this.files[0];
        if (file) {
            let reader = new FileReader();
            document.getElementById("upload").style.display = "block";
            reader.onload = function (event) {
                $("#imgPreview")
                  .attr("src", event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
});
