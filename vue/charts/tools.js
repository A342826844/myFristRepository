export const throttling1 = (fn, wait) => {
    let timer;
	let context, args;
    
	let run = () => {
        console.log(wait)
		timer=setTimeout(()=>{
			fn.apply(context,args);
			clearTimeout(timer);
			timer=null;
		},wait);
	}
 
	(function () {
        console.log(222222222)
		context=this;
		args=arguments;
		if(!timer){
			console.log("throttle, set");
			run();
		}else{
			console.log("throttle, ignore");
		}
    })()
}

export const throttling2 = (fn, wait, immediate) => {
	let timer, timeStamp=0;
	let context, args;
 
	let run = () => {
		timer=setTimeout(()=>{
			if(!immediate){
				fn.apply(context,args);
			}
			clearTimeout(timer);
			timer=null;
		},wait);
	}
 
	return function () {
		context=this;
		args=arguments;
		if(!timer){
			console.log("throttle, set");
			if(immediate){
				fn.apply(context,args);
			}
			run();
		}else{
			console.log("throttle, ignore");
		}
	}
 
}