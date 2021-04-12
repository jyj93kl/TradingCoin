const uuid = require("uuid")
const crypto = require("crypto")
const sign = require("jsonwebtoken").sign
const queryEncode = require("querystring").encode
const privateToken = require("./privateKey")

function createToken(request){
    let payload = new Object(),accessKey,secretKey;
    if(request.type == 1){
        accessKey = privateToken.approve.accessKey
        secretKey = privateToken.approve.secretKey
    } else {
        accessKey = privateToken.search.accessKey
        secretKey = privateToken.search.secretKey
    }
    payload["access_key"] = accessKey
    payload["nonce"] = uuid.v4()
    if(request.queryString) {
        let query = queryEncode(request.queryString)
        let hash = crypto.createHash('sha512')
        let queryHash = hash.update(query, 'utf-8').digest('hex')
        payload["query_hash"] = queryHash
        payload["query_hash_alg"] = 'SHA512'
    }
    
    // console.log("payload",payload);
    return 'Bearer '+ sign(payload, secretKey)
}

module.exports = {
    createToken : createToken
};