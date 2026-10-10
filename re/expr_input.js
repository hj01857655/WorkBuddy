(function(){
  const tas=[...document.querySelectorAll('textarea')].filter(t=>t.offsetParent!==null);
  if(tas.length===0){
    const ce=[...document.querySelectorAll('[contenteditable=true]')].filter(t=>t.offsetParent!==null);
    if(ce.length===0) return 'NO INPUT';
    const ta=ce[ce.length-1];
    ta.focus(); document.execCommand('insertText',false,'你好，请继续。');
    return 'FILLED ce';
  }
  const ta=tas[tas.length-1];
  const setter=Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype,'value').set;
  setter.call(ta,'你好，请继续。'); ta.dispatchEvent(new Event('input',{bubbles:true}));
  return 'FILLED textarea';
})()
