(function(){
  const pageBtns=[...document.querySelectorAll('[class*=pageBtn]')].filter(e=>e.offsetParent!==null);
  if(pageBtns.length<2) return 'PBTNS:'+pageBtns.length;
  const opt=document.querySelector('[class*=optionItem]');
  if(opt&&opt.offsetParent!==null){opt.click();return 'picked then next'}
  return 'no option, just next';
})()
