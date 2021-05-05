// app functionality -- Erick's stuff
let userEl = $('#userName');
let passwordEl = $('#password');
let passwordConfirmEl = $('#passwordConfirm');
let signUpBtnEl = $('#signUpButton');
let loginBtnEl = $('loginButton');
let postBtnEl =  $('postButton');
let userSendBtnEl = $('sendMessageButton');


loginBtnEl.on("click","login", function() {

    
});


signUpBtnEl.on("click", "signUp", function() {

    //checks to see if passwords match
    if(passwordEl === passwordConfirmEl) {

        //first fetch to access stored usernames and seed new username into data
        fetch().then((response) => {
            console.log('resolved', response);
        }).catch((err) => {
            console.log('rejected', err);
        })
    }
    else {
        //this will add a class which toggles a visible lign of text underneath the password input saying "passwords don't match".
        addclass('passDontMatch', "passConfirm")
    }
})

postBtnEl.on("click","postButton", function(){

    // fetch to get access to stored comment with new reply
    fetch().then((response) => {
        console.log('resolved', response);
    }).catch((err) => {
        console.log('rejected', err);
    })
}
)

replyBtnEl.on("click", "clickButton", function(){

    //function to add a text box div below the user comment where the moderator can type their reply before posting.

})

