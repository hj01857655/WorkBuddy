(function(){
  const inp=[...document.querySelectorAll('input')].find(e=>e.className.includes('customInput')&&e.offsetParent!==null);
  if(!inp) return 'NO INPUT';
  const setter=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;
  setter.call(inp,'行业：B2B SaaS；主战场：微信公众号和知乎；目标：获客；产能：每周3篇。');
  inp.dispatchEvent(new Event('input',{bubbles:true}));
  return 'FILLED';
})()
