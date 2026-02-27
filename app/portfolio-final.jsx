import { useState, useEffect, useRef, useCallback } from "react";

const GOLD = "#e8b86d";
const BG = "#06070f";
const PHOTO_SRC = "data:image/jpeg;base64,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";

const data = {
  name: "Suhani Singhania",
  title: "Full-Stack Developer · ML Engineer · CS @ VIT · Class of 2027",
  contact: {
    email: "suhanee14@gmail.com",
    github: "https://github.com/Suhani-Singhania",
    linkedin: "https://linkedin.com/in/suhani-singhania",
    resume: "/resume.pdf",
  },
  experience: [
    {
      role: "Web Development Intern",
      company: "SentiAid",
      period: "May–Jul 2025",
      color: "#4fc3f7",
      bullets: [
        "Built healthcare features with MongoDB, Express, Node.js — 25% faster data access for 50+ daily users",
        "Optimized APIs & DB queries → load time cut from 4s to 2.5s (38% improvement)",
      ],
    },
    {
      role: "Media & Finance Manager",
      company: "RoverX VIT",
      period: "Apr–Sep 2024",
      color: "#81c784",
      bullets: [
        "Managed ₹10,000+ sponsorships, delivering 10% under budget",
        "Coordinated 6 teams & 30 members with 100% on-time delivery",
      ],
    },
  ],
  projects: [
    {
      name: "Food Allergen Detection",
      stack: "PyTorch · ViT · React · REST API",
      desc: "ML classifier achieving 92% accuracy using Vision Transformers for real-time food allergen detection.",
      icon: "🔬",
      color: "#ff6b6b",
      glow: "rgba(255,107,107,0.25)",
      github: "https://github.com/Suhani-Singhania",
      live: null,
    },
    {
      name: "MindMate",
      stack: "Python · Streamlit · SQLite",
      desc: "Mental wellness companion with mood tracking & journaling. 25+ testers, 4.5/5 rating in 2 weeks.",
      icon: "🧠",
      color: "#a78bfa",
      glow: "rgba(167,139,250,0.25)",
      github: "https://github.com/Suhani-Singhania",
      live: null,
    },
    {
      name: "YASA TRADERS",
      stack: "HTML · CSS · JavaScript · Node.js",
      desc: "Full-stack e-commerce with secure auth, cart & payments. 95+ Lighthouse score.",
      icon: "🛒",
      color: "#34d399",
      glow: "rgba(52,211,153,0.25)",
      github: "https://github.com/Suhani-Singhania",
      live: "https://suhani-singhania.github.io/yasa_traders/",
    },
  ],
  leetcode: "SuhaniSinghania",
  skills: [
    { cat: "Languages", items: ["Python", "JavaScript", "C++", "SQL", "HTML/CSS"], color: GOLD },
    { cat: "Frameworks", items: ["React", "Node.js", "Express", "Streamlit", "PyTorch"], color: "#a78bfa" },
    { cat: "Cloud & DB", items: ["MongoDB", "SQLite", "AWS EC2", "S3", "RDS"], color: "#34d399" },
    { cat: "Tools", items: ["Git", "Figma", "VS Code", "Canva"], color: "#4fc3f7" },
  ],
};

// Particle canvas
function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.2 + 0.3, o: Math.random() * 0.4 + 0.1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,184,109,${p.o})`; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx*dx+dy*dy);
        if (d < 110) { ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.strokeStyle=`rgba(232,184,109,${0.07*(1-d/110)})`; ctx.lineWidth=0.5; ctx.stroke(); }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none" }} />;
}

// 3D tilt hook
function TiltCard({ children, style={}, glow="rgba(232,184,109,0.12)" }) {
  const ref = useRef(null);
  const onMove = useCallback(e => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x*14}deg) rotateX(${-y*14}deg) translateZ(12px)`;
    el.style.boxShadow = `${-x*18}px ${-y*18}px 40px ${glow}, 0 0 50px ${glow}`;
  }, [glow]);
  const onLeave = useCallback(() => {
    const el = ref.current; if (!el) return;
    el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0)";
    el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.5)";
  }, []);
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ transition:"transform 0.1s ease,box-shadow 0.15s ease", transformStyle:"preserve-3d", willChange:"transform", boxShadow:"0 8px 32px rgba(0,0,0,0.5)", ...style }}>
      {children}
    </div>
  );
}

