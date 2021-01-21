const gridContainer = document.querySelector("#grid")
let gridSize = 16

const buttonDiv = document.querySelector("#buttonDiv")

const clearButton = buttonDiv.querySelector("#clear")
const resizeButton = buttonDiv.querySelector("#size")
const greyButton = buttonDiv.querySelector("#grey")
const randomButton = buttonDiv.querySelector("#random")
const colorSelector = buttonDiv.querySelector("#select")
const eraseButton = buttonDiv.querySelector("#eraser")
const colorSelectDiv = buttonDiv.querySelector("#selectDiv")

createGrid(gridSize)

let brushToggle ='off' 
gridContainer.addEventListener('click', event => {
    brushToggle === 'off' ? brushToggle = 'on' : brushToggle = 'off'
})

clearButton.addEventListener("click", event => {
    const gridSquares = gridContainer.querySelectorAll('div.gridSquare')
    gridSquares.forEach(gridSquare => gridSquare.style.background = '#fff')
})

resizeButton.addEventListener("click", event => {
    deleteGrid()
    let newSize = prompt("Enter new grid size (10-64)")
    if (newSize < 10 || newSize > 64) {
        newSize = 16
    }
    createGrid(newSize)
})

greyButton.addEventListener("click", event => {
    const gridSquares = gridContainer.querySelectorAll('div.gridSquare')
    gridSquares.forEach(gridSquare => {
        gridSquare.count = 0
        gridSquare.opacity = 0.1
        gridSquare.addEventListener('mouseenter', event => {
            if (brushToggle === 'on') {
                gridSquare.count += 1
                gridSquare.opacity = 0.1 * gridSquare.count
                gridSquare.style.background = `rgba(0,0,0,${gridSquare.opacity})` 
            }
        })
    })
})

randomButton.addEventListener("click", event => {
    const gridSquares = gridContainer.querySelectorAll('div.gridSquare')
    gridSquares.forEach(gridSquare => {
        gridSquare.addEventListener('mouseenter', event => {
            if (brushToggle === 'on') {
            gridSquare.style.background = randomColor()
            }
        })
    })

})

colorSelector.addEventListener('input', event => {
    let selectedColor = colorSelector.value 
    draw(selectedColor)
})

colorSelectDiv.addEventListener('click', event => {
    let selectedColor = colorSelector.value 
    draw(selectedColor)
})

eraseButton.addEventListener("click", event => {
    draw('#FFF')
})

function draw(color) {
    const gridSquares = gridContainer.querySelectorAll('div.gridSquare')
    gridSquares.forEach(gridSquare => {
        gridSquare.addEventListener('mouseenter', event => {
            if (brushToggle === 'on') {
            gridSquare.style.background = color
            }
        })
    })
}

function deleteGrid() {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.lastChild)
    }
}

function createGrid(size) {
    for (let i = 1; i<= Math.pow(size, 2); i++) {
        const gridDiv = document.createElement('div')
        gridDiv.classList.add('gridSquare')
        gridContainer.appendChild(gridDiv)
    }
    const root = document.querySelector(':root')
    root.style.setProperty('--colNum', size)

    const gridSquares = gridContainer.querySelectorAll('div.gridSquare')
    gridSquares.forEach(gridSquare => {
        gridSquare.addEventListener('mouseenter', event => {
            if (brushToggle === 'on') {
            gridSquare.style.background = '#ff0000'
            }
    })
})
}

function randomColor() {
    let randomRedValue = Math.floor(Math.random() * 255)
    let randomBlueValue = Math.floor(Math.random() * 255)
    let randomGreenValue = Math.floor(Math.random() * 255)

    let brushColor = `rgb(${randomRedValue}, ${randomBlueValue}, ${randomGreenValue})`
    return brushColor
}
