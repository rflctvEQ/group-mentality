// this sends a new ApprovedUserPost to the server to be saved in the db
newApprovedUserPost = async (event) => {
    event.preventDefault();

    const postTitle = document.querySelector('#postTitle').value.trim();
    // console.log(postTitle);
    const postContent = document.querySelector('#postContent').value.trim();
    // console.log(postContent);
    const responseContent = document.querySelector('#responseContent').value.trim();
    // console.log(responseContent);

    if (postTitle && postContent && responseContent) {
        console.log('all fields have been filled out')
        const response = await fetch('/api/moderator', {
            method: 'POST',
            body: JSON.stringify({ postTitle, postContent, responseContent }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/moderator/');
        } else {
            alert('Failed to create post')
        };
    } else {
        alert('You must include a title, post content, and a response before submitting!')
    }

    // window.location.href = '/moderator/';
};

// TODO: need to attach this fetch
// this gets the user's original post content by post id and redirects Moderator to 
getSingleUserPost = async (event) => {
    event.preventDefault();

    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/moderator/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace(`/moderator/${id}`);
        } else {
            alert(response.statusText);
        };
    };

    console.log('clicked user post');
};

// TODO: need to attach this fetch
// this deletes a user's post by post id (used for both deleting outright and deleting when a new AprrovedUserPost is created)
deleteUserPost = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/moderator/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.location.replace('/moderator');
        } else {
            alert('Failed to delete user\'s post');
        }
    }
    console.log('delete button clicked')
};

// if (document.querySelector('.newApprovedUserPostSubmit')) {
    document.querySelector('#newApprovedUserPostSubmit').addEventListener('click', newApprovedUserPost);
// };

if (document.querySelector('.user-post-list')) {
    document.querySelector('.open-btn').addEventListener('click', getSingleUserPost);
    document.querySelector('.delete-btn').addEventListener('click', deleteUserPost);
};
