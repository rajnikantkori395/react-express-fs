// function narcissistic(value) {
//     // Code me to return true or false
//     let sum = 0
//     let arr = value.toString().split('')
//     let digit = arr.length
//     // sum = arr.reduce((t,u)=>(parseInt(t)**digit+parseInt(u)**digit))
//     for(let i=0;i<arr.length;i++){
//         sum = sum + (+arr[i])**digit
//     }
//     console.log()
//     if(sum===value){
//      console.log(true);
//     }
//     else{
//      console.log(false);  
//     }
//   }

//   narcissistic(371)
  