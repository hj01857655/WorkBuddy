(function(){
  const pageBtns=[...document.querySelectorAll('[class*=pageBtn]')].filter(e=>e.offsetParent!==null);
  if(pageBtns.length<2) return 'NO PBTNS';
  pageBtns[pageBtns.length-1].click();
  return 'NEXT clicked (btn '+pageBtns.length+')';
})()
