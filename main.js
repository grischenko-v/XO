   


var xoLogic = (function(){
    var  resualt_arr = ['free', 'free', 'free',
   	                   'free', 'free', 'free',
   	                   'free', 'free', 'free'];
    var arr = [];
    var id_arr= ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    cycle_res = 0;
    square_res = 0;
    draw_res = 0;
    var second_player = false;
    var count = Math.round(Math.random());

   return {
       searchID: function(array, key){
 	                 for(var i = 0; i < array.length; i++){
 		               if(array[i] == key) return false;
 	                 }
 	                 return true;
                 },

      freeArray: function(array){
                   for(var i = 0; i < array.length; i++){
                      array[i] = 'free';
                    }
                 },

    scan_resualt: function(array, sign){ 
                    var div, element;           
                    if(array[0] === sign && array[1] === sign && array[2] === sign ||
                       array[3] === sign && array[4] === sign && array[5] === sign ||
                       array[6] === sign && array[7] === sign && array[8] === sign ||
                       array[0] === sign && array[3] === sign && array[6] === sign ||
                       array[1] === sign && array[4] === sign && array[7] === sign ||
                       array[2] === sign && array[5] === sign && array[8] === sign ||
                       array[0] === sign && array[4] === sign && array[8] === sign ||
                       array[6] === sign && array[4] === sign && array[2] === sign ){             
                          div = document.createElement('div');  
                          if(sign === 'cycle'){
                           div.className = 'restart restsigncycle'; 
                           count = 0;
                           cycle_res++;
                          }else { 
                           div.className = 'restart';
                           count = 1; 
                           square_res++;
                          }   
                          div.onclick = this.reset_field;
                          div.innerHTML = sign +  " WIN!";
                          element = document.getElementById('container');               
                          element.appendChild(div);
                          this.freeArray(array);
                     }     
                 },  

      drawCheck: function(array){
                   var div, element; 
                   if(array[0] !== 'free' && array[1] !== 'free' &&  array[2] !== 'free' &&
                      array[3] !== 'free' && array[4] !== 'free' &&  array[5] !== 'free' &&
                      array[6] !== 'free' && array[7] !== 'free' &&  array[8] !== 'free'){
                        div = document.createElement('div');           
                        div.className = 'restart restdraw';  
                        div.innerHTML = "DRAW!";
                        count = Math.round(Math.random());
                        div.onclick = this.reset_field;
                        draw_res++;
                        for(var i = 0; i < array.length; i++){
                          array[i] = 'free';
                         }
                        element = document.getElementById('container');               
                        element.appendChild(div);  
                        this.freeArray(array);
                     } 
                 },

          bounce: function(timeFraction){
                    for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
                      if (timeFraction >= (7 - 4 * a) / 11){
                     return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
                     }
                    }
                  },

    getRandomInt: function (min, max){
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                 },

      add_cyrcle: function(idValue){    
                    var element;
                    var div;   
                    var el_num;
                    var check;    
                    check = this.searchID(arr, idValue)     
                    if(check){
                      arr.push(idValue);
                      div = document.createElement('div');      
                      element = document.getElementById(idValue);
                      element.appendChild(div);      
                      switch(idValue) {
                        case 'one'  : el_num = 0; break;
                        case 'two'  : el_num = 1; break;      
                        case 'three': el_num = 2; break;      
                        case 'four' : el_num = 3; break;      
                        case 'five' : el_num = 4; break;      
                        case 'six'  : el_num = 5; break;      
                        case 'seven': el_num = 6; break;      
                        case 'eight': el_num = 7; break;
                        case 'nine' : el_num = 8; break;
                     }     
                     if(count % 2){  
                       div.className = 'sign cycle';
                       resualt_arr[el_num] = 'cycle';
               
                     } else{ 
                        div.className = 'sign sq';
                        resualt_arr[el_num] = 'square';
                      }
                    
                      animate({
                      	 duration: 1000,
                        timing: this.bounce,
                       draw : function(progress){
                        div.style.height = progress * 55 + '%';
                        div.style.width =  progress * 55 + '%';
                       }
                      });  
                      count++;     
               
                      this.scan_resualt(resualt_arr, 'square')
                      this.scan_resualt(resualt_arr, 'cycle')
                      this.drawCheck(resualt_arr);
                      }    
                    },  

    reset_field: function(){    
                   var element;
                   var currentId;       
                   while(currentId = arr.pop()){            
                         element = document.getElementById(currentId);         
                         element.removeChild(element.lastChild);        
                      }
                      element = document.getElementById('container');
                      element.removeChild(element.lastChild);                     
                      changeContent(square_res, cycle_res, draw_res);
                  },

  
       }
})();

 function changeContent( a,  b,  c){
                   var table
                   for(var i = 0; i < 3; i++){
                     table = document.getElementById('resualt-table').rows[i].cells;
                     table[1].innerHTML = ( i == 0) ? a : (i == 1) ? b : c ;  
                   }
                  }