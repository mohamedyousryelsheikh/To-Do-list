app.controller('customersCtrl', function($scope, $location) {
    $scope.myUrl = $location.absUrl();
    $scope.showError = false;
    $scope.editModeOn = false;
    $scope.errorMsg = "item already exists";
    $scope.shoppingList = ['milk','chocolate','banana'];
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
            }
        $scope.newItem = null; //to empty the text field after adding the item
    }
    // remove item function
    $scope.removeItem = function(index){
        $scope.shoppingList.splice(index,1);
    }
    //clear item field function
    $scope.clearMsg = function(){
        $scope.showError = false;
        
    }
    //edit item function
    $scope.editItem = function(list){
        $scope.newItem = list;
        $scope.editModeOn = true;
        

    }
    
   
});
app.directive('setFocus',function(){
     return {
        link:  function(scope, element, attrs){
          element.bind('click',function(){
               document.querySelector('#' + attrs.setFocus).focus();
           })
        }
      }
})