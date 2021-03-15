const ioredis= require("ioredis");

var client = new ioredis(6379, "127.0.0.1", {
    password: "Orivon@999"
});
client.defineCommand('jsonGet', {
    numberOfKeys: 1,
    lua: "return redis.call('JSON.GET',KEYS[1],ARGV[1])"
});
client.select(15, (...args) => {
    client.getBuffer("test:each:8_6:string").then(res=> {
        console.log(res);
        client.jsonGet("test:each:8_6:json", '.').then((res)=> {
            res = Buffer.from(res);
            console.log(res)
        });
    })
    /*
    client.jsonGet("test:each:8_6:json", '.').then((res)=> {
        console.log(res)
    });
    */
})