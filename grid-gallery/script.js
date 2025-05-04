function openModal(imageSrc) {
    var modal = document.getElementById('myModal');
    modal.style.display = 'block';

    var fullScreenImage = document.getElementById('fullScreenImage');
    fullScreenImage.src = imageSrc;

    var closeButton = document.getElementsByClassName('close-button')[0];
    closeButton.onclick = function() {
        modal.style.display = 'none';
    };
}