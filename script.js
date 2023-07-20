//Criação da classe:
class VirtualPet {
    constructor() {
        this.name = 'VirtualPet'
        this.life = 100
        this.hunger = 0
        this.happiness = 100
    }

    gainHealth(amount) {
        this.life += amount
    }

    loseHealth(amount) {
        this.life -= amount
    }

    gainHunger(amount) {
        this.hunger += amount
    }

    loseHunger(amount) {
        this.hunger -= amount
    }

    gainHappiness(amount) {
        this.happiness += amount
    }

    loseHappiness(amount) {
        this.happiness -= amount
    }
}

// Criar um pet a partir da classe:
const pet = new VirtualPet()

// Definição das variáveis: 
//Tela de Início:
const $start_screen = document.querySelector('.start-screen')
const $pets_img = document.querySelectorAll('.pets img')
const $start_btn = document.querySelector('.wrap .start-screen button')
let selectedPet = ''

//Tela de Jogo:
const $game_screen = document.querySelector('.game-screen')
const $pet_img = document.querySelector('.pet-img')
const $life = document.querySelector('.life')
const $hunger = document.querySelector('.hunger')
const $happiness = document.querySelector('.happiness')
const $feed = document.querySelector('.feed')
const $pet_animal = document.querySelector('.pet_animal')

//Tela de Fim de Jogo:
const $end_game_screen = document.querySelector('.end-game-screen')
const $end_game_text = document.querySelector('.end-game-screen p')
const $restart_btn = document.querySelector('.restart-btn')

//Variáveis de controle do decaimento de status:
let setStatus
let time = 2000

$game_screen.classList.add('hide')
$end_game_screen.classList.add('hide')

//Seleciona a imagem do pet antes de iniciar o jogo:
$pets_img.forEach(img => {
    img.addEventListener('click', () => {
        $pets_img.forEach(image => {
            image.classList.remove('selected')
        })
        img.classList.toggle('selected')
        selectedPet = img.src
    })
})

//Fecha a tela de inicio de jogo e seleciona a imagem do pet escolhido:
$start_btn.addEventListener('click', () => {
    if (selectedPet == '') {
        alert('Escolha um pet para começar o jogo')
        return
    }

    $pet_img.setAttribute('src', selectedPet)
    $start_screen.style.display = 'none'
    $game_screen.style.display = 'flex'

    gameStarts()
})

// Atualizar status na tela:
const updateStatus = () => {
    $life.innerHTML = `Vida: ${pet.life}%`
    $hunger.innerHTML = `Fome: ${pet.hunger}%`
    $happiness.innerHTML = `Felicidade: ${pet.happiness}%`

}

//Reinicia o jogo após a 'morte' do pet
$restart_btn.addEventListener('click', () => {
    pet.life = 100
    pet.hunger = 0
    pet.happiness = 100

    selectedPet = ''
    $pets_img.forEach(image => {
        image.classList.remove('selected')
    })

    $end_game_screen.style.display = 'none'
    $game_screen.style.display = 'none'
    $start_screen.style.display = 'flex'
    updateStatus()
})

// Mostra a tela de fim de jogo
const showDeathScreen = () => {
    let deathCause = ''

    if (pet.life <= 0) {
        deathCause = 'pouca vida'
    } else if (pet.hunger >= 100) {
        deathCause = 'falta de comida'
    } else if (pet.happiness <= 0) {
        deathCause = 'falta de carinho'
    }

    $end_game_text.innerHTML = `Seu Pet Morreu por ${deathCause}`
    $end_game_screen.style.display = 'flex'
}

// 'Mata' o pet:
const killPet = () => {
    showDeathScreen()
    clearInterval(setStatus)
}

// Gera um número aleatório entre 0 e 5:
const generateRandomNumber = () => {
    return Math.floor(Math.random() * 6)
}

// Decaimento de status com o tempo:
const decreaseStatus = () => {
    if (pet.life <= 0 || pet.hunger >= 100 || pet.happiness <= 0) {
        killPet()
        return
    }

    n = generateRandomNumber()
    pet.loseHealth(n)
    n = generateRandomNumber()
    pet.gainHunger(n)
    n = generateRandomNumber()
    pet.loseHappiness(n)

    updateStatus()
}

// Alimentar pet ao clicar no botão:
const feedPet = () => {
    clearInterval(setStatus)

    for (let i = 1; i <= 10; i++) {
        if (pet.life < 100) {
            pet.gainHealth(1)
        }
    }

    for (let i = 1; i <= 5; i++) {
        if (pet.hunger > 0) {
            pet.loseHunger(1)
        }
    }
    updateStatus()

    setStatus = setInterval(decreaseStatus, time)
}

$feed.addEventListener('click', feedPet)

// Dar carinho no pet ao clicar no botão:
const pet_animal = () => {
    clearInterval(setStatus)

    for (i = 1; i <= 10; i++) {
        if (pet.happiness < 100) {
            pet.gainHappiness(1)
        }
    }

    updateStatus()
    setStatus = setInterval(decreaseStatus, time)
}

$pet_animal.addEventListener('click', pet_animal)

updateStatus()

const gameStarts = () => {
    setStatus = setInterval(decreaseStatus, time)
}