(function(){
  const sels=[...document.querySelectorAll('select')].filter(e=>e.offsetParent!==null).map(s=>({cls:String(s.className).slice(0,30),opts:[...s.options].map(o=>o.text).slice(0,6)}));
  const body=document.body.innerText;
  const i=body.indexOf('30 秒');
  return JSON.stringify({selects:sels, qtext: i>=0?body.slice(i-100,i+700):body.slice(0,500)},null,1);
})()
