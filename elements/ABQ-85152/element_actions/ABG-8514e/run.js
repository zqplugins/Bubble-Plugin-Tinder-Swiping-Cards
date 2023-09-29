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

    function reloadCards(){


          var cards = document.querySelectorAll(".tinder--card"+instanceID);
          cards.forEach((card)=>{
            card.classList.remove("removed")
            card.style.transform = "";
          })
          initCards();
        
    }

    reloadCards();

}