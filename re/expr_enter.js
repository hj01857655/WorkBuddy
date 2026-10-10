(function(){
  const inp=[...document.querySelectorAll('input')].find(e=>e.className.includes('customInput')&&e.offsetParent!==null);
  if(!inp) return 'NO INPUT';
  inp.focus();
  ['keydown','keypress','keyup'].forEach(t=>{
    inp.dispatchEvent(new KeyboardEvent(t,{key:'Enter',code:'Enter',keyCode:13,which:13,bubbles:true,cancelable:true}));
  });
  const form=inp.closest('form');
  if(form){form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));return 'form submitted'}
  return 'enter dispatched (no form)';
})()
