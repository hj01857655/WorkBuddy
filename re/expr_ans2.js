(function(){
  const btns=[...document.querySelectorAll('button')].filter(b=>(b.innerText||'').trim()==='发送'&&b.offsetParent!==null);
  const b=btns[btns.length-1];
  if(!b) return 'SEND NOT FOUND';
  b.click();
  return 'ANSWER SENT';
})()
