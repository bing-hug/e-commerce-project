//防抖

function debounce(func, delay){
    let timer;
    return function(...args){
        let context = this;
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(()=>{
            func.apply(context, args)
            timer = null;
        }, delay)
    }
}

//节流

function throttle(func, delay){
    let oldTime = Date.now();
    return function (...args){
        let context = this;
        let newTime = Date.now();
        if(newTime - oldTime >= delay){
            func.apply(context, args);
            oldTime = Date.now();
        }
    }
}


export {
    debounce,
    throttle
}