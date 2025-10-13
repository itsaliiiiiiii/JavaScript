console.log("Program Started")

const promise = new Promise((res, rej) => {
    setTimeout(() => {
        console.log("1");
        res();
    }, 3000);
    setTimeout(() => {
        console.log("1");
        rej();
    }, 2000);
});


console.log(promise)
console.log("in progress")
promise.catch(() => {
    console.log("2")
}).then(() => {
    console.log("3")
})
