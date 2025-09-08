export const crosscheckProductQuantity = (inventory_no, currVal) => {
     if((currVal+1) > inventory_no){
          return false;
     }else{
         return true;
     }
}