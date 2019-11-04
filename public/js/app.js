console.log('Client side loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{

//     response.json().then((data)=>{
//         console.log(data)
//     })

// })




const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent=''
messageTwo.textContent=''

weatherform.addEventListener('submit',(e)=>{

    e.preventDefault()
    //console.log('testing')
    messageOne.textContent='Loading'
    messageTwo.textContent=''
    const location = search.value
    fetch('/weather?address=' + location).then((response)=>{
    
        response.json().then((data)=>{
            console.log(data)
            if(data.error){
                messageOne.textContent='error'
            }else{
                messageOne.textContent=data.city
                messageTwo.textContent=data.location
            }
        })
    
    })
})