//var baseUrl = "http://192.168.43.45:8891";
//var baseUrl = "http://127.0.0.1:8891";
var baseUrl = "http://120.234.14.50:12021";
var fetch = (opts, data) => {
    let httpDefaultOpts = {
        url: baseUrl+""+opts.url,
        data: data,
        method: opts.method,
        header: opts.method == 'get' ? {
        'X-Requested-With': 'XMLHttpRequest',
        "Accept": "application/json",
        "Content-Type": "application/json; charset=UTF-8"
    } : {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
        dataType: 'json',
    }
    var promise = new Promise(function(resolve, reject) {
        uni.request(httpDefaultOpts).then(
            (res) => {
                resolve(res[1])
            }
        ).catch(
            (response) => {
                reject(response)
            }
        )
    })
    return promise
};


module.exports = fetch;

