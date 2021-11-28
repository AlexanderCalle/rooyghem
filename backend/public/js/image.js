let currentPic;
let currIndex;

document.addEventListener('DOMContentLoaded', function () {

    let images = document.querySelectorAll('.interfaceinfoPhoto');

    images.forEach(function(el) {
        el.addEventListener("click", event => {
            currentPic = el;
            for(let i = 0; i < images.length; i++) {
                if(images[i] == currentPic) {
                    currIndex = i;
                }
            }
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

    document.getElementsByClassName('nextDown')[0].onclick = function () { 

        slideshow(currIndex - 1);

    }

    document.getElementsByClassName('nextUp')[0].onclick = function () { 
        
        slideshow(currIndex + 1);

    }

    function slideshow(n){
        if(n < 0) {
            // select element
            var idx = images.length - 1;
            const img = images[idx].querySelector("img");
            // display new image
            document.getElementById("img01").src = img.src;
            document.getElementById("myModal").style.display = "block";
            // set new image as current
            currentPic = images[idx];
            currIndex = idx;
        } else if(n > images.length - 1){
            // select element
            const img = images[0].querySelector("img");
            // display new image
            document.getElementById("img01").src = img.src;
            document.getElementById("myModal").style.display = "block";
            // set new image as current
            currentPic = images[0];
            currIndex = 0;
        } else {
            // search image with index
            for(var i = 0; i < images.length; i++){
                // if same index set image
                if(i == n){
                    // select image
                    const img = images[i].querySelector("img");
                    // display new image
                    document.getElementById("img01").src = img.src;
                    document.getElementById("myModal").style.display = "block";
                    // set new image as current
                    currentPic = images[i];
                    currIndex = i;
                }
            }
        }
    }
});
