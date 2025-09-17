const id1= setInterval(() => {
    console.log('2');
    //read file, 10 seconds
}, 1000);

console.log(id1);

setInterval(() => {
    console.log('1');
    clearInterval(id1);
    // for(;;);
}, 500);

console.log('3');
