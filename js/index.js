const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear")
const itemFilter = document.getElementById("filter");
const formBtn = itemForm.querySelector('button')
let isEditMode = false;

function displayItems(){
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach(item => addItemToDOM(item));
  checkUI();
}

function onAddItemSubmit(e) {
    e.preventDefault();
    
    // Validate Input
    if (itemInput.value === '') {
      alert('Please add an item');
      return;
    }
    if(isEditMode){
      const itemToEdit = itemList.querySelector(".edit-mode");
      removeItemFromStorage(itemToEdit.textContent);
      itemToEdit.remove();
      isEditMode = false;
    }

    if(checkIfItemExists(itemInput.value)){
      alert('That Item already exists')
      return;
    }

    //Create Item DOM Element
    addItemToDOM(itemInput.value);
    addItemToStorage(itemInput.value)
    // Reset Text Box
    itemInput.value = '';
    checkUI();
  }
function onClickItem(e){
  if (e.target.parentElement.classList.contains('remove-item')){
    removeItem(e.target.parentElement.parentElement);
  } else{
    setItemToEdit(e.target)
  }
}
function setItemToEdit(item){
  isEditMode = true;

  itemList.querySelectorAll('li').forEach((i)=>i.classList.remove('edit-mode'))

  item.classList.add("edit-mode")
  formBtn.innerHTML = '<i class ="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = "#228B22";
  itemInput.value = item.textContent;
}

function removeItemFromStorage(item){
  let itemsFromStorage = getItemsFromStorage();
  //Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i)=> i != item);
  //Reset localStorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function addItemToDOM(item){
  // Create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));
  // Create Button
  const button = document.createElement('button');
  button.className = 'remove-item btn-link text-red';
  // Create Icon
  const icon = document.createElement('i');
  icon.className = "fa-solid fa-xmark";
  // Append Everything
  button.appendChild(icon);
  li.appendChild(button);
  itemList.appendChild(li);
}

function getItemsFromStorage(){
  let itemsFromStorage;
  // If/else checks for empty local storage, then gets it
  if(localStorage.getItem('items')===null){
    itemsFromStorage=[];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
}

function addItemToStorage(item){
  const itemsFromStorage = getItemsFromStorage();
  //these two lines adds new item to storage
  itemsFromStorage.push(item);
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function removeItem(item){
  if(confirm("Are you sure?")){
      item.remove(); //removes from dom
      removeItemFromStorage(item.textContent) //removes from storage
      checkUI();
  }

}

function clearItems (){
  while(itemList.firstChild){
      itemList.firstChild.remove();
  }
  //Clear From Local Storage
  localStorage.removeItem('items');

  checkUI();
}

function filterItems(e){
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item)=>{
      const itemName = item.firstChild.textContent.toLowerCase();
      if(itemName.indexOf(text) != -1){
          item.style.display = 'flex';
      } else{
          item.style.display = 'none';
      }
  })
};

function checkUI(){
  const items = itemList.querySelectorAll("li");
  if(items.length === 0){
      clearBtn.style.display = 'none';
      itemFilter.style.display = 'none';
  } else {
      clearBtn.style.display = 'block';
      itemFilter.style.display = 'block';
  }
  formBtn.innerHTML = "<i class ='fa-solid fa-plus'></i> Add Item";
  formBtn.style.backgroundColor="#333"
  isEditMode=false;
  
}
function checkIfItemExists(item){
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
  
}
itemForm.addEventListener("submit", onAddItemSubmit);
itemList.addEventListener("click", onClickItem);
clearBtn.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", displayItems);
checkUI();