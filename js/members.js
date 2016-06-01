/* Firstly, I am a newbie to this, I should have separated them in different units, but then could not get them working, so squashed it all under one.*/

/* Get members*/
var xmlhttp = new XMLHttpRequest();
var url = "data/json/members.json";

xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == "200") {
			var arr = JSON.parse(xmlhttp.responseText);
			var i;
			var out = null;
			for(i = 0; i < arr.length; i++) {
				var n_url = "https://api.github.com/users/" + arr[i].name;
				var request = new XMLHttpRequest();
				request.onreadystatechange=function() {
					if (request.readyState == 4 && request.status == "200") {
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

/* Get recent activity */
var xmlhttp2 = new XMLHttpRequest();
var url2 = "https://api.github.com/orgs/TeamButter/events";

xmlhttp2.onreadystatechange=function() {
    if (xmlhttp2.readyState == 4 && xmlhttp2.status == "200") {
			var arr = JSON.parse(xmlhttp2.responseText);
			var i;
			var out = null;
			var count = 0;
			for(i = 0; i < arr.length; i++) {
				if(count < 5) {
					if (arr[i].type == "PushEvent") {
						if(!arr[i].repo.name.contains("github.io")) {
							var msg = arr[i].payload.commits[0].message;
							if(msg.length > 10) {
								msg[10] = ".";
								msg[11] = ".";
								msg[12] = ".";
								msg[13] = null;	
							}
							if(out == null)
								out = "<li><a href=\"https://github.com/" + arr[i].repo.name + "/commit/" + arr[i].payload.commits[0].sha + "\"><img src=\"" + arr[i].actor.avatar_url + "\" style=\"text-decoration: none;\"> " +  msg + "</a></span></li>";
							else
								out += "<li><a href=\"https://github.com/" + arr[i].repo.name + "/commit/" + arr[i].payload.commits[0].sha + "\"><img src=\"" + arr[i].actor.avatar_url + "\" style=\"text-decoration: none;\"> " +  msg + "</a></span></li>";
							count = count + 1;
						}
					}
				}
			}
			document.getElementById("activity_block").innerHTML = out;
		}
}
xmlhttp2.open("GET", url2, true);
xmlhttp2.send();