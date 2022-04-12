const uuid = require("uuid")
const crypto = require("crypto")
const sign = require("jsonwebtoken").sign
const queryEncode = require("querystring").encode
const request = require('request')

CommonUtil = {
    logWrite(msg) {
        console.log("[" + new Date().toLocaleString() + "] - " + msg);
    },
    createToken(request){
        let payload     = new Object(),
            accessKey   = request.accessKey,
            secretKey   = request.secretKey;

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
    },
    async callMethod(requestData){
        let sendCall = {
            method : requestData.method,
            url : requestData.callUrl,
            headers: {
                Authorization: CommonUtil.createToken(requestData)
            }
        }
        if(requestData.queryString){
            sendCall["json"] = requestData.queryString;
        }
        // console.log(sendCall);
        await request(sendCall, function (err, res, result) {
            if(res.statusCode == 200){
                // console.log("code : " + res.statusCode + ", get request result success", result);
                return result;
            } else {
                console.log("code : " + res.statusCode + ", get request result fail", result.statusMessage);
                // return result;
            }
        });
    }
}
module.exports = {
    CommonUtil : CommonUtil
}