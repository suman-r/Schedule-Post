// Add event listener to form submission
// document.querySelector('form').addEventListener('submit', function(event) {
    // event.preventDefault(); // Prevent default form submission
    function schedulePost(){ 
    var message = document.querySelector('#message').value;
    var link = document.querySelector('#link').value;
    var images = [];
    for (var i = 1; i <= imageCount; i++) {
        var image = document.querySelector('#image' + i).files[0];
        var caption = document.querySelector('#caption' + i).value;
        images.push({
            'image': image,
            'caption': caption
        });
    }
    // Use fetch to send the data to the server-side Python code
    fetch('/schedule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'message': message,
            'link': link,
            'images': images
        })
    })
    .then(function(response) {
        if (response.ok) {
            alert('Post scheduled successfully!');
        } else {
            alert('Error scheduling post: ' + response.statusText);
        }
    })
    .catch(function(error) {
        alert('Error scheduling post: ' + error.message);
    });
}
// });

// Dynamically add input fields for multiple images
var imageCount = 1;
function addImage() {
    imageCount++;
    var div = document.createElement('div');
    div.innerHTML = `
        <label for="image${imageCount}">Image ${imageCount}:</label>
        <input type="file" id="image${imageCount}">
        <br>
        <label for="caption${imageCount}">Caption ${imageCount}:</label>
        <textarea id="caption${imageCount}"></textarea>
        <br>
    `;
    document.querySelector('#images').appendChild(div);
}