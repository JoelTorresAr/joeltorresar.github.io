function sendData(url, data, callback, callbackError) {
    //CadenaCampos*1
    var nom_fun = url;
    var URL_IMAGE = 'http://' + Db.getSetting('url_server')
    var URL_SERVER = 'http://' + Db.getSetting('url_server');
    //url = URL_SERVER + '/velneo/' + url + "?" + Db.parseData(data);
    //url = URL_SERVER + ':7000/velneo/' + url + "?" + Db.parseData(data)+"$";
    var mod_op = Db.getSetting('mod_op')
    if (mod_op == 1)
        url = URL_SERVER + ":7000/?nomFun=" + url + "&" + Db.parseData(data) + "$";
    else if (mod_op == 2) {
        url = URL_SERVER + '/velneo/' + url + "?" + Db.parseData(data);
    } else {
        Message.error(root, "Modo de conexion no establecido  00");
        return;
    }
    //console.log(url);
    var request_n1 = new XMLHttpRequest();
    request_n1.responseType = 'json';
    request_n1.onreadystatechange = function() {
        if (request_n1.readyState == 4) {
            if (request_n1.responseText != "" && request_n1.response) {
                callback(request_n1.response);
            } else {
                if (callbackError != undefined)
                    callbackError();
                else {
                    if (root != undefined)
                        console.log(url);
                    Message.hide();
                    Message.error(root, url, 0, true);
                    Db.cerrarEn(5000);
                }
            }
        } else if (request_n1.readyState == 404) {
            console.log("se jodio se jodio, el proceso se jodio");
        }
    }

    request_n1.open("GET", url, true);
    var contentType = "application/x-www-form-urlencoded; charset=utf-8";
    request_n1.setRequestHeader('Content-type', contentType)
    request_n1.send();
}

function sendDataUrl(url, nom_fun, data, callback, callbackError) {
    url = "http://" + url + "?nomFun=" + nom_fun + "&" + Db.parseData(data) + "$";
    console.log("sendDataUrl");
    console.log(url);
    var request_n1 = new XMLHttpRequest();
    request_n1.responseType = 'json';
    request_n1.onreadystatechange = function() {
        if (request_n1.readyState == 4) {
            if (request_n1.responseText != "" && request_n1.response) {
                callback(request_n1.response);
                //console.log(JSON.stringify(request_n1.response));
            } else {
                if (callbackError != undefined)
                    callbackError();
                else {
                    if (root != undefined)
                        Message.hide();
                    Message.error(root, url, 0, true);
                    Db.cerrarEn(5000);
                }
            }
        } else if (request_n1.readyState == 404) {
            console.log("se jodio se jodio, el proceso se jodio");
        }
    }

    request_n1.open("GET", url, true);
    var contentType = "application/x-www-form-urlencoded; charset=utf-8";
    request_n1.setRequestHeader('Content-type', contentType)
    request_n1.send();
}