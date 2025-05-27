closeBtn = document.querySelector('.definition-screen button.close-btn')
closeBtn.addEventListener('click',()=>{
    document.querySelector('.definition-screen').classList.remove('active')
    document.querySelectorAll('.meanings-container').forEach(block=>{
        block.remove()
    })
})

playBtn = document.querySelector('.definition-screen button.pronunciation')
playBtn.addEventListener('click',()=>{
    document.querySelector('audio').play()
})