// Scroll reveal
function Reveal({ children, style={}, delay=0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if(ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis?1:0, transform: vis?"translateY(0)":"translateY(40px)", transition:`opacity 0.8s ${delay}ms cubic-bezier(.16,1,.3,1), transform 0.8s ${delay}ms cubic-bezier(.16,1,.3,1)`, ...style }}>
      {children}
    </div>
  );
}

function SectionLabel({ text }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:52 }}>
      <div style={{ height:1, width:40, background:`linear-gradient(to right, transparent, ${GOLD})` }} />
      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.25em", color:GOLD }}>{text}</span>
      <div style={{ height:1, flex:1, background:`linear-gradient(to right, ${GOLD}, transparent)` }} />
    </div>
  );
}


function LeetCodeCard({ username }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`)
      .then(r => r.json())
      .then(d => {
        setStats({
          total: d.solvedProblem || 0,
          easy: d.easySolved || 0,
          medium: d.mediumSolved || 0,
          hard: d.hardSolved || 0,
        });
        setLoading(false);
      })
      .catch(() => {
        // Fallback display if API is unavailable
        setStats({ total: '—', easy: '—', medium: '—', hard: '—' });
        setLoading(false);
      });
  }, [username]);

  const tiers = [
    { label: 'Easy', key: 'easy', color: '#34d399', total: 800 },
    { label: 'Medium', key: 'medium', color: '#fbbf24', total: 1700 },
    { label: 'Hard', key: 'hard', color: '#f87171', total: 700 },
  ];

  return (
    <TiltCard glow="rgba(255,192,64,0.12)" style={{ borderRadius:20, background:'rgba(255,255,255,0.03)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.06)', padding:'36px 40px' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:20 }}>
        {/* Left: total + link */}
        <div style={{ display:'flex', alignItems:'center', gap:24 }}>
          <div style={{ position:'relative', width:100, height:100 }}>
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke={GOLD} strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={loading || stats?.total === '—' ? 2*Math.PI*42 : 2*Math.PI*42*(1 - Math.min((stats?.total||0)/3200, 1))}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                style={{ transition:'stroke-dashoffset 1.2s ease' }}
              />
            </svg>
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:'#e8e4dc', lineHeight:1 }}>
                {loading ? '...' : stats?.total}
              </span>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:'#4a4640', letterSpacing:'0.08em', marginTop:3 }}>SOLVED</span>
            </div>
          </div>
          <div>
            <p style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:'#e8e4dc', marginBottom:4 }}>LeetCode</p>
            <a href={`https://leetcode.com/u/${username}/`} target="_blank"
              style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:GOLD, letterSpacing:'0.08em' }}
              onMouseOver={e=>e.currentTarget.style.textDecoration='underline'}
              onMouseOut={e=>e.currentTarget.style.textDecoration='none'}>
              @{username} ↗
            </a>
          </div>
        </div>

        {/* Right: breakdown bars */}
        <div style={{ flex:1, minWidth:200, display:'flex', flexDirection:'column', gap:14 }}>
          {tiers.map(t => (
            <div key={t.label}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:t.color, letterSpacing:'0.08em' }}>{t.label}</span>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:'#4a4640' }}>
                  {loading ? '...' : stats?.[t.key]}
                </span>
              </div>
              <div style={{ height:4, background:'rgba(255,255,255,0.05)', borderRadius:4, overflow:'hidden' }}>
                <div style={{
                  height:'100%', borderRadius:4, background:t.color,
                  width: loading || stats?.[t.key] === '—' ? '0%' : `${Math.min(((stats?.[t.key]||0)/t.total)*100, 100)}%`,
                  transition:'width 1.2s ease',
                  boxShadow:`0 0 8px ${t.color}80`,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </TiltCard>
  );
}

