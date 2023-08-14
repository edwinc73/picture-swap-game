const squares = document.querySelectorAll(".square")

let activeSquares = []
const squarePostions = ["pic-1","pic-2","pic-3","pic-4","pic-5","pic-6","pic-7","pic-8","pic-9"]

squares.forEach(square => {
  square.addEventListener("click", (e) =>{
    activeSquare(e)
    checkMove()
  })
});

const btn = document.querySelector(".btn")

const startListener = (e) => {
  const randomOrder = randomize();
  squares.forEach((square, index) => {
    square.classList.remove(`pic-${index + 1}`);
    square.classList.add(randomOrder[index]);
    console.log(square);
  });

  btn.removeEventListener("click", startListener);
};

btn.addEventListener("click", startListener);

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
  return ( sq1 + 1 == sq2 || sq1 + 3 == sq2 || sq1 - 1 == sq2 || sq1 - 3 == sq2 )
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

const randomize = () =>{
  return squarePostions.sort((a, b) => 0.5 - Math.random());
}

function startTimer() {
  let seconds = 0;
  const timerDisplay = document.querySelector(".btn");

  const updateTimerDisplay = () => {
    timerDisplay.textContent = formatTime(seconds);
    seconds++;
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const timerInterval = setInterval(updateTimerDisplay, 1000);

  return timerInterval;
}

const timerInterval = startTimer();
