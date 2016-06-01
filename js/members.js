var xmlhttp = new XMLHttpRequest();
var url = "data/json/members.json";

xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == "200") {
			var arr = JSON.parse(xmlhttp.responseText);
			var i;
			var out = null;
			for(i = 0; i < arr.length; i++) {
				var n_url = "https://api.github.com/users/" + arr[i].name;
				console.log(n_url);
				var request = new XMLHttpRequest();
				request.onreadystatechange=function() {
					if (request.readyState == 4 && request.status == "200") {
						console.log("got response");
						var mJSONobj = JSON.parse(request.responseText);
						if(out == null)
							out = "<li><img src=\""+mJSONobj.avatar_url+"\">" + mJSONobj.login + "</li>";
						else
							out += "<li><img src=\""+mJSONobj.avatar_url+"\">" + mJSONobj.login + "</li>";
					}
				}
				request.open("GET",n_url,false);
				request.send();
			}
			document.getElementById("member_block").innerHTML = out;
		}
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myJsonParser(response) {
    
    
}

function getAvatar(response,out) {
        	
}
