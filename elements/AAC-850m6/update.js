function(instance, properties, context) {
  const initCards = instance.data.initCards
  const instanceID = instance.data.id;

  const existingCardsDeck = document.getElementById("cardsDeck" + instanceID);

  if (!existingCardsDeck) {
    const imageList = properties.figures;
    const listCounter = imageList.length();
    const arrList = imageList.get(0, listCounter);
    instance.data.arrList = arrList
    instance.data.initStateCards(arrList);

    const tinderWrapper = document.createElement("div");
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

        .tinder--buttons {
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
        </div>
    `;

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

    var buttonsContainer = tinderWrapper.querySelector(".tinder--buttons");
    instance.data.tinderWrapper = tinderWrapper;
    if (properties.displaysendtoback === false && properties.displayreload === false && properties.displaylike === false && properties.displaydislike === false) {
      buttonsContainer.style.display = "none";
    } else {
      buttonsContainer.style.display = "unset";
    }

    let arrTitles = properties.titles.split(",");
    let arrBodiesText = properties.bodiestext.split(",");
    let arrColors = properties.colors.split(",");

    arrTitles.forEach(function (value, i) {
      let cardsContainer = document.createElement("div");
      cardsContainer.className = "tinder--card" + instanceID;
      cardsContainer.style.background = arrColors[i];

      let img = document.createElement("img");
      img.src = arrList[i];
      img.style.margin = "-3px";
      cardsContainer.appendChild(img);

      let htmlTitle = document.createElement("h3");
      htmlTitle.innerHTML = value;
      cardsContainer.appendChild(htmlTitle);

      let htmlBody = document.createElement("p");
      htmlBody.innerHTML = arrBodiesText[i];
      cardsContainer.appendChild(htmlBody);

      document.getElementById("cardsContainer" + instanceID).appendChild(cardsContainer);
      cardsContainer.setAttribute("data-index", i + 1);
    });

    $(document).ready(function () {
      var titlesHTML = document.querySelectorAll(".tinder--card" + instanceID + " > h3");
      titlesHTML.forEach((element) => {
        if (properties.display_card_title) {
          element.style.display = "none";
        }
      });

      var bodiesHTML = document.querySelectorAll(".tinder--card" + instanceID + " > p");
      bodiesHTML.forEach((element) => {
        if (properties.display_card_body) {
          element.style.display = "none";
        }
      });

      var imagesHTML = document.querySelectorAll(".tinder--card" + instanceID + " > img");
      imagesHTML.forEach((element) => {
        if (properties.display_card_image) {
          element.style.display = "none";
        }
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
