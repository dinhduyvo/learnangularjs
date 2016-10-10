var numberArray = [1,2,3,4,5,6,7,8,9,10];
console.log("Number array: ", numberArray);

function above5Filter(value){
  return value > 5;
}

var filterNumberArray = numberArray.filter(above5Filter);

console.log("Filtered number array: ", filterNumberArray);

var shoppingList = ["Ronaldo", "Messi", "Neymar", "Griezman"];
console.log("Shopping list: ", shoppingList);

var searchValue = "na";
function containFilter(value) {
    return value.indexOf(searchValue) !== -1;
}

var searchedShoppingList = shoppingList.filter(containFilter);
console.log("Searched Shopping List: ", searchedShoppingList);
