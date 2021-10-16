let list = [
  {emp : "10%"},
  {emp : "20%"},
  {emp : "30%"},
  {emp : "40%"},
  {emp : "50%"}
]

let myList = [];

for (i of list) {
  myList.push(i.emp)
}
console.log(myList);