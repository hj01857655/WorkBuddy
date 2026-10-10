(function(){
  const btn=[...document.querySelectorAll('button')].find(b=>b.className.includes('cr-send-button')&&b.offsetParent!==null);
  if(!btn) return 'SEND NOT FOUND';
  btn.click();
  return 'SENT';
})()
