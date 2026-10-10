(function(){
  const opt=[...document.querySelectorAll('button,[role=button],[class*=option],[class*=choice]')].find(e=>(e.innerText||'').trim().replace(/^\d+\//,'')==='人文社科'&&e.offsetParent!==null);
  if(!opt) return 'OPT NOT FOUND';
  opt.click();
  return 'CLICKED 人文社科';
})()
