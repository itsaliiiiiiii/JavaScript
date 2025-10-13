console.log("Program Started")

const promise = new Promise((res,rej)=>{
    setTimeout(() => {
        console.log(res)
    }, 3000,"finish");
});


console.log(promise)
console.log("in progress")
promise.then((res)=>{
    console.log(res)
})
