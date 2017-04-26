$(document).ready(function(){
	$('.tasks').sortable({
		connectWith:'.tasks',
		placeholder:'on_tasks'
	});
	
		$('body').mouseup(function(){
			setTimeout(check,100);
			function check(){
				if(($('#fungus').find('.fungus').length) === 5){
					if(($('#spirochaete').find('.spirochaete').length) === 3){
						if(($('#protozoan').find('.protozoan').length) === 5){
							alert('正解です！お疲れさまでした！');
						}
					}		
				}
			}
		})
})
