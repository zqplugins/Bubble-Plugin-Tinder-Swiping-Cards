function(instance, properties, context) {
    const initCards = instance.data.initCards;
    const instanceID = instance.data.id;

    let like_icon_parts = properties.like_icon.split(' ');
	let like_icon = like_icon_parts[like_icon_parts.length - 1];

	let reject_icon_parts = properties.reject_icon.split(' ');
	let reject_icon = reject_icon_parts[reject_icon_parts.length - 1];
  
    const existingCardsDeck = document.getElementById("cardsDeck" + instanceID);
  
    if (!existingCardsDeck) {
      const tinderWrapper = document.createElement("div");
      tinderWrapper.id = "cardsDeck" + instanceID;
      tinderWrapper.style.overflow = "visible";
      tinderWrapper.innerHTML =
        `<style>
    
    .tinder {
    overflow: visible;
    display: flex;
    flex-direction: column;
    position: relative;
    opacity: 0;
    transition: opacity 0.1s ease-in-out;
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
    
    .tinder_love .${like_icon} {
    opacity: 0.7;
    transform: scale(1);
    }
    
    .tinder_nope .${reject_icon} {
    opacity: 0.7;
    transform: scale(1);
    }
    
    .tinder--cards` +
        instanceID +
        ` {
    flex-grow: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    z-index: 1;
    }
    
    .tinder--card` +
        instanceID +
        ` {
    display: inline-block;
    width: 100%;
    background: #ddd9d9;
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
    min-height: ` +
        properties.card_height +
        `px !important;
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
    display: ${properties.show_buttons ? "block" : "none"} !important;
    position: relative !important;
    z-index: 1 !important;
    flex: 0 0 100px;
    text-align: center;
    padding-top: 40px;
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
    
    .${like_icon}{
    color: ${properties.like_color};
    }
    
    .${reject_icon} {
    color: ${properties.reject_color};
    }
    .fa-files-o{
    color: lightblue;
    }
    
    </style>
    
    
    <div class="tinder loaded">
    <div class="tinder--status">
    <i class="${properties.reject_icon}"></i>
    <i class="${properties.like_icon}"></i>
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
      instance.data.tinderWrapper = tinderWrapper;
  
      const imageList = properties.figures;
      const titleList = properties.titles_text;
      const bodyList = properties.body_text;
  
      const listCounter = imageList.length();
      const arrList = imageList.get(0, listCounter);
      const arrTitles = titleList.split(",");
      const arrBody = bodyList.split(",");
      instance.data.arrList = arrList;
      instance.data.initStateCards(arrList);
  
      $(document).ready(function () {
        properties.titles_text.split(",").forEach((element, index, array) => {
          const cardsContainer = document.createElement("div");
          cardsContainer.className = "tinder--card" + instanceID;
          cardsContainer.setAttribute("data-index", index + 1); // +1 adjust for the bubble database
  
          const containerChild = document.createElement("div");
          containerChild.style.pointerEvents = "none";
  
          containerChild.innerHTML = `
                  <style>
                      .imagecontainer${index}{
                          pointer-events: none;
                          padding 8px 0;
                      }
  
                      .image${index}{
                          width: 100%;
                          height: 100%;
                          object-fit: cover;
                      }
  
                      .title_box${index}{
                          display: flex;
                          flex-direction: column;
                          padding: 24px 16px 32px;
                      }
  
                      .title${index}{
                          font-size: 24px;
                          padding: 0;
                          margin: 0;
                      }
                  </style>
  
                  <div class="imagecontainer${index}">
                      <img class="image${index}" src="${arrList[index]}" alt="" />
                      <div class="title_box${index}">
                      <h1 class="title${index}">${arrTitles[index]}</h1>
                      <p class="paragraph${index}">${arrBody[index]}</p>
                  </div>
          `;
          cardsContainer.appendChild(containerChild);
  
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
              console.log("card clicked", properties.card_id.split(",")[index]);
              instance.publishState(
                "cardClicked",
                properties.card_id.split(",")[index]
              );
              instance.triggerEvent("clickedCard");
            }
  
            // Reset this back to false for next time
            clicked = false;
          });
  
          document
            .getElementById("cardsContainer" + instanceID)
            .appendChild(cardsContainer);
        });
  
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
  
            event.target.style.transform =
              "translate(" +
              event.deltaX +
              "px, " +
              event.deltaY +
              "px) rotate(" +
              rotate +
              "deg)";
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
  