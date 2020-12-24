function formatText() {
    var myTextArea = document.getElementById('feedDescription');
    var myTextAreaValue = myTextArea.value;
    var updatedText = myTextAreaValue + '<a href="(link hier)">' + '(naam van link)' + '</a>';
    myTextArea.value = updatedText;
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('link')
        .addEventListener('click', formatText);
    document.getElementById('vet')
        .addEventListener('click', function() {
            var myTextArea = document.getElementById('feedDescription');
            var myTextAreaValue = myTextArea.value;
            var updatedText = myTextAreaValue + '<b>(vet tekst)</b>';
            myTextArea.value = updatedText;
        });
    document.getElementById('cursief')
        .addEventListener('click', function() {
            var myTextArea = document.getElementById('feedDescription');
            var myTextAreaValue = myTextArea.value;
            var updatedText = myTextAreaValue + '<i>(vet cursief)</i>';
            myTextArea.value = updatedText;
        });
});