(function(){
  const tab=[...document.querySelectorAll('button')].find(b=>(b.innerText||'').trim().startsWith('专家·技能·连接器'));
  if(tab) tab.click();
  return 'tab clicked';
})()
