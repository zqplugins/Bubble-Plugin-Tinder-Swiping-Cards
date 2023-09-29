function(instance, properties, context) {

    function sendFrontToBack(){
        const instanceID = instance.data.id
 		 // let instanceID = instance.canvas[0].bubble_data.bubble_instance._visibility_demand._ar_object.id
        var cards = document.querySelectorAll(".tinder--card"+instanceID);
        
        var cardsNumber = cards.length
        cards.forEach((card)=>{
          if (card.style.zIndex !== cards.length.toString()){
            card.style.zIndex = (parseInt(card.style.zIndex)+1).toString();
            var index = cardsNumber - card.style.zIndex
            if(properties.showbehind){
        card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
    }
            card.style.opacity = 1
          } else {
            card.style.zIndex = "1";
            var index = cardsNumber - card.style.zIndex
            if(properties.showbehind){
        card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
    }
            card.style.opacity = 1
          }
        })
    }

    sendFrontToBack();


}