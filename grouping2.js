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

    var boxContents = ['<li class = "fungus elem">カンジダ</li>',
    			'<li class = "spirochaete elem">レプトスピラ</li>',
				'<li class = "protozoan elem">マラリア</li>',
				'<li class = "protozoan elem">トリコモナス</li>',
                '<li class = "protozoan elem">赤痢アメーバ</li>',
    			'<li class = "spirochaete elem">ボレリア</li>',
				'<li class = "fungus elem">クリプトコックス</li>',
				'<li class = "protozoan elem">トキソプラズマ</li>',
				'<li class = "fungus elem">ムコール症</li>',
                '<li class = "fungus elem">アスペルギルス</li>',
				'<li class = "spirochaete elem">トレポネーマ</li>',
				'<li class = "fungus elem">ニューモシスチス・イロベチ</li>',
				'<li class = "protozoan elem">クリプトスポリジウム</li>'
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
                    if(firstC === 's'){
                        $('#spirochaete').append($('#checkContents').children());
                    } else if (firstC === 'f'){
                        $('#fungus').append($('#checkContents').children());
                    } else if (firstC === 'p'){
                        $('#protozoan').append($('#checkContents').children());
                    }
                }
            }
            
			setTimeout(goal,100);
			function goal(){
				if(($('#fungus').find('.fungus').length) === 5){
					if(($('#spirochaete').find('.spirochaete').length) === 3){
						if(($('#protozoan').find('.protozoan').length) === 5){
							alert('正解です！お疲れ様でした！');
						}
					}		
				}
			}
		})
})
