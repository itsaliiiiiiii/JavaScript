console.log("Program Started")

const promise = new Promise((res, rej) => {
    setTimeout(() => {
        console.log("1");
        res();
    }, 3000);
});


console.log(promise)
console.log("in progress")
promise.then(() => {
    console.log("2")
}).catch(()=>{
    console.log("3")
})
