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

// gsap animation for .custom-jumbo
// gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ease: 'none', duration: 2});

gsap.from(".header-effect", {
    duration: 1,
    x: -350,
    ease: "back"
})

gsap.from(".user-form", {
  duration: 1.5, 
  opacity: 0, 
  scale: 0.99,
  delay: .75
});

//Scroll-to-top button
mybutton = document.getElementsByClassName('sticky-btn')[0];

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
    scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}