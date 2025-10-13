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
    return new Promise((res,rej)=>{
        console.log("2")
        setTimeout(res,3000)
    });
}).then(() => {
    console.log("3")
})
