const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();


//https://aaryan-musk.github.io/javascript-amazon-project-main/

// Response Status code starting from 4 (e.g. Error 404) means user machine issue. and starting with 5 means backend machine issue

