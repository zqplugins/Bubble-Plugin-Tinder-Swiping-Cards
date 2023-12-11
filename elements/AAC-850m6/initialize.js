function(instance, context) {
	instance.data.id = Date.now().toString(36) + Math.random().toString(36).substr(2);
  
	instance.data.stateHandler = function (el, type) {
	  const index = Number(el.dataset.index);
	  const { leftCards } = instance.data;
	  leftCards.delete(index);
	  if (type === "like") {
		instance.data.likeCards.add(index);
		instance.publishState("liked_cards", Array.from(instance.data.likeCards));
		instance.triggerEvent("card_liked")
	  } else if (type === "dislike") {
		instance.data.dislikeCards.add(index);
		instance.publishState("disliked_cards", Array.from(instance.data.dislikeCards));
		instance.triggerEvent("card_disliked")
	  } else if (type === "sendToBack") {
		leftCards.delete(index);
		leftCards.add(index); // to the end
  
		instance.data.leftCards[0];
		instance.triggerEvent("card_send_to_back")
	  }
	  const indexUpperCard = Array.from(leftCards)[0];
	  instance.data.indexUpperCard = indexUpperCard;
  
	  instance.publishState("index_of_last_card", index);
	  instance.publishState("index_of_upper_card", indexUpperCard);
	  instance.publishState("type_of_last_action", type);
	  instance.publishState("left_cards", Array.from(leftCards));
	  instance.data.leftCards = leftCards
	};
  
	instance.data.initStateCards = function (arrList) {
	  const leftCards = new Set();
	  instance.data.leftCards = leftCards;
	  arrList.forEach((_, index) => {
		leftCards.add(index + 1);
	  });
  
	  instance.data.dislikeCards = new Set();
	  instance.data.likeCards = new Set();


	  const indexUpperCard = Array.from(leftCards)[0];
	  instance.data.indexUpperCard = indexUpperCard;
	  
	  instance.publishState("index_of_upper_card", indexUpperCard);
	  instance.publishState("liked_cards", Array.from(instance.data.likeCards));
	  instance.publishState("disliked_cards", Array.from(instance.data.dislikeCards));
	  instance.publishState("left_cards", Array.from(leftCards));
	  instance.data.leftCards = leftCards
	};
  
	instance.data.initCards = function () {
	  const tinderContainer = instance.data.tinderContainer
	  const newCards = getCardsInTheOrder()
	  newCards.forEach(function (card, index) {
		card.style.zIndex = newCards.length - index; // this is the right way!
		card.style.transform = "scale(" + (20 - index) / 20 + ") translateY(-" + 30 * index + "px)";
		card.style.opacity = (10 - index) / 10;
	  });
	  
  
	  tinderContainer.classList.add("loaded");
	}

	function getUpperCard(cards) {
		const instanceID = instance.data.id;
		cards = cards ? cards : instance.data.tinderContainer.querySelectorAll(".tinder--card" + instanceID + ":not(.removed)");
		const upperCard = [...cards].find(el=>Number(el.dataset.index) === instance.data.indexUpperCard)
		return upperCard
	}

	function getCardsInTheOrder() {
		const instanceID = instance.data.id;
		const leftCardsElementsParent =  instance.data.tinderContainer.querySelector(".tinder--card" + instanceID + ":not(.removed)")?.parentElement;
		if(!leftCardsElementsParent) return []
		return Array.from(instance.data.leftCards).reduce((acc, index) => {
			const el = leftCardsElementsParent.querySelector('[data-index="'+ index +'"]')
			if(el) acc.push(el) 
			return acc
		}, [])
	}
  
	instance.data.createButtonListener = function (love) {
	  return function (event) {
		const instanceID = instance.data.id;
		var cards = instance.data.tinderContainer.querySelectorAll(".tinder--card" + instanceID + ":not(.removed)");
		var moveOutWidth = document.body.clientWidth * 1.5;
  
		if (!cards.length) return false;
  
		var card = getUpperCard(cards);
  
		card.classList.add("removed");
  
		if (love) {
		  card.style.transform = "translate(" + moveOutWidth + "px, -100px) rotate(-30deg)";
		} else {
		  card.style.transform = "translate(-" + moveOutWidth + "px, -100px) rotate(30deg)";
		}

		instance.data.stateHandler (card, love ? "like" : "dislike")
		instance.data.initCards();
  
		event && event.preventDefault();
	  };
	}
  
	instance.data.sendFrontToBack = function () {
	  return function (event) {
		  
		  const instanceID = instance.data.id;
		  const cards = instance.data.tinderContainer.querySelectorAll("div.tinder--card" + instanceID + ":not(.removed)")
		  const cardsNumber = cards.length;
  
		cards.forEach((card) => {
		  if (card.style.zIndex !== cards.length.toString()) {
			card.style.zIndex = (parseInt(card.style.zIndex) + 1).toString();
			var index = cardsNumber - card.style.zIndex;
			card.style.transform = "scale(" + (20 - index) / 20 + ") translateY(-" + 30 * index + "px)";
			card.style.opacity = 1;
		  } else {
			
			instance.data.stateHandler(card, "sendToBack"); //06.10.2023 first card detect
			card.style.zIndex = "1";
			var index = cardsNumber - card.style.zIndex;
			card.style.transform = "scale(" + (20 - index) / 20 + ") translateY(-" + 30 * index + "px)";
			card.style.opacity = 1;
		  }
		});
	  };
	}
  
	instance.data.reloadCards = function () {
	  const instanceID = instance.data.id;
	  return function (event) {
		instance.data.initStateCards(instance.data.arrList);
		instance.triggerEvent("card_reloaded")
  
		var cards = instance.data.tinderContainer.querySelectorAll("div.tinder--card" + instanceID + ".removed");
		cards.forEach((card) => {
		  card.classList.remove("removed");
		  card.style.transform = "";
		});
		instance.data.initCards();
		instance.publishState("type_of_last_action", "Reload Cards");
	  };
	}

	instance.data.hammertime_panned_handler = function(el) {
		return function (event) {
			el.classList.remove("moving");
			instance.data.tinderContainer.classList.remove("tinder_love");
			instance.data.tinderContainer.classList.remove("tinder_nope");
	
			const moveOutWidth = document.body.clientWidth;
			const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
	
			event.target.classList.toggle("removed", !keep);
			
			if (keep) {
			  event.target.style.transform = "";
			} else {
			  const endX = Math.max(
				Math.abs(event.velocityX) * moveOutWidth,
				moveOutWidth
			  );
			  let toX = event.deltaX > 0 ? endX : -endX;
			  const endY = Math.abs(event.velocityY) * moveOutWidth;
			  let toY = event.deltaY > 0 ? endY : -endY;
			  const xMulti = event.deltaX * 0.03;
			  const yMulti = event.deltaY / 80;
			  const rotate = xMulti * yMulti;
				
				//adjust x coordinate
				const elementWidth = el.clientWidth;
				const {clientHeight, clientWidth} = document.body
				if(toX > 0 && toX < clientWidth + elementWidth) toX += clientWidth + elementWidth
				else if (toX < 0 && toX > -elementWidth + toX) toX -= clientWidth + elementWidth
		
				if(toY > clientHeight) toY = clientHeight - elementWidth - elementWidth/50
				
			  event.target.style.transform = "translate(" + toX + "px, " + (toY + event.deltaY) + "px) rotate(" + rotate + "deg)";
			  
			  instance.data.stateHandler(el, toX > 0 ? "like" : "dislike");
			  instance.data.initCards();
			}
		}
	}
  }
  