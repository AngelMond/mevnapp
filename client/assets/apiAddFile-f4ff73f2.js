import{a as r}from"./ModalComponent-5f57c733.js";async function o(e){try{return(await r("/files/loadfile",{method:"post",data:e})).data}catch(a){return{error:a,serverMessage:"Server not available",isServerAvailable:!1}}}export{o as a};
