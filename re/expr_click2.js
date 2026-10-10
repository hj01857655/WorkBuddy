(function(){
  const els=[...document.querySelectorAll('div,button,span,a,[class*=card]')];
  const t=els.find(e=>(e.innerText||'').trim()==='论文写作导师'&&(e.offsetParent!==null));
  if(!t) return 'NOT FOUND';
  (t.closest('[class*=card]')||t).click();
  return 'CLICKED card of 论文写作导师';
})()
