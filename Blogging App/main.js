
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js"
import { doc, getFirestore, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"

const firebaseConfig = {
    measurementId: "G-XZJ1WD59HV"
    , apiKey: "AIzaSyCjz946COJObn13CppLSiGcn7cVX_cvwbU",
    authDomain: "auth-form-b5413.firebaseapp.com",
    projectId: "auth-form-b5413",
    storageBucket: "auth-form-b5413.appspot.com",
    messagingSenderId: "252237276692",
    appId: "1:252237276692:web:19a25cc6f3787e4ac62901"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app);

const logoutButton = document.getElementById('logout-button');

logoutButton.addEventListener('click', (e) => {
    signOut(auth).then(() => {
        // Sign-out successful.

        window.location.href='index.html'
    }).catch((error) => {
        // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    });
});
let userFullName;

auth.onAuthStateChanged((user) => {
    if (user) {

        // User login hoga to id milegi user login hai

        const userUID = user.uid; // uid agayi user ki
        console.log("User UID:", userUID);

        // Firestore se id get kro

        const userRef = doc(db, 'users', userUID);

        getDoc(userRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    userFullName = userData.firstName + ' ' + userData.lastName;

                    // p element update hogy hai apka

                    const navTextElement = document.querySelector('.nav-text');
                    navTextElement.textContent = userFullName;
                } else {
                    console.log('User data not found in Firestore.');
                }
            })
            .catch((error) => {
                console.error('Error retrieving user data:', error);
            });
    } else {
        // User is not authenticated
        console.log("User is not authenticated.");
    }
});



// text area form validation panchait

const textarea = document.getElementById('textarea-input');
const charCount = document.getElementById('charCount');

textarea.addEventListener('input', function () {
    const text = this.value;
    const textLength = text.length;

    if (textLength < 100) {
        //  value 100 se kam anhi
        this.setCustomValidity('Minimum character limit is 100.');
    } else if (textLength > 3000) {
        // value 3000 se ziada nahi
        this.value = text.slice(0, 3000);
        this.setCustomValidity('Maximum character limit is 3000.');
    } else {
        this.setCustomValidity('');
    }

    // p run krega sath sath
    charCount.textContent = `Characters remaining: ${3000 - textLength}`;
});


const publishBlog = document.getElementById('publish-blog')

publishBlog.addEventListener('click', () => {

    const title = document.getElementById('title-input').value;
    const textarea = document.getElementById('textarea-input').value;

    let blogItem = document.createElement('li')
    blogItem.className = 'list'

    // all the if statements of title and text area

    if (title.trim() === '' || textarea.trim() === '') {
        alert('Both Title and Textarea are required.');
        return
    }
    if (title.trim() === '') {
        alert('Enter Title First')
        return
    }
    if (textarea.trim() === '') {
        alert('Enter Title First')
    }
    if (title.length < 5 || title.length > 50) {
        alert('title should be between 5 and 50 characters')
        return
    }
    if (textarea.length < 100) {
        alert('blog should be atleasat 100 characters long')
        return
    }
    if (textarea.length > 3000) {
        alert('blog should not exceed 3000 characters long')
    }
    blogItem.innerHTML = `
    <div class="uploaded-blog">
        <div class="upper-sec">
            <div class="profile"><img class="img" src="img/images.jpg"></div>
            <div class="name-sec">
                <div class="title-div">
                    <p class="title">${title}</p>
                </div>
                <p class="name-date">${userFullName}</p>
            </div>
        </div>
        <div class="blogpubmain">
                <p class='textareavalue'>${textarea}</p>
            </div>
    </div>
    `;
    const blogList = document.getElementById('list');
    blogList.appendChild(blogItem);

    // add last added in first

    blogList.insertBefore(blogItem, blogList.firstChild);

    // mpty input fields
    document.getElementById('title-input').value = '';
    document.getElementById('textarea-input').value = '';

})

