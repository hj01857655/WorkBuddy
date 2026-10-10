(function(){
  const btn=[...document.querySelectorAll('button')].find(b=>b.className.includes('cr-send-button')&&b.offsetParent!==null);
  if(!btn) return 'SEND NOT FOUND';
  const disabled=btn.disabled||btn.getAttribute('disabled')!==null;
  btn.click();
  return 'SEND clicked, disabled='+disabled;
})()
