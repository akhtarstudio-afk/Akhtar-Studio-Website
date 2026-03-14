// Nav scroll
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40),{passive:true});

// Hamburger
const ham=document.getElementById('ham'),mob=document.getElementById('mob');
ham.addEventListener('click',()=>mob.classList.toggle('open'));
mob.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mob.classList.remove('open')));

// Scroll reveal — fire immediately for elements in viewport
const revealAll=()=>{
  document.querySelectorAll('.sr:not(.in)').forEach(el=>{
    const r=el.getBoundingClientRect();
    if(r.top<window.innerHeight+60)el.classList.add('in');
  });
};
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
},{threshold:0,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.sr').forEach(el=>io.observe(el));
// Immediate trigger for above-fold elements
document.addEventListener('DOMContentLoaded',revealAll);
window.addEventListener('load',revealAll);
setTimeout(revealAll,200);

// Portfolio horizontal scroll + dots
const ws = document.getElementById('workScroll');
const dots = document.querySelectorAll('.work-dot');
if (ws && dots.length) {
  // drag to scroll
  let isDragging=false,startX=0,scrollLeft=0;
  ws.addEventListener('mousedown',e=>{isDragging=true;ws.classList.add('dragging');startX=e.pageX-ws.offsetLeft;scrollLeft=ws.scrollLeft});
  window.addEventListener('mouseup',()=>{isDragging=false;ws.classList.remove('dragging')});
  ws.addEventListener('mousemove',e=>{if(!isDragging)return;e.preventDefault();const x=e.pageX-ws.offsetLeft;ws.scrollLeft=scrollLeft-(x-startX)*1.2});
  // dot click
  dots.forEach(d=>d.addEventListener('click',()=>{
    const cards=ws.querySelectorAll('.pf-card');
    const idx=+d.dataset.idx;
    if(cards[idx])ws.scrollTo({left:cards[idx].offsetLeft-ws.offsetLeft,behavior:'smooth'});
  }));
  // update dots on scroll
  ws.addEventListener('scroll',()=>{
    const cards=ws.querySelectorAll('.pf-card');
    let closest=0,minDist=Infinity;
    cards.forEach((c,i)=>{const d=Math.abs(c.offsetLeft-ws.offsetLeft-ws.scrollLeft);if(d<minDist){minDist=d;closest=i;}});
    dots.forEach((d,i)=>d.classList.toggle('active',i===closest));
  },{passive:true});
}

// Services accordion + live preview
const svcData = [
  {tag:'Landing Page Design',   title:'Built to convert visitors',         sub:'Strategic wireframes, CRO layouts, Figma files ready for handoff.'},
  {tag:'Webflow Development',   title:'Pixel-perfect, live in days',       sub:'CMS-powered builds from Figma — SEO-ready and fully editable.'},
  {tag:'UI/UX Design',          title:'From flows to full design systems',  sub:'Complete Figma product UI with prototype, tokens and handoff docs.'},
  {tag:'Conversion Optimization',title:'Audit → redesign → more sign-ups', sub:'CRO audits, A/B variants, and data-driven hierarchy improvements.'},
];
const svcItems = document.querySelectorAll('.svc-item');
const previewTag   = document.getElementById('svcPreviewTag');
const previewTitle = document.getElementById('svcPreviewTitle');
const previewSub   = document.getElementById('svcPreviewSub');
svcItems.forEach(item=>{
  item.querySelector('.svc-item-head').addEventListener('click',()=>{
    svcItems.forEach(i=>i.classList.remove('active'));
    item.classList.add('active');
    const idx = +item.dataset.svc;
    if(previewTag)  previewTag.textContent   = svcData[idx].tag;
    if(previewTitle)previewTitle.textContent = svcData[idx].title;
    if(previewSub)  previewSub.textContent   = svcData[idx].sub;
  });
});

// FAQ accordion
document.querySelectorAll('.faq-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const it=btn.closest('.faq-item'),open=it.classList.contains('on');
    document.querySelectorAll('.faq-item.on').forEach(i=>i.classList.remove('on'));
    if(!open)it.classList.add('on');
  });
});