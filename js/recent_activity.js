var mxmlhttp = new XMLHttpRequest();
var murl = "https://api.github.com/orgs/TeamButter/events";

mxmlhttp.onreadystatechange=function() {
    if (mxmlhttp.readyState == 4 && mxmlhttp.status == "200") {
			var arr = JSON.parse(mxmlhttp.responseText);
			var i;
			var out = null;
			var count = 0;
			for(i = 0; i < arr.length; i++) {
				if(count < 5) {
					if (arr[i].type == "PushEvent") {
						if(!arr[i].repo.name.contains("github.io")) {
							console.log(arr[i].actor.login + " committed to " + arr[i].repo.name + " -> " + arr[i].payload.commits[0].message);
							count = count + 1;
						}
					}
				}
			}
			document.getElementById("member_block").innerHTML = out;
		}
}
mxmlhttp.open("GET", murl, true);
mxmlhttp.send();