//document.write("<script src='http://cdn.bootcdn.net/ajax/libs/crypto-js/4.0.0/crypto-js.js'></script>");
//import CryptoJS from "crypto-js";

// /**
//  * AES-256-CBC对称加密
//  * @param text {string} 要加密的明文
//  * @param secretKey {string} 密钥，43位随机大小写与数字
//  * @returns {string} 加密后的密文，Base64格式
//  */
// function AES_CBC_ENCRYPT(text, secretKey) {
//     var keyHex = CryptoJS.enc.Base64.parse(secretKey);
//     var ivHex = keyHex.clone();
//     // 前16字节作为向量
//     ivHex.sigBytes = 16;
//     ivHex.words.splice(4);
//     var messageHex = CryptoJS.enc.Utf8.parse(text);
//     var encrypted = CryptoJS.AES.encrypt(messageHex, keyHex, {
//         "iv": ivHex,
//         "mode": CryptoJS.mode.CBC,
//         "padding": CryptoJS.pad.Pkcs7
//     });
//     return encrypted.toString();
// }

function AES_CBC_DECRYPT(textBase64, secretKey) {
    //step 1a: Base64 Decode the encryption key
    var keyHex = CryptoJS.enc.Base64.parse(secretKey);
    console.log("keyHex---",keyHex.toString());
    
    //Step2a: Url Decode the Encrypted Text
    var txtURLdecoded = decodeURIComponent(textBase64.toString());
    console.log("txtURLdecoded---",txtURLdecoded)
    
    //Step2b: Split IV and the actual data
    var txtURLdecoded_split = txtURLdecoded.split("==");
    var IV_splitted = txtURLdecoded_split[0] + "==";
    var EncryptedBytes = txtURLdecoded_split[1]
    // //var IV_splitted = "XK6fTt7oIEHCReitbYyhlQ==";
    // //var EncryptedBytes = "H2XYRTRv2rjx5HBWBWX49TletUVZADHym4I0NcCxxYg=";
    console.log("IV_splitted--- ",IV_splitted);
    console.log("EncryptedBytes--- ", EncryptedBytes);

    //Step2c: Base-64 Decode the IV & the data
    // Here only iv needs to be parse to Base64 Hex
    var ivHex = CryptoJS.enc.Base64.parse(IV_splitted);

    //Step3 : Decrypt the data. Send both IV & the data
    var decrypt = CryptoJS.AES.decrypt(EncryptedBytes, keyHex, {
      "iv": ivHex,
      "mode": CryptoJS.mode.CBC,
      "padding": CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypt);
  }

// 测试AES-256-CBC
// var cbcEncrypt = AES_CBC_ENCRYPT(message, key);
var cbcEncrypt = "QKrERluKsoxhDfYr4P4b1A%3D%3DmjFsMd54p+Q9DyzcpwdtF9riasvRLnBh38gHq9E4lKgaOgd+MDfTpgFSvLq%2FjfKZyxDNrLQGPSFAtGdw%2FILgham6d2cYo%2FX2D60nUAkuApk%2FAcjXZaTfutAnK9NoVVze";
var key = "CyQlJJj5JbL/iJ20m2uheMHaE7KvLhBVwXxZDdViYnk=";
//console.log("cbc加密: ", cbcEncrypt);
var cbcDecrypt = AES_CBC_DECRYPT(cbcEncrypt, key);
console.log("cbc decrypt output: ", cbcDecrypt);


// var testString = "https://<Server>/xx?pl=QKrERluKsoxhDfYr4P4b1A%3D%3DmjFsMd54p+Q9DyzcpwdtF9riasvRLnBh38gHq9E4lKgaOgd+MDfTpgFSvLq%2FjfKZyxDNrLQGPSFAtGdw%2FILgham6d2cYo%2FX2D60nUAkuApk%2FAcjXZaTfutAnK9NoVVze";
// console.log(testString.indexOf("pl="));
// var result = testString.substring(testString.indexOf("pl=")+"pl=".length,testString.indexOf("pl=")+testString.length);
// console.log(result);