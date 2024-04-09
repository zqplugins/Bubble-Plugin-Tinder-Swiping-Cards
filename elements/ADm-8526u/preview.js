function(instance, properties) {
    

	s = document.createElement("div")
    s.style.background = "salmon"
    s.style.borderRadius = "5px"
    s.style.width = "100%"
    s.style.height = "20px"
    s.innerHTML = "PREVIEW NOT AVAILABLE"
    s.style.color = "white"
    s.style.display = "none"
	instance.canvas[0].appendChild(s)

}