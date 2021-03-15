export default {
    jsonGet: (client, key, path= ".") => {
        client.defineCommand('jsonGet', {
            numberOfKeys: 1,
            lua: "return redis.call('JSON.GET',KEYS[1],ARGV[1])"
        });
        return client.jsonGet(key, path)
    },
    jsonSet: (client, key, path= ".", value= "") => {
        client.defineCommand('jsonSet', {
            numberOfKeys: 1,
            lua: "return redis.call('JSON.SET',KEYS[1],ARGV[1],ARGV[2])"
        });
        return client.jsonSet(key, path, value)
    }
}