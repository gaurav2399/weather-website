console.log('Server side client is running')

const weatherForm = document.querySelector('form')
const input =document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')

weatherForm.addEventListener('submit',(e) => {
    msg1.textContent = 'Loading...'
    e.preventDefault()
    if(input.value === ""){
        msg2.textContent = ''
        return msg1.textContent = "Please enter some Location!"
    }

    fetch("http://localhost:3000/weather?address='" + input.value + "'").then((response) => {
        response.json().then((data) => {
            if(data.error){
                msg1.textContent = data.error
                msg2.textContent = ''
                console.log(data.error)
            }else{
                msg1.textContent = data.location
                msg2.textContent = data.forecast
                console.log('Location is ' + data.location + ' and forecast data is ' + data.forecast)
            }
        })
    })

})