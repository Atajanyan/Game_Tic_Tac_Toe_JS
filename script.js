let boxes =[...document.querySelectorAll('.box')]
let restart = document.querySelector('button')
let turn = document.querySelector('h1')
let winingCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
let won = null
let queue = false
let clickCount = 0
turn.innerHTML = `turn: X`

function wining(){
    for (let i = 0; i < winingCombinations.length; i++) {
       let [a,b,c] = winingCombinations[i]
        if(boxes[a].innerHTML && boxes[a].innerHTML === boxes[b].innerHTML && boxes[a].innerHTML === boxes[c].innerHTML){
            won = true
            boxes[a].classList.add('win')
            boxes[b].classList.add('win')
            boxes[c].classList.add('win')
        }
    }
}


boxes.forEach(box=>{
    box.disabled = false
    box.addEventListener('click',()=>{
       if(!won){
           if(queue && !box.disabled){
            queue = !queue
            box.innerHTML = 'O'
            box.disabled = true 
            clickCount++   
        }else if(!box.disabled && !queue){
            queue = !queue
            box.innerHTML = 'X'
            box.disabled = true 
            clickCount++
        }
        wining()
    }
    !won?turn.innerHTML = `turn: ${!queue ?'X':'O'}`:turn.innerHTML = `${queue?'X - WON!!!':'O - WON!!!'}`
    if(clickCount===9 && !won)turn.innerHTML = 'The game ended in a draw'
    if(won)turn.style.color = 'green'
    
    })
    
})

restart.addEventListener('click',()=>{
    won = null
    queue = false
    clickCount = 0
    turn.innerHTML = `turn: X`
    turn.style.color = 'black'
    boxes.forEach(box=>{
        box.innerHTML = ''
        box.disabled = false
        box.classList.remove('win')
    })
})

