/*var xmlhttp = new XMLHttpRequest();
var url = "data/json/member_list.json";

xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == "200") {
        myJsonParser(xmlhttp.responseText);
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();*/

function myJsonParser(response) {
    //var arr = JSON.parse(response);
    var i;
    var out;
    for(i = 0; i < 1; i++) {
        var request = new XMLHttpRequest();
	// Set the event handler
	request.onload = console.log(this.responseText);;
	// Initialize the request
	request.open('get', 'https://api.github.com/users/funchal', true)
	// Fire away!
	request.send()
    }
    document.getElementById("member_block").innerHTML = out;
    
}

function getAvatar(response,out,name) {
        	var mJSONobj = JSON.parse(response);
        	out += "<li><img src=\"" + mJSONobj.avatar_url + ">"+mJSONobj.login+"</li>"; 
}
