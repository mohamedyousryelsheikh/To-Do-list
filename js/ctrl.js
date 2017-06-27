app.controller('customersCtrl', function($scope, $location) {
    $scope.myUrl = $location.absUrl();
    $scope.showError = false;
    $scope.editModeOn = false;
    $scope.errorMsg = "item already exists";
    $scope.shoppingList;
    if(localStorage["mycars"].length == 0)
    {
        $scope.shoppingList = [];
        alert("empty list");
    }
    //$scope.shoppingList = ['milk','chocolate','banana'];
    else{
        $scope.shoppingList = JSON.parse(localStorage["mycars"]);
    }

    //localStorage.setItem("localShoppingList", JSON.stringify($scope.shoppingList));
    //var retrievedData = localStorage.getItem("localShoppingList");
    //$scope.shoppingListRetrieved = JSON.parse(retrievedData);
      //localStorage["mycars"] = JSON.stringify($scope.shoppingList);
   //add item function
    $scope.addItem = function(){
        if($scope.shoppingList.indexOf($scope.newItem) !== -1) {
             alert('item already exists!');
             $scope.showError = true;
        }
        else
            {   
                $scope.shoppingList.push($scope.newItem);
                $scope.showError = false;  
                localStorage["mycars"] = JSON.stringify($scope.shoppingList);
                //localStorage.setItem("localShoppingList", JSON.stringify(shoppingList)); 
            }
        $scope.newItem = null; //to empty the text field after adding the item
    }
    // remove item function
    $scope.removeItem = function(index){
        $scope.shoppingList.splice(index,1);
         localStorage["mycars"] = JSON.stringify($scope.shoppingList);
    }
    //clear item field function
    $scope.clearMsg = function(){
        $scope.showError = false;
        
    }
    //edit item function
    $scope.editItem = function(index){
        
        var editField = document.getElementById('list_edit_field_'+index);
        var editDoneBtn = document.getElementById("edit_btn_"+index);
        var editedItemText = document.getElementById("item_text_"+index);   
        
        //switching to turn off the edit mode
        if(document.getElementById('list_edit_field_'+index).classList.contains("edit-mode-on"))
            {
                editField.style.display = "none";
                editField.className = "edit-mode-off";
                editDoneBtn.innerHTML = "Edit";
                editedItemText.style.display="inline-block";
            }
       //switching to turn on the edit mode
       else if(document.getElementById('list_edit_field_'+index).classList.contains("edit-mode-off"))
            {
                editField.style.display = "block";
                editField.className = "edit-mode-on";
                editField.focus();
                editDoneBtn.innerHTML = "Done";
                editedItemText.style.display="none";
            }
        else
            alert("error");
    }
    //checked item function
    $scope.checkedItem = function(index){

        var itemToBeChecked= document.getElementById("mark_item_done_"+index);
        var editedItemText= document.getElementById("item_text_"+index);
        var editDoneBtn = document.getElementById("edit_btn_"+index);
        var removeItem = document.getElementById("remove_btn_"+index)
        if(itemToBeChecked.checked == true)
            {
                editedItemText.classList.add("marked-item");
                editDoneBtn.hidden = true;
                removeItem.hidden = true;
            }
        else
            {
                editedItemText.classList.remove("marked-item");
                editDoneBtn.hidden = false;
                removeItem.hidden = false;
            }   
    }

   
});
app.directive('ngConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
    }])
