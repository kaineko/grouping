$(document).ready(function(){
    var w = $(window).width();
    var h = $(window).height();
    
    $('#left').width(w*20/100);
    $('#left').height(h);
    
    $('#menu').click(function(){
        if(left.style.display === 'block') {
        	left.style.display = 'none';
  		} else {
    		left.style.display = 'block';
        }
    });
    $('#homepage').click(function(){
        window.location.href = 'index.html';
    })
    $('#bacteriumpage').click(function(){
        window.location.href = 'Bacterium.html';
    })
    $('#otherspage').click(function(){
        window.location.href = 'others.html';
    })
})
