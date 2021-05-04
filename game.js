const easy = ["honda","diana","monta","james","solas","soria","calor","viajo","pelos","situa","rival","pieza","cerro","bando","anexo","danza","humor"]
const intermediate = ["conducta","primaria","advierte","catedral","calculos","billones","dividida","fiscalia","llegaban","proponen","decorado","semestre","escogido","criticar",
"manuales","percibir","adopcion"]
const hard = ["parentesis","democracia","permanecen","liberacion","comparable","literarias","establecen","operadores","recordando","montesinos","organizada","estructura","mortalidad",
"pronunciar","conflictos","washington","complicada"]
const easyLenght = ["0","1","2","3","4",]
const intermediateLenght = ["0","1","2","3","4","5","6","7",]
const hardLenght = ["0","1","2","3","4","5","6","7","8","9",]
let lenE = 17;
let lenI = 17;
let lenH = 17;
const playerDifficulty = sessionStorage.getItem("difficulty");
const restantes = document.getElementById("restantes")
const worngLetters = document.getElementById("mal")
const imgDiv = document.getElementById("img")
const body = document.getElementById('new')

const img = document.createElement('img')
img.className = "rounded mx-auto d-block"
let goodWords = [];
let counter = 0
let wordUser = []
let numbers = []
let randomIndex
let flag = false


let word;
let guion;

window.onload = function()
{
    firstWord()
    guiones()
}




document.addEventListener("keydown", letter);

function letter(event)
{
    const flag = lettersOnly(event)
    
    if(flag === true)
    {
        
        const key = event.key;
        const seeElection = document.getElementById("letra")
        seeElection.textContent = key
        if(wrongLetter(key) != false)
        {
            entryGame(key)
        }
    }
}

function lettersOnly(event) 
{
            var charCode = event.keyCode

            if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123))

                return true;
            else
                return false;
}

function putLetter(guion,key)
{
    keyU = key.toUpperCase(); 
    guion.textContent = keyU    
    wrongLetter(key,true)
}

function entryGame(key)
{
    switch(playerDifficulty)
    {
        case "facil":  
            for (var i = 0; i < 5; i++) 
            {
                if(key === word.charAt(i))
                {
                    const guion = document.getElementById(i)
                    keyU = key.toUpperCase()
                    guion.textContent = keyU
                    checkWin(key)
                }
            }
        break;
        case "intermedio":  
            for (var i = 0; i < 8; i++) 
            {
                if(key === word.charAt(i))
                {
                    const guion = document.getElementById(i)
                    keyU = key.toUpperCase()
                    guion.textContent = keyU
                    checkWin(key)
                }
            }
        break;
        case "dificil":  
            for (var i = 0; i < 10; i++) 
            {
                if(key === word.charAt(i))
                {
                    const guion = document.getElementById(i)
                    keyU = key.toUpperCase()
                    guion.textContent = keyU
                    checkWin(key)
                }
            }
        break;
    }
}

function checkWin(key)
{
    wordUser.push(key)
    wordUser = wordUser.filter(onlyUnique)
    let goodWordsUnique = goodWords.filter(onlyUnique)
    if(wordUser.length === goodWordsUnique.length)
    {
        win()
    }
}

function win()
{
    if(playerDifficulty === "facil")
    {
        lenE = lenE -1
        if(lenE === 0)
        {
            endGame()
            return
        }
    }
    if(playerDifficulty === "intermedio")
    {
        lenI = lenI -1
        if(lenI === 0)
        {
            endGame()
            return
        }
    }else { lenH = lenH - 1; if(lenH === 0){endGame(); return;}}
    restantes.textContent = lenE
    wordUser.length = 0
    while (worngLetters.firstChild)
     {
        worngLetters.removeChild(worngLetters.lastChild);
     }
     while (body.firstChild)
     {
        body.removeChild(body.lastChild);
     }
    firstWord()
    guiones()
}

function endGame()
{
    window.location.href = "end.html";
}

function firstWord() 
{
    img.setAttribute('src',`img/0.png`)
    imgDiv.appendChild(img)

    counter = 0
    if(numbers.length === 0)
    {
     randomIndex = Math.floor(Math.random() * 17);
     numbers.push(randomIndex)
    }

    while(numbers.indexOf(randomIndex) > -1 && flag === true)
    {
     randomIndex = Math.floor(Math.random() * 17);
    }

    if(flag === true)
    {
        numbers.push(randomIndex)
    }

    switch(playerDifficulty)
    {
        case "facil":  word = easy[randomIndex]
        break;
        case "intermedio":  word = intermediate[randomIndex]
        break;
        case "dificil":  word = hard[randomIndex]
        break;
    }
    flag = true
    getGoodWords(word)
    console.log(goodWords)
}

function getGoodWords(word) 
{
    goodWords.length = 0
    for (let i = 0; i < word.length; i++) 
    {
        goodWords.push(word.charAt(i))
    }
}


   

function wrongLetterElement(key)
{
    const newH5 = document.createElement('h5')
    newH5.className = "align-center text-black p-4 " ;
    newH5.textContent = `${key}`
    worngLetters.appendChild(newH5)
        
}

function updateImage()
{
    if(counter < 7 )
    {
        img.setAttribute('src',`img/${counter}.png`)
        img.className = "rounded mx-auto d-block"
    }else
    {
        defeat()
    }

}

function defeat()
{
    alert("Moriste")
    window.location.href = "index.html";
}

function wrongLetter(key)
{
    if(goodWords.indexOf(key) === -1) 
    {
        counter = counter + 1
        updateImage()
        wrongLetterElement(key)
        return false;
    } 
    return true;
}

function onlyUnique(value, index, self) 
{
    return self.indexOf(value) === index;
}
  
 

function guiones()
{
    if(playerDifficulty === "facil")
    {
        restantes.textContent = lenE
        easyLenght.forEach(arrayItem => 
        {
            const newH5 = document.createElement('h5')
            newH5.className = "align-center text-black p-4  " ;
            newH5.id = `${arrayItem}`
            newH5.textContent = '___'
            body.appendChild(newH5)
        })
    }else if (playerDifficulty === "intermedio")
    {
        restantes.textContent = lenI
        intermediateLenght.forEach(arrayItem => 
        {
            const newH5 = document.createElement('h5')
            newH5.className = "align-center text-black p-4  " ;
            newH5.id = `${arrayItem}`
            newH5.textContent = '___'
            body.appendChild(newH5)
        })
    }else{
        restantes.textContent = lenH
        hardLenght.forEach(arrayItem => 
        {
            const newH5 = document.createElement('h5')
            newH5.className = "align-center text-black p-4  " ;
            newH5.id = `${arrayItem}`
            newH5.textContent = '___'
            body.appendChild(newH5)
        })
    }
}