const rows = 10; //10x10 große Matrix
const columns = 10;
let bombs;
let remaining;
let revealed; //Variablen der Statusfelder

let matrix = new Array(rows); //Arrays für fields, pictures und das Feld (matrix)
let graphic = new Array(rows); //New Array weil ein Array mit einer bestimmten Länge erstellt werden soll
let field = new Array(rows);
  for (let i = 0; i < matrix.length; i++) { //Erstellt die Matrix Ebenen die gebraucht werden
     matrix[i] = new Array(columns);
     graphic[i] = new Array(columns);
     field[i] = new Array(columns)
  }

let status = document.getElementById('state'); //"status" speichert die Referenz/Zeigt auf das HTML Element Label 
status.addEventListener('click', init) //click event feuert bei mousedown, "click" feuert die init funktion

init(); //Initialisiere erste Funktion. Wird durch init() erst aufgerufen
 
function check(row, column) {
  if (column >= 0 && row >= 0 && column < columns && row < rows)  //da columns und rows den wert 10 haben, muss der abgefragte parameter kleiner als 10 sein.
    return matrix[row][column];
}
 
function init() {
  bombs = 10;
  remaining = bombs;  //einmalig hat jetzt remaining den Wert von bombs
  revealed = 0;
  status.innerHTML = ('Open hidden fields my boy'); //schreibt Text in HTML Body
  // for(counter, bedingung, abschlussoperation){
  //    operation
  // }
  // 0 10 20 30 40 50.....90
  // 1 11 ..................
  // 2 12 ..................
  // 3 13 ..................
  // 4 14 ..................
  // 5 15 ..................
  // 6 16 ..................
  // 7 17 ..................
  // 8 18 ..................
  // 9 19 ................99
  for (let row = 0; row < rows; row++)  //variable row ist nur in dieser for aktiv. Verschachtelte Schleife.
    for (let column = 0; column < columns; column++) {
      let index = row * columns + column; //index variable bekommt einen Wert
      field[row][column] = document.createElement('img'); //img ist tag
      field[row][column].src = 'initial.png'; //nehme das Bild aus dem Assetfolder 
      field[row][column].style = 'position:absolute;height:30px; width: 30px';  //30px höhe und 30 px breite. Absolute Position 
      field[row][column].style.top = 200 + row * 30; //abstand nach oben
      field[row][column].style.left = 200 + column * 30;  //abstand nach links
      field[row][column].addEventListener('mousedown', click);  //Bei einem Feld feuert das event "mousedown" die funktion click
      field[row][column].id = index; //jedes Bild bekommt eine ID -> Passend zur Matrix
      document.body.appendChild(field[row][column]); //wir fügen in den body nach und nach bildelemente mit eindeutiger id hinzu
      graphic[row][column] = 'initial'; //wir geben der ebene pic den stringwert initial
      matrix[row][column] = ''; //wir geben der ebene matrix einen leeren string
    }
 
  let buried = 0;
  while (buried < bombs) { //while schleife läuft durch solange placed einen kleineren wert als bombs hat
    let column = Math.floor(Math.random() * columns); //Math.floor -> abgerundete Werte, //Math.random -> gibt zufällige Zahl wieder
    let row = Math.floor(Math.random() * rows); //gibt einen Integer im bereich 0-9 zurück
 
    if (matrix[row][column] != 'bomb') { //angesteuertes Feld darf nicht Bombe sein -> Bedingung
      matrix[row][column] = 'bomb'; //wir speichern eine bombe
      buried++; //inkrementiere variable placed um 1
    }
  } 
   //!!!!!!Spielfeld wurde erstellt und die Bomben wurden gelegt!!!!!!!!!!

/* 
 Klicke auf x Feld und checke für mögliche Bomben

  1 2 3
  4 x 6
  7 8 9  
*/
  for (let column = 0; column < columns; column++)
    for (let row = 0; row < rows; row++) {
      if (check(row, column) != 'bomb') {
        matrix[row][column] =
          ((check(row + 1, column) == 'bomb') | 0) +
          ((check(row + 1, column - 1) == 'bomb') | 0) +
          ((check(row + 1, column + 1) == 'bomb') | 0) +
          ((check(row - 1, column) == 'bomb') | 0) +
          ((check(row - 1, column - 1) == 'bomb') | 0) +
          ((check(row - 1, column + 1) == 'bomb') | 0) +
          ((check(row, column - 1) == 'bomb') | 0) +
          ((check(row, column + 1) == 'bomb') | 0);
      }
    }
}
 
function click(event) {}

//Under Construction!!!!