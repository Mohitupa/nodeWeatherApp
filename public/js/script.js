console.log("Public js........");

fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
})


const weatherForm =  document.getElementById('form_id')
weatherForm.addEventListener('submit', (e) => {
    var loc = document.getElementById("address").value;
    e.preventDefault()
    fetch('http://localhost:3000/weather?address='+loc+'').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            document.getElementById('output').innerHTML = '';
            document.getElementById('error').innerHTML = data.error;
        } else {
            console.log(data);
            document.getElementById('error').innerHTML = '';
            document.getElementById('output').innerHTML = data.location+`<hr>`+data.forcast;
        }
    })
})

})