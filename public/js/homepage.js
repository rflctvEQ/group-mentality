// TODO: render moderator home button only if moderator authentication

// app functionality -- Erick's stuff
newUserPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#postTitle').value.trim();
    const content = document.querySelector('#postContent').value.trim();

    if (title && content) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('You did it! One of our trusted mental health experts will review your post shortly. If approved for the site, your message will be responded to and posted to the main forum!')
            document.location.reload();
        } else {
            alert('You must be logged in to create posts.')
            document.location.replace('/login');
        };
    };
};

document.querySelector('.send-post-btn').addEventListener('click', newUserPost);