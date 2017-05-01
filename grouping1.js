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
        window.location.href = 'grouping.html';
    })
    $('#bacteriumpage').click(function(){
        window.location.href = 'Bacterium.html';
    })
    $('#otherspage').click(function(){
        window.location.href = 'others.html';
    })

    var boxContents = [
                '<li class = "1 elem">黄色ブドウ球菌</li>',
				'<li class = "1 elem">表皮ブドウ球菌</li>',
                '<li class = "1 elem">A群βレンサ球菌</li>',
    			'<li class = "1 elem">B群レンサ球菌</li>',
				'<li class = "1 elem">緑色レンサ球菌</li>',
				'<li class = "1 elem">肺炎（双）球菌</li>',
				'<li class = "1 elem">バンコマイシン耐性腸球菌</li>',
                '<li class = "2 elem">ジフテリア菌</li>',
				'<li class = "2 elem">破傷風菌</li>',
				'<li class = "2 elem">ボツリヌス菌</li>',
                '<li class = "2 elem">ウェルシュ菌</li>',
                '<li class = "2 elem">ディフィシル菌</li>',
                '<li class = "2 elem">リステリア</li>',
                '<li class = "3 elem">髄膜炎菌</li>',
                '<li class = "3 elem">淋菌</li>',
                '<li class = "3 elem">モラクセラ・カタラーリス</li>'
                ]
    
    while(boxContents.length > 0){
        var k = Math.floor(Math.random()*boxContents.length);
        $('#boxContents').append(boxContents[k]);
        boxContents.splice(k, 1);
    };
        
    $('.tasks').sortable({
		connectWith:'.tasks',
		placeholder:'on_tasks'
	});
	
		$('.attr').mouseup(function(){
            
            setTimeout(failureCheck, 100);
            function failureCheck(){
                if($('#checkContents').children().length > 0){
                    $('#checkContents').children().css('background-color','#EEE');
                    $('#checkContents').children().css('color','#F00');
                    var failure = $('#checkContents').children().attr('class');
                    var firstC = failure.slice(0,1);
                    if(firstC === '1'){
                        $('#1').append($('#checkContents').children());
                    } else if (firstC === '2'){
                        $('#2').append($('#checkContents').children());
                    } else if (firstC === '3'){
                        $('#3').append($('#checkContents').children());
                    }
                }
            }
            
			setTimeout(goal,100);
			function goal(){
				if(($('#1').find('.1').length) === 7){
					if(($('#2').find('.2').length) === 6){
						if(($('#3').find('.3').length) === 3){
							alert('正解です！お疲れ様でした！');
						}
					}		
				}
			}
		})
})
