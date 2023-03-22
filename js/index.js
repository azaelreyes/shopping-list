const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear")
const itemFilter = document.getElementById("filter");



function addItem(e) {
    e.preventDefault();
    
    // Validate Input
    if (itemInput.value === '') {
      alert('Please add an item');
      return;
    }
  
    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(itemInput.value));
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
    // Reset Text Box
    itemInput.value = '';
    checkUI();
  }
  
  function removeItem(e){
    if(e.target.parentElement.classList.contains("remove-item")){

        if(confirm("Are you sure?")){
            e.target.parentElement.parentElement.remove();
            checkUI();
        }
    }
  }
  function clearItems (){
    while(itemList.firstChild){
        itemList.firstChild.remove();
    }
    checkUI();
  }

  function checkUI(){
    const items = itemList.querySelectorAll("li");
    if(items.length === 0){
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
  }

  itemForm.addEventListener("submit", addItem);
  itemList.addEventListener("click", removeItem);
  clearBtn.addEventListener("click", clearItems);

  checkUI();