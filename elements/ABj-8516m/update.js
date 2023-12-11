function(instance, properties, context) {
  let listOfThings
    try {
      listOfThings = properties.cards_list.get(0, properties.cards_list.length());
    } catch (error) {
      console.log(error);
    }
    if(!listOfThings) return // do not init plugin while waiting for data from database
    const { cards_template_id } = properties;

  instance.data.properties = properties
  const initCards = instance.data.initCards;
  const instanceID = instance.data.id;

  const existingCardsDeck = document.getElementById("cardsDeck" + instanceID);

  if (!existingCardsDeck) {
    var tinderWrapper = document.createElement("div");
    tinderWrapper.style["max-width"] = document.body.clientWidth + "px";
    tinderWrapper.id = "cardsDeck" + instanceID;
    tinderWrapper.style.overflow = "visible";
    tinderWrapper.innerHTML =
      ` <style>
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
          padding-top: 40px;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          z-index: 1;
          height: 28rem;
        }

        .tinder--card` +
            instanceID +
            ` {
          width: 100%;
          /*added 06.12.23*/
          display: inline-block;
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
          margin-top: 16px;
          margin-bottom: 16px;
          font-size: 32px;
          padding: 0 16px;
          pointer-events: none;
        }

        .tinder--card` +
            instanceID +
            ` p {
          margin-top: 16px;
          margin-bottom: 16px;
          font-size: 20px;
          padding: 0 16px;
          pointer-events: none;
        }

        [id*="cardtemplate"] {
          left: 0 !important;
          top: 0 !important;
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
        </div>`;

    instance.canvas[0].appendChild(tinderWrapper);
    instance.canvas[0].style.overflow = "visible";

    instance.data.tinderWrapper = tinderWrapper;
    instance.data.arrList = listOfThings;
    instance.data.initStateCards(listOfThings);

    listOfThings.forEach((element, index, array) => {
      let cardsContainer = document.createElement("div");
      cardsContainer.className = "tinder--card" + instanceID;
      cardsContainer.setAttribute("data-index", index + 1); // +1 adjust for the bubble database
      var templateHTML = document.getElementById(cards_template_id).cloneNode(true);
      templateHTML.id = cards_template_id + "" + index;
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
          console.log("card clicked", element.get(properties.cards_id));
          instance.publishState("cardClicked", element.get(properties.cards_id));
          instance.triggerEvent("clickedCard");
        }

        // Reset this back to false for next time
        clicked = false;
      });

      templateHTML.childNodes.forEach((children) => {
        if (children?.innerText?.toLowerCase()?.trim() === "title") {
          children.innerText = element.get(properties.cards_title);
          children.style.width = "initial";
          children.style.minWidth = "initial";
        }
        if (children?.innerText?.toLowerCase()?.trim() === "subtitle") {
          children.innerText = element.get(properties.cards_text);
          children.style.width = "initial";
          children.style.minWidth = "initial";
        }
        try {
          if (children.childNodes[0].nodeName.toLowerCase() === "img") {
            children.childNodes[0].src = element.get(properties.cards_image);
            children.childNodes[0].style.objectFit = "cover";
          }
        } catch (e) {
          context.reportDebugger("no text or title was providen")
        }
      });

      cardsContainer.appendChild(templateHTML);

      document.getElementById("cardsContainer" + instanceID).appendChild(cardsContainer);
    });

    $(document).ready(function () {
      document.getElementById(cards_template_id).style.display = "none";

      const tinderContainer = tinderWrapper.querySelector(".tinder");
      instance.data.tinderContainer = tinderContainer;
      const allCards = document.querySelectorAll(".tinder--card" + instanceID);

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
    });
  }
}
