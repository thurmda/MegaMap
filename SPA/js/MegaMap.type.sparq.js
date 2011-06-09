
MM.type.sparq = {
			type: "sparq",
			ans : "This is the answer to a SparQ question. IT's about as long as a tpical tweet",
			location : {name: "", lat: 39.277813, lng: -76.62222, alt: 600, tilt: 25 },			
			templateMarkup : "<div><h3>${ans}</h3>${location.name}</div>"
}

$(function(){
	$.template("sparq" , MM.type.sparq.templateMarkup);
});