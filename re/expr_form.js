(function(){
  const inputs=[...document.querySelectorAll('textarea,input[type=text],input:not([type]),[contenteditable=true]')].filter(e=>e.offsetParent!==null);
  const vals=inputs.map(e=>({tag:e.tagName,cls:String(e.className).slice(0,40),ph:e.placeholder||'',val:String(e.value||e.innerText||'').slice(0,30)}));
  return JSON.stringify(vals,null,1);
})()
