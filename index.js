function schedulePost() {
    // Extract form data
    var message = document.querySelector('#message').value;
    var link = document.querySelector('#link').value;
    var caption = document.querySelector('#caption').value;
    var image = document.querySelector('#image').files[0];

    // Create form data object to send to server
    var formData = new FormData();
    formData.append('message', message);
    formData.append('link', link);
    formData.append('caption', caption);
    formData.append('image', image);

    // Send form data to server using fetch API
    fetch('/schedule', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('Post scheduled successfully! Facebook post ID: ' + data.facebook_post_id + ', Instagram post ID: ' + data.instagram_post_id);
    })
    .catch(error => {
        alert('Error scheduling post: ' + error);
    });
}