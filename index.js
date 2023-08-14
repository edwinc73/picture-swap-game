const squares = document.querySelectorAll(".square")

let activeSquares = []

squares.forEach(square => {
  square.addEventListener("click", (e) =>{
    activeSquare(e)
    checkMove()
  })
});

// onclick add to active squares
const activeSquare = (node) => {
  activeSquares.push(node)
}

const checkMove = ()=>{
  if(activeSquares.length >= 2){
    console.log("checking legal move")
    checkLegal(activeSquares)
  } else {
    console.log("awaiting more active squares")
  }
}

const checkLegal = (arr) => {
  const square1ID = parseInt(arr[0].target.id , 10)
  const square2ID = parseInt(arr[1].target.id , 10)

  if(legalMove(square1ID, square2ID)){
    console.log("legal move")
    swapAttr(arr[0], arr[1])
    win()
    removeActive()
  } else {
    console.log("illegal move")
    removeActive()
  }
}

const legalMove = (sq1 ,sq2) =>{
  return (sq1 + 1 == sq2 || sq1 + 4 == sq2 || sq1 + 3 == sq2 || sq1 - 1 == sq2 || sq1 - 4 == sq2 || sq1 - 3 == sq2 || sq2 - 2 == sq1)
}

const removeActive = () => {
  activeSquares = []
}

const swapAttr = (node1, node2) => {
  const value1 = node1.target.classList[2]
  const value2 = node2.target.classList[2]
  node1.target.classList.remove(value1)
  node1.target.classList.add(value2)
  node2.target.classList.remove(value2)
  node2.target.classList.add(value1)
}

const win = ()=>{
  let updatedSquares = document.querySelectorAll(".square")
  const ordered = () =>{
    const values = []
    updatedSquares.forEach(square => {
        values.push(square.textContent)
    })
    console.log(values)
    return values.every((val,index) => val === values.sort()[index])
  }
  console.log(ordered())
  if(ordered()){
    console.log("yo win")
  }
}
