addEventListener('load', function() {
    var linksDiv = document.getElementById('body-links-div');

    bodies = bodies.sort(function(a,b) { return a.name.localeCompare(b.name); });
    bodies.forEach(function(body) {
	var a = document.createElement('a');
	var linkText = document.createTextNode(body.name);
	a.appendChild(linkText);
	a.title = body.name;
	a.href = "body.html?id=" + body.id + "&name=" + body.name;
	linksDiv.appendChild(a);
	linksDiv.appendChild(document.createElement('br'));
    });
});
