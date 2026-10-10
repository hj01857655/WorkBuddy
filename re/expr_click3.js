(function(){
  const btn=[...document.querySelectorAll('button')].find(b=>(b.innerText||'').trim()==='论文写作导师'&&b.offsetParent!==null);
  if(!btn) return 'NOT FOUND';
  btn.click();
  return 'CLICKED button';
})()
