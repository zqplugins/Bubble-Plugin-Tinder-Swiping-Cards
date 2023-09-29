function(instance, properties, context) {
    
    const instanceID = instance.data.id
  	// let instanceID = instance.canvas[0].bubble_data.bubble_instance._visibility_demand._ar_object.id
    var allCards = document.querySelectorAll('.tinder--card'+instanceID);
    var tinderContainer = document.querySelector('.tinder');

    function initCards(card, index) {
        var newCards = document.querySelectorAll('.tinder--card'+instanceID+':not(.removed)');

        newCards.forEach(function (card, index) {
            card.style.zIndex = allCards.length - index;
            card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
            card.style.opacity = (10 - index) / 10;
        });

        tinderContainer.classList.add('loaded');
    }
	
    function createButtonListener(love) {
        var cards = document.querySelectorAll('.tinder--card'+instanceID+':not(.removed)');
        var moveOutWidth = document.body.clientWidth * 1.5;

        if (!cards.length) return false;

        var card = cards[0];

        card.classList.add('removed');

        if (love) {
          card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
        } else {
          card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
        }

        initCards();
    }
	
    createButtonListener(true)

}