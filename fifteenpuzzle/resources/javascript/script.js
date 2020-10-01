const tiles = [[], [], [], []];
let blank;
let container;

function addBoxes(){
  container = document.getElementsByClassName('container')[0];
  for (let x of Array(16).keys()){
    let tile = document.createElement('div');
    tile.setAttribute("class", "tile");
    const id = Math.floor(x / 4) + "_" + x % 4;
    tile.setAttribute("id", id);
    tile.innerHTML = x + 1;
    tile.onclick = tileClick;
    container.appendChild(tile);
    tiles[Math.floor(x/4)].push(tile);
  }
  blank = document.getElementById("3_3");
  blank.style.visibility = 'hidden';
  document.getElementById("shuffle").onclick = shuffle;
  document.onkeydown = move;
  shuffle();
}

let tileClick = event => {
  playSwap(event.target);
}

let swap = element => {
  const r = Number(element.id.split("_")[0]);
  const c = Number(element.id.split("_")[1]);
  const neighbours = getNeighbours(r, c, 4, 4);
  for (let n of neighbours){
    if (tiles[n[0]][n[1]].innerHTML == "16"){
      tiles[n[0]][n[1]].innerHTML = element.innerHTML;
      tiles[n[0]][n[1]].style.visibility = 'visible';
      element.innerHTML = "16";
      element.style.visibility = 'hidden';
      blank = element;
      return true;
    }
  } 
  return false;
}

let playSwap = element => {
  swap(element);
  if (solved()) alert("you did it");
}

let getNeighbours = (r, c, rows, cols) => {
  const possibleNeighbours = [[1, 0], [0, -1], [-1, 0], [0, 1]];
  const neighbours = [];
  for (let i of possibleNeighbours){
    if (isTile(i[0] + r, i[1] + c, rows, cols)) neighbours.push([i[0] + r, i[1] + c]);
  }
  return neighbours;
}

let isTile = (r, c, rows, cols) => {
  return r < rows && c < cols && r >= 0 && c >= 0;
}

let shuffle = () => {
  for (let x of Array(3000).keys()){
    r = Math.floor(Math.random() * 4);
    c = Math.floor(Math.random() * 4);
    swap(tiles[r][c]);
  }
}

let solved = () => {
  for (let i = 0; i < tiles.length; i++){
    for (let j = 0; j < tiles[i].length; j++){
      if (Number(tiles[i][j].innerHTML) != i * 4 + j + 1) return false;
    }
  }
  return true;
}

let move = function (evt) {
    evt = evt || window.event;
    let key;
    switch (evt.keyCode){
      case 38:
        evt.preventDefault();
        key = 'up';
        break;
      case 39:
        evt.preventDefault();
        key = 'right';
        break;
      case 40:
        evt.preventDefault();
        key = 'down';
        break;
      case 37:
        evt.preventDefault();
        key = 'left';
        break;
      default:
        break;
    }
    rearrange(key);
}

let rearrange = key => {
  const r = Number(blank.id.split("_")[0]);
  const c = Number(blank.id.split("_")[1]);
  if (key == 'up'){
    if (r != 3){
      playSwap(tiles[r + 1][c]);
    }
  }
  if (key == 'down'){
    if (r != 0){
      playSwap(tiles[r - 1][c]);
    }
  }
  if (key == 'left'){
    if (c != 3){
      playSwap(tiles[r][c + 1]);
    }
  }
  if (key == 'right'){
    if (c != 0){
      playSwap(tiles[r][c - 1])
    }
  }
}

addBoxes();