const file=(url="")=>{
    const extension=url.split('.').pop();
    if(extension==='mp4' || extension==='webm' || extension==='ogg'){
        return 'video';
    }
    if(extension==='mp3' || extension==='wav' || extension==='audio'){
        return 'audio'
    }
    if(extension==='png' || extension==='jpg' || extension==='jpeg' || extension==='gif'){
        return 'image'
    }
    else{
        return 'file'
    }
}
const transformImage=(url='' , width=100)=>url;

const getOrSaveItem=({key,value,get})=>{
    if(get){
       return  localStorage.getItem(key)? JSON.parse(localStorage.getItem(key)) : null
    }
    else{
        localStorage.setItem(key,JSON.stringify(value));
    
    }
}

export {file,transformImage,getOrSaveItem};