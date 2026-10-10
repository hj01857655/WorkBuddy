(function(){
  const btns=[...document.querySelectorAll('button')].filter(b=>b.offsetParent!==null&&((b.className||'').includes('cr-send-button')||(b.innerText||'').trim()==='发送'));
  if(btns.length===0) return 'NO SEND';
  btns[btns.length-1].click();
  return 'SEND clicked';
})()