const NAV = ["About","Experience","Projects","Skills","Contact"];

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [mouse, setMouse] = useState({ x:0, y:0 });
  const [activeNav, setActiveNav] = useState("About");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    const onMouse = e => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMouse);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("mousemove", onMouse); };
  }, []);

  const scrollTo = id => {
    setActiveNav(id);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior:"smooth" });
  };

  const px = (mouse.x / (window.innerWidth||1) - 0.5) * 20;
  const py = (mouse.y / (window.innerHeight||1) - 0.5) * 12;

  return (
    <div style={{ fontFamily:"Georgia,serif", background:BG, color:"#e8e4dc", minHeight:"100vh", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Mono:wght@300;400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:${GOLD}}
        @keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-18px) rotate(1deg)}}
        @keyframes ring-spin{from{transform:perspective(500px) rotateY(0deg) rotateX(15deg)}to{transform:perspective(500px) rotateY(360deg) rotateX(15deg)}}
        @keyframes pulse-border{0%,100%{box-shadow:0 0 0 0 rgba(232,184,109,0.3)}50%{box-shadow:0 0 0 8px rgba(232,184,109,0)}}
        @keyframes hero-in{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes photo-in{from{opacity:0;transform:perspective(800px) rotateY(20deg) translateZ(-40px)}to{opacity:1;transform:perspective(800px) rotateY(0deg) translateZ(0)}}
        @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
        .nav-btn:hover{color:${GOLD} !important}
        .skill-chip:hover{background:rgba(232,184,109,0.12) !important;border-color:${GOLD} !important;color:${GOLD} !important;transform:translateY(-3px);}
        .proj-btn:hover{opacity:1 !important;transform:translateY(-1px);}
        .social-link:hover{color:${GOLD} !important;letter-spacing:0.22em !important;}
        a{color:inherit;text-decoration:none}
      `}</style>

      {/* BG orbs */}
      {[
        {x:"8%",y:"12%",s:500,c:"rgba(232,184,109,0.09)",b:90,d:8},
        {x:"68%",y:"55%",s:380,c:"rgba(99,102,241,0.07)",b:100,d:11},
        {x:"35%",y:"78%",s:280,c:"rgba(52,211,153,0.06)",b:80,d:13},
      ].map((o,i)=>(
        <div key={i} style={{ position:"fixed", left:o.x, top:o.y, width:o.s, height:o.s, borderRadius:"50%", background:`radial-gradient(circle, ${o.c} 0%, transparent 70%)`, filter:`blur(${o.b}px)`, animation:`float ${o.d}s ease-in-out infinite alternate`, pointerEvents:"none", zIndex:0 }} />
      ))}

      <ParticleCanvas />

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, height:64, padding:"0 52px", display:"flex", alignItems:"center", justifyContent:"space-between", background: scrolled?"rgba(6,7,15,0.88)":"transparent", backdropFilter: scrolled?"blur(20px)":"none", borderBottom: scrolled?"1px solid rgba(232,184,109,0.1)":"none", transition:"all 0.4s ease" }}>
        <button onClick={()=>scrollTo("About")} style={{ background:"none", border:"none", cursor:"pointer", position:"relative" }}>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:900, color:GOLD, letterSpacing:"0.08em" }}>SS</span>
          <div style={{ position:"absolute", inset:-5, border:"1px solid rgba(232,184,109,0.3)", borderRadius:2, animation:"pulse-border 3s ease-in-out infinite" }} />
        </button>
        <div style={{ display:"flex", gap:32 }}>
          {NAV.map(n=>(
            <button key={n} className="nav-btn" onClick={()=>scrollTo(n)} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.14em", color: activeNav===n ? GOLD : "#4a4640", transition:"color 0.2s", borderBottom: activeNav===n ? `1px solid ${GOLD}` : "1px solid transparent", paddingBottom:2 }}>
              {n.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="about" style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:"80px 52px 0", position:"relative", overflow:"hidden" }}>
        {/* Rotating rings */}
        <div style={{ position:"absolute", right:"6%", top:"50%", marginTop:-180, width:360, height:360, border:"1px solid rgba(232,184,109,0.08)", borderRadius:"50%", animation:"ring-spin 22s linear infinite", pointerEvents:"none" }} />
        <div style={{ position:"absolute", right:"9%", top:"50%", marginTop:-130, width:260, height:260, border:"1px solid rgba(232,184,109,0.05)", borderRadius:"50%", animation:"ring-spin 15s linear infinite reverse", pointerEvents:"none" }} />

        {/* Left: text */}
        <div style={{ flex:1, maxWidth:620, zIndex:10, animation:"hero-in 1s cubic-bezier(.16,1,.3,1) both" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:22 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:GOLD, boxShadow:`0 0 12px ${GOLD}` }} />
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.22em", color:GOLD }}>AVAILABLE FOR INTERNSHIPS · 2026</span>
          </div>

          <div style={{ transform:`translate(${px*0.25}px, ${py*0.15}px)`, transition:"transform 0.12s ease" }}>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(56px,8.5vw,112px)", fontWeight:900, lineHeight:0.92, letterSpacing:"-0.03em", marginBottom:24 }}>
              <span style={{ display:"block", color:"#e8e4dc" }}>Suhani</span>
              <span style={{ display:"block", WebkitTextStroke:`1.5px ${GOLD}`, color:"transparent", filter:`drop-shadow(0 0 20px rgba(232,184,109,0.25))` }}>Singhania</span>
            </h1>
          </div>

          <p style={{ fontFamily:"'DM Mono',monospace", fontSize:14, color:"#6a6460", lineHeight:1.9, maxWidth:480, marginBottom:40 }}>
            Building full-stack products & ML systems that solve real problems — 3rd year CS undergrad at <span style={{ color:GOLD }}>VIT Vellore</span>, class of 2027.
          </p>

          <div style={{ display:"flex", gap:14, flexWrap:"wrap", marginBottom:52 }}>
            <TiltCard style={{ borderRadius:3 }}>
              <button onClick={()=>scrollTo("Projects")} style={{ padding:"13px 32px", background:`linear-gradient(135deg, ${GOLD}, #c08830)`, border:"none", color:"#06070f", cursor:"pointer", fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.14em", fontWeight:600, borderRadius:3 }}>
                VIEW PROJECTS ↗
              </button>
            </TiltCard>
            <TiltCard style={{ borderRadius:3 }}>
              <a href={data.contact.resume} target="_blank" style={{ display:"block", padding:"13px 32px", background:"transparent", border:"1px solid rgba(232,184,109,0.3)", color:GOLD, fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.14em", borderRadius:3 }}>
                DOWNLOAD CV ↓
              </a>
            </TiltCard>
          </div>

          <div style={{ display:"flex", gap:44 }}>
            {[["2+","Yrs Coding"],["3","Live Projects"],["92%","ML Accuracy"]].map(([n,l])=>(
              <div key={l}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:34, fontWeight:700, color:GOLD, lineHeight:1 }}>{n}</div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#3a3630", marginTop:5, letterSpacing:"0.1em" }}>{l.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 3D floating photo card */}
        <div style={{ flex:"0 0 auto", zIndex:10, marginLeft:48, animation:"photo-in 1.2s 0.3s cubic-bezier(.16,1,.3,1) both" }}>
          <TiltCard glow="rgba(232,184,109,0.2)" style={{ borderRadius:24, width:300, overflow:"hidden", position:"relative" }}>
            {/* Glassmorphic overlay frame */}
            <div style={{ position:"relative", borderRadius:24, overflow:"hidden", border:"1px solid rgba(232,184,109,0.2)", boxShadow:"0 32px 80px rgba(0,0,0,0.7)" }}>
              {/* Photo */}
              <img src={PHOTO_SRC} alt="Suhani Singhania" style={{ width:"100%", height:360, objectFit:"cover", objectPosition:"top", display:"block" }} />
              {/* Glass bottom info card */}
              <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"rgba(6,7,15,0.75)", backdropFilter:"blur(16px)", borderTop:"1px solid rgba(232,184,109,0.15)", padding:"18px 20px" }}>
                <p style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:700, color:"#e8e4dc", marginBottom:4 }}>Suhani Singhania</p>
                <p style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:GOLD, letterSpacing:"0.1em" }}>CS @ VIT · FULL-STACK · ML</p>
                <div style={{ display:"flex", gap:10, marginTop:12 }}>
                  {[
                    { label:"GitHub", href: data.contact.github },
                    { label:"LinkedIn", href: data.contact.linkedin },
                  ].map(l=>(
                    <a key={l.label} href={l.href} target="_blank" style={{ fontFamily:"'DM Mono',monospace", fontSize:10, padding:"4px 10px", border:"1px solid rgba(232,184,109,0.25)", borderRadius:20, color:"#6a6460", transition:"all 0.2s" }}
                      onMouseOver={e=>{ e.currentTarget.style.borderColor=GOLD; e.currentTarget.style.color=GOLD; }}
                      onMouseOut={e=>{ e.currentTarget.style.borderColor="rgba(232,184,109,0.25)"; e.currentTarget.style.color="#6a6460"; }}>
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            {/* Corner glow accents */}
            <div style={{ position:"absolute", top:-1, left:-1, width:40, height:40, borderTop:`2px solid ${GOLD}`, borderLeft:`2px solid ${GOLD}`, borderRadius:"24px 0 0 0", pointerEvents:"none" }} />
            <div style={{ position:"absolute", bottom:-1, right:-1, width:40, height:40, borderBottom:`2px solid ${GOLD}`, borderRight:`2px solid ${GOLD}`, borderRadius:"0 0 24px 0", pointerEvents:"none" }} />
          </TiltCard>
        </div>

        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:120, background:`linear-gradient(to top, ${BG}, transparent)`, pointerEvents:"none" }} />
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ padding:"120px 52px", position:"relative", zIndex:10 }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <Reveal><SectionLabel text="EXPERIENCE" /></Reveal>
          <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
            {data.experience.map((exp,i)=>(
              <Reveal key={i} delay={i*120}>
                <TiltCard glow={`${exp.color}20`} style={{ borderRadius:18, background:"rgba(255,255,255,0.03)", backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.06)", padding:"36px 40px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20, flexWrap:"wrap", gap:8 }}>
                    <div>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{ width:9, height:9, borderRadius:"50%", background:exp.color, boxShadow:`0 0 10px ${exp.color}` }} />
                        <p style={{ fontFamily:"'Playfair Display',serif", fontSize:21, fontWeight:700, color:"#e8e4dc" }}>{exp.role}</p>
                      </div>
                      <p style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:exp.color, marginTop:5, marginLeft:19 }}>{exp.company}</p>
                    </div>
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#3a3630", background:"rgba(255,255,255,0.04)", padding:"4px 12px", borderRadius:20 }}>{exp.period}</span>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:10, marginLeft:19 }}>
                    {exp.bullets.map((b,j)=>(
                      <div key={j} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                        <span style={{ color:exp.color, fontSize:12, marginTop:3, flexShrink:0 }}>▸</span>
                        <span style={{ fontFamily:"Georgia,serif", fontSize:14, color:"#7a7468", lineHeight:1.75 }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding:"120px 52px", position:"relative", zIndex:10 }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <Reveal><SectionLabel text="PROJECTS" /></Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:20 }}>
            {data.projects.map((p,i)=>(
              <Reveal key={i} delay={i*100}>
                <TiltCard glow={p.glow} style={{ borderRadius:20, background:"linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))", backdropFilter:"blur(24px)", border:"1px solid rgba(255,255,255,0.07)", padding:"30px 26px", position:"relative", overflow:"hidden", height:"100%" }}>
                  <div style={{ position:"absolute", top:0, right:0, width:90, height:90, background:`radial-gradient(circle at top right, ${p.glow}, transparent 70%)`, pointerEvents:"none" }} />
                  <div style={{ fontSize:32, marginBottom:14 }}>{p.icon}</div>
                  <p style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, color:"#e8e4dc", marginBottom:8 }}>{p.name}</p>
                  <p style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:p.color, letterSpacing:"0.06em", marginBottom:14 }}>{p.stack}</p>
                  <p style={{ fontFamily:"Georgia,serif", fontSize:13, color:"#6a6460", lineHeight:1.8, marginBottom:20 }}>{p.desc}</p>
                  {/* Interactive links */}
                  <div style={{ display:"flex", gap:10, marginTop:"auto" }}>
                    {p.github && (
                      <a href={p.github} target="_blank" className="proj-btn" style={{ fontFamily:"'DM Mono',monospace", fontSize:10, padding:"5px 14px", border:`1px solid ${p.color}60`, borderRadius:20, color:p.color, opacity:0.7, transition:"all 0.2s", display:"flex", alignItems:"center", gap:5 }}>
                        <span>⌥</span> GitHub
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" className="proj-btn" style={{ fontFamily:"'DM Mono',monospace", fontSize:10, padding:"5px 14px", background:p.color, border:"none", borderRadius:20, color:"#06070f", opacity:0.8, fontWeight:600, transition:"all 0.2s", display:"flex", alignItems:"center", gap:5 }}>
                        <span>↗</span> Live
                      </a>
                    )}
                  </div>
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:`linear-gradient(to right, transparent, ${p.color}, transparent)`, opacity:0.5 }} />
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEETCODE ── */}
      <section id="leetcode" style={{ padding:"0 52px 120px", position:"relative", zIndex:10 }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <Reveal><SectionLabel text="DSA · COMPETITIVE PROGRAMMING" /></Reveal>
          <Reveal delay={100}><LeetCodeCard username={data.leetcode} /></Reveal>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding:"120px 52px", position:"relative", zIndex:10 }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <Reveal><SectionLabel text="SKILLS" /></Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:20 }}>
            {data.skills.map((sk,i)=>(
              <Reveal key={sk.cat} delay={i*80}>
                <TiltCard glow={`${sk.color}18`} style={{ borderRadius:16, background:"rgba(255,255,255,0.025)", backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.05)", padding:"28px 30px" }}>
                  <p style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.2em", color:sk.color, marginBottom:18, textTransform:"uppercase" }}>{sk.cat}</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                    {sk.items.map((item,j)=>(
                      <span key={j} className="skill-chip" style={{ fontFamily:"'DM Mono',monospace", fontSize:12, padding:"5px 14px", borderRadius:20, border:"1px solid rgba(255,255,255,0.07)", color:"#8a8070", background:"rgba(255,255,255,0.03)", cursor:"default", transition:"all 0.2s", display:"inline-block" }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding:"120px 52px 80px", position:"relative", zIndex:10 }}>
        <div style={{ maxWidth:660, margin:"0 auto", textAlign:"center" }}>
          <Reveal><SectionLabel text="CONTACT" /></Reveal>
          <Reveal delay={100}>
            <TiltCard glow="rgba(232,184,109,0.1)" style={{ borderRadius:24, background:"rgba(255,255,255,0.025)", backdropFilter:"blur(30px)", border:"1px solid rgba(232,184,109,0.1)", padding:"64px 52px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:400, height:400, borderRadius:"50%", background:`radial-gradient(circle, rgba(232,184,109,0.04), transparent 70%)`, pointerEvents:"none" }} />
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(32px,4.5vw,56px)", fontWeight:900, lineHeight:1.1, marginBottom:16 }}>
                Let's build<br /><span style={{ WebkitTextStroke:`1px ${GOLD}`, color:"transparent" }}>something great.</span>
              </h2>
              <p style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:"#4a4640", marginBottom:40, lineHeight:1.8 }}>
                Open to internships, collabs & exciting ideas.
              </p>
              <a href={`mailto:${data.contact.email}`}
                style={{ display:"inline-block", padding:"15px 44px", background:`linear-gradient(135deg, ${GOLD}, #c08830)`, color:"#06070f", borderRadius:4, fontFamily:"'DM Mono',monospace", fontSize:12, letterSpacing:"0.15em", fontWeight:600, textDecoration:"none", boxShadow:"0 0 30px rgba(232,184,109,0.2)", transition:"transform 0.2s,box-shadow 0.2s" }}
                onMouseOver={e=>{ e.currentTarget.style.transform="scale(1.04)"; e.currentTarget.style.boxShadow="0 0 60px rgba(232,184,109,0.45)"; }}
                onMouseOut={e=>{ e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 0 30px rgba(232,184,109,0.2)"; }}>
                SAY HELLO →
              </a>
              <div style={{ display:"flex", justifyContent:"center", gap:36, marginTop:48 }}>
                {[
                  { l:"GITHUB", h:data.contact.github },
                  { l:"LINKEDIN", h:data.contact.linkedin },
                  { l:"RESUME", h:data.contact.resume },
                ].map(({l,h})=>(
                  <a key={l} href={h} target="_blank" className="social-link" style={{ fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.14em", color:"#3a3630", transition:"color 0.2s,letter-spacing 0.3s" }}>{l}</a>
                ))}
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      <footer style={{ padding:"24px 52px", borderTop:"1px solid rgba(255,255,255,0.03)", textAlign:"center", position:"relative", zIndex:10 }}>
        <p style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#1a1816", letterSpacing:"0.1em" }}>© 2026 SUHANI SINGHANIA · CRAFTED WITH ✦</p>
      </footer>
    </div>
  );
}
