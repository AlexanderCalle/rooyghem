
document.addEventListener('DOMContentLoaded', function () {
      
    document.querySelectorAll('.interfaceinfoPhoto').forEach(function(el) {
        el.addEventListener("click", event => {
            const img = el.querySelector("img");
            if(img) console.log(img.src)
            document.getElementById("img01").src = img.src;
            document.getElementById("myModal").style.display = "block";
        })
    })
    
    document.getElementsByClassName('close')[0].onclick = function () {
        var modal = document.getElementById("myModal");
        modal.style.display = 'none';
    }
});