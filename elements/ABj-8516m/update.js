function(instance, properties, context) {
  //conding here https://codepen.io/gabrielcardoso/pen/qBobjqm?editors=1010
  //var s = document.createElement("script");
  //s.type = "text/javascript";
  ////s.src = "https://hammerjs.github.io/dist/hammer.js";
  //$("body").append(s);
  //removes glitch of appending two children to instance

  instance.data.properties = properties
  const initCards = instance.data.initCards;
  const instanceID = instance.data.id;
  // let instanceID = instance.canvas[0].bubble_data.bubble_instance._visibility_demand._ar_object.id
  if (instance.canvas[0].children.length < 1) {
    //var imageList = properties.figures;
    //let listCounter = imageList.length();
    //let arrList = imageList.get(0,listCounter);

    var tinderWrapper = document.createElement("div");
    //tinderWrapper.style["max-height"] = document.body.clientHeight + "px";
    tinderWrapper.style["max-width"] = document.body.clientWidth + "px";
    tinderWrapper.id = "cardsDeck" + instanceID;
    //tinderWrapper.style.minHeight = "undefined";
    tinderWrapper.style.overflow = "visible";
    //tinderWrapper.style["overflow-x"] = "hidden"
    tinderWrapper.innerHTML =
      `<style>



    .tinder {
      /* width: 500px */;
      /* height: 100vh */;
      overflow: visible;
      display: flex;
      flex-direction: column;
      position: relative;
      opacity: 0;
      transition: opacity 0.1s ease-in-out;
      /* top: 10rem;  */
    }

    .loaded.tinder {
      opacity: 1;
    }

    .tinder--status {
      position: absolute;
      top: 50%;
      margin-top: -30px;
      z-index: 2;
      width: 100%;
      text-align: center;
      pointer-events: none;
    }

    .tinder--status i {
      font-size: 100px;
      opacity: 0;
      transform: scale(0.3);
      transition: all 0.2s ease-in-out;
      position: absolute;
      width: 100px;
      margin-left: -50px;
    }

    .tinder_love .fa-heart {
      opacity: 0.7;
      transform: scale(1);
    }

    .tinder_nope .fa-remove {
      opacity: 0.7;
      transform: scale(1);
    }

    .tinder--cards` +
      instanceID +
      ` {
	  /* max-width: 440px */;
      flex-grow: 1;
      padding-top: 10px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      z-index: 1;
	  /* height: 28rem; */
    }

    .tinder--card` +
      instanceID +
      ` {
      display: inline-block;
	  width: 100%;
      /* width: 90vw */;
      /* max-width: 400px */;
      /* height: 38vh */;
      background: #ddd9d9;
      /* padding-bottom: 40px; */
      border-radius: 8px;
      overflow: hidden;
      position: absolute;
      will-change: transform;
      transition: all 0.3s ease-in-out;
      cursor: -webkit-grab;
      cursor: -moz-grab;
      cursor: grab;
    }

    .moving.tinder--card` +
      instanceID +
      ` {
      transition: none;
      cursor: -webkit-grabbing;
      cursor: -moz-grabbing;
      cursor: grabbing;
    }

    .tinder--card` +
      instanceID +
      ` img {
      max-width: 100%;
      pointer-events: none;
    }

    .tinder--card` +
      instanceID +
      ` h3 {
      margin-top: 32px;
      font-size: 32px;
      padding: 0 16px;
      pointer-events: none;
    }

    .tinder--card` +
      instanceID +
      ` > div {
        height: 96vh !important;
    }

    .tinder--card` +
      instanceID +
      ` p {
      margin-top: 24px;
      font-size: 20px;
      padding: 0 16px;
      pointer-events: none;
    }

    .tinder--buttons {
      flex: 0 0 100px;
      text-align: center;
      padding-top: 40px;
	  /* width: 500px; */
    }

    .tinder--buttons button {
      border-radius: 50%;
      line-height: 60px;
      width: 60px;
      border: 0;
      background: #FFFFFF;
      display: inline-block;
      margin: 0 8px;
	  font-size: 171%;
    }

    .tinder--buttons button:focus {
      outline: 0;
    }

    .tinder--buttons i {
      font-size: 32px;
      vertical-align: middle;
    }

    .fa-repeat{
        color: gray;
      }

    .fa-heart {
      color: #FFACE4;
    }

    .fa-remove {
      color: salmon;
    }
      .fa-files-o{
        color: lightblue;
      }

    </style>


    <div class="tinder loaded">
      <div class="tinder--status">
        <i class="fa fa-remove"></i>
        <i class="fa fa-heart"></i>
      </div>

      <div class="tinder--cards` +
      instanceID +
      `" id="cardsContainer` +
      instanceID +
      `">
      </div>

      <div class="tinder--buttons">
        <button id="nope` +
      instanceID +
      `"><p style="color: lightred">✕</p></button>
        <button id="love` +
      instanceID +
      `"><p style="color: salmon">♡</p></button>
		<button id="reload` +
      instanceID +
      `"><p style="color: lightblue">⟲</p></button>
		<button id="sendback` +
      instanceID +
      `"><p style="color: gray">⎋</p></button>
      </div>
    </div>`;
    instance.canvas[0].appendChild(tinderWrapper);
    instance.canvas[0].style.overflow = "visible";

    if (properties.displaydislike) {
      document.getElementById("nope" + instanceID).style.display = "unset";
    } else {
      document.getElementById("nope" + instanceID).style.display = "none";
    }

    if (properties.displaylike) {
      document.getElementById("love" + instanceID).style.display = "unset";
    } else {
      document.getElementById("love" + instanceID).style.display = "none";
    }

    if (properties.displayreload) {
      document.getElementById("reload" + instanceID).style.display = "unset";
    } else {
      document.getElementById("reload" + instanceID).style.display = "none";
    }

    if (properties.displaysendtoback) {
      document.getElementById("sendback" + instanceID).style.display = "unset";
    } else {
      document.getElementById("sendback" + instanceID).style.display = "none";
    }

    instance.data.tinderWrapper = tinderWrapper;
    var buttonsContainer = tinderWrapper.querySelector(".tinder--buttons");

    if (properties.displaysendtoback === false && properties.displayreload === false && properties.displaylike === false && properties.displaydislike === false) {
      console.log("triggered all blank");
      buttonsContainer.style.display = "none";
    } else {
      buttonsContainer.style.display = "unset";
    }

    /* let arrTitles = properties.titles.replace(",,", ",REPLACED,").split(",")
    console.log("properties.bodiestext",properties.bodiestext)
    let arrBodiesText = properties.bodiestext.replace(",,", ",REPLACED,").split(",")
    console.log("arrBodiesText",arrBodiesText)
    let arrColors = properties.colors.replace(",,",",white,").split(",")

    arrTitles.forEach(function (value, i) {
        let cardsContainer = document.createElement("div");
    	cardsContainer.className = "tinder--card"+instanceID
        cardsContainer.style.background = arrColors[i];
        
        let img = document.createElement("img")
        img.src = arrList[i]
        cardsContainer.appendChild(img)
        
        let htmlTitle = document.createElement("h3")
        htmlTitle.innerHTML = value
        cardsContainer.appendChild(htmlTitle)
        
        let htmlBody = document.createElement("p")
        htmlBody.innerHTML = arrBodiesText[i]
        cardsContainer.appendChild(htmlBody)
        
        document.getElementById("cardsContainer"+instanceID).appendChild(cardsContainer)
    });
    */

    //let arrTitles = properties.titles.replace(",,", ",REPLACED,").split(",")


    let listOfThings = properties.cards.get(0, properties.cards.length());
    instance.data.arrList = listOfThings;
    instance.data.initStateCards(listOfThings);

    listOfThings.forEach((element, index, array) => {
      /*
            console.log(element.listProperties())
			console.log(element.get("cardimage_image"))
        
            let cardsContainer = document.createElement("div");
            cardsContainer.className = "tinder--card"+instanceID
            cardsContainer.style.background = element.get("cardcolor_text")

            let img = document.createElement("img")
            img.src = element.get("cardimage_image")
            cardsContainer.appendChild(img)

            let htmlTitle = document.createElement("h3")
            htmlTitle.innerHTML = element.get("cardtitle_text")
            cardsContainer.appendChild(htmlTitle)

            let htmlBody = document.createElement("p")
            htmlBody.innerHTML = element.get("cardbodytext_text")
            cardsContainer.appendChild(htmlBody)

            document.getElementById("cardsContainer"+instanceID).appendChild(cardsContainer)
            */

      //console.log(element.listProperties())

      let cardsContainer = document.createElement("div");
      cardsContainer.className = "tinder--card" + instanceID;
      cardsContainer.setAttribute("data-index", index + 1); // +1 adjust for the bubble database

      let containerChild = document.createElement("div");
      containerChild.style.pointerEvents = "none";

      containerChild.innerHTML = `
			<style>
			.imagecontainer${index}{
				pointer-events: none;
				background-image: url("${element.get("image_image")}");
				height: 400px;
            }
			</style>

			<div class="imagecontainer${index}">
				<h1>Title<h1>
				<p>Text that is explaining the title and etc<p>
			<div>
			`;
      //cardsContainer.appendChild(containerChild)
      //console.log(element.listProperties())

      var templateHTML = document.getElementById("cardtemplate").cloneNode(true);
      templateHTML.id = "cardtemplate" + index;
      templateHTML.style.pointerEvents = "none";

      //clicking without moving around
      let clicked = false;
      cardsContainer.addEventListener("mousedown", (e) => {
        clicked = true;
      });
      cardsContainer.addEventListener("mousemove", (e) => {
        clicked = false;
      });
      cardsContainer.addEventListener("mouseup", (e) => {
        if (clicked) {
          console.log("card clicked", element.get("_id"));
          instance.publishState("cardClicked", element.get("_id"));
          instance.triggerEvent("clickedCard");
        }

        // Reset this back to false for next time
        clicked = false;
      });

      templateHTML.childNodes.forEach((children) => {
        if (children.innerHTML.toLowerCase() === "Title".toLowerCase()) {
          children.innerHTML = element.get("title_text");
          children.style.width = "initial";
          children.style.minWidth = "initial";
        }
        if (children.innerHTML.toLowerCase() === "subtitle".toLowerCase()) {
          children.innerHTML = element.get("bodytext_text");
          children.style.width = "initial";
          children.style.minWidth = "initial";
        }
        try {
          if (children.childNodes[0].nodeName.toLowerCase() === "img") {
            children.childNodes[0].src = element.get("image_image");
            //children.childNodes[0].style.height = "100%";
            children.childNodes[0].style.objectFit = "cover";
          }
        } catch (e) {
          console.log("chield not available");
        }
      });

      cardsContainer.appendChild(templateHTML);

      document.getElementById("cardsContainer" + instanceID).appendChild(cardsContainer);
    });

    $(document).ready(function () {
      document.getElementById("cardtemplate").style.display = "none";

      const tinderContainer = tinderWrapper.querySelector(".tinder");
      instance.data.tinderContainer = tinderContainer;

      const allCards = document.querySelectorAll(".tinder--card" + instanceID);
      const nope = document.getElementById("nope" + instanceID);
      const love = document.getElementById("love" + instanceID);
      const reload = document.getElementById("reload" + instanceID);
      const sendback = document.getElementById("sendback" + instanceID);

      initCards();

      allCards.forEach(function (el) {
        var hammertime = new Hammer(el);

        hammertime.on("pan", function (event) {
          el.classList.add("moving");
        });

        hammertime.on("pan", function (event) {
          if (event.deltaX === 0) return;
          if (event.center.x === 0 && event.center.y === 0) return;

          tinderContainer.classList.toggle("tinder_love", event.deltaX > 0);
          tinderContainer.classList.toggle("tinder_nope", event.deltaX < 0);

          var xMulti = event.deltaX * 0.03;
          var yMulti = event.deltaY / 80;
          var rotate = xMulti * yMulti;

          event.target.style.transform = "translate(" + event.deltaX + "px, " + event.deltaY + "px) rotate(" + rotate + "deg)";
        });

        hammertime.on("panend", instance.data.hammertime_panned_handler(el));
      });

      const nopeListener = instance.data.createButtonListener(false);
      const loveListener = instance.data.createButtonListener(true);

      nope.addEventListener("click", nopeListener);
      love.addEventListener("click", loveListener);
      reload.addEventListener("click", instance.data.reloadCards());
      sendback.addEventListener("click", instance.data.sendFrontToBack());
    });
  }
}
