(async function(){
  const log=[];
  for(let i=0;i<10;i++){
    const opts=[...document.querySelectorAll('[class*=optionItem]')].filter(e=>e.offsetParent!==null);
    if(opts.length===0){log.push('step'+i+': no options (done?)');break}
    opts[0].click();
    log.push('step'+i+': clicked "'+(opts[0].innerText||'').trim().slice(0,12)+'" of '+opts.length);
    await new Promise(r=>setTimeout(r,1200));
  }
  return JSON.stringify(log);
})()
