fetch("http://localhost:300").then(async (res)=>{
    console.log(await res.json());
})