// @ts-nocheck
"use client";
// @ts-nocheck
"use client";
// @ts-nocheck
import React, { useState, useEffect, useRef, useCallback } from "react";

const PHOTO = "data:image/jpeg;base64,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";

const data = {
  name: "Suhani Singhania",
  contact: { email: "suhanee14@gmail.com", github: "https://github.com/Suhani-Singhania", linkedin: "https://linkedin.com/in/suhani-singhania", resume: "/resume.pdf" },
  leetcode: "SuhaniSinghania",
  experience: [
    { role: "Web Development Intern", company: "SentiAid", period: "May–Jul 2025", color: "#38bdf8", bullets: ["Built healthcare features with MongoDB, Express, Node.js — 25% faster data access for 50+ daily users", "Optimized APIs & DB queries → load time cut from 4s to 2.5s (38% improvement)"] },
    { role: "Media & Finance Manager", company: "RoverX VIT", period: "Apr–Sep 2024", color: "#4ade80", bullets: ["Managed ₹10,000+ sponsorships, delivering 10% under budget", "Coordinated 6 teams & 30 members with 100% on-time delivery"] },
  ],
  projects: [
    { name: "Food Allergen Detection", stack: "PyTorch · ViT · React · REST API", desc: "ML classifier achieving 92% accuracy using Vision Transformers for real-time allergen detection.", icon: "🔬", color: "#f472b6", glow: "rgba(244,114,182,0.3)", github: "https://github.com/Suhani-Singhania", live: null },
    { name: "MindMate", stack: "Python · Streamlit · SQLite", desc: "Mental wellness companion with mood tracking & journaling. 25+ testers, 4.5/5 rating in 2 weeks.", icon: "🧠", color: "#a78bfa", glow: "rgba(167,139,250,0.3)", github: "https://github.com/Suhani-Singhania", live: null },
    { name: "YASA TRADERS", stack: "HTML · CSS · JavaScript · Node.js", desc: "Full-stack e-commerce with secure auth, cart & payments. 95+ Lighthouse score.", icon: "🛒", color: "#34d399", glow: "rgba(52,211,153,0.3)", github: "https://github.com/Suhani-Singhania", live: "https://suhani-singhania.github.io/yasa_traders/" },
  ],
  skills: [
    { cat: "Languages", items: ["Python", "JavaScript", "C++", "SQL", "HTML/CSS"], color: "#f472b6" },
    { cat: "Frameworks", items: ["React", "Node.js", "Express", "Streamlit", "PyTorch"], color: "#a78bfa" },
    { cat: "Cloud & DB", items: ["MongoDB", "SQLite", "AWS EC2", "S3", "RDS"], color: "#38bdf8" },
    { cat: "Tools", items: ["Git", "Figma", "VS Code", "Canva"], color: "#4ade80" },
  ],
};

// ── Stars canvas ──────────────────────────────────────────────────────────────
function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let raf: number, t = 0;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.4 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.005,
    }));
    const nebulas = [
      { x: 0.15, y: 0.25, r: 280, c: "rgba(232,184,109," },
      { x: 0.75, y: 0.6,  r: 320, c: "rgba(201,147,58," },
      { x: 0.5,  y: 0.85, r: 220, c: "rgba(244,114,182," },
      { x: 0.88, y: 0.15, r: 180, c: "rgba(52,211,153," },
    ];
    const draw = () => {
      t += 0.006;
      ctx.clearRect(0, 0, c.width, c.height);
      // deep space bg
      const bg = ctx.createLinearGradient(0, 0, c.width, c.height);
      bg.addColorStop(0, "#020510"); bg.addColorStop(0.5, "#050a1a"); bg.addColorStop(1, "#070312");
      ctx.fillStyle = bg; ctx.fillRect(0, 0, c.width, c.height);
      // nebulas
      nebulas.forEach(n => {
        const grd = ctx.createRadialGradient(n.x*c.width, n.y*c.height, 0, n.x*c.width, n.y*c.height, n.r);
        const op = 0.06 + 0.02 * Math.sin(t + n.x * 5);
        grd.addColorStop(0, n.c + op + ")"); grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd; ctx.fillRect(0,0,c.width,c.height);
      });
      // stars
      stars.forEach(s => {
        s.pulse += s.speed;
        const op = 0.4 + 0.6 * Math.abs(Math.sin(s.pulse));
        const r = s.r * (0.8 + 0.2 * Math.abs(Math.sin(s.pulse)));
        ctx.beginPath(); ctx.arc(s.x*c.width, s.y*c.height, r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${op})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none" }} />;
}

// ── 3D tilt ───────────────────────────────────────────────────────────────────
function TiltCard({ children, style={}, glow="rgba(139,92,246,0.2)" }: { children: React.ReactNode; style?: React.CSSProperties; glow?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = useCallback(e => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x*14}deg) rotateX(${-y*14}deg) translateZ(16px)`;
    el.style.boxShadow = `${-x*20}px ${-y*20}px 50px ${glow}, 0 0 60px ${glow}`;
  }, [glow]);
  const onLeave = useCallback(() => {
    const el = ref.current; if (!el) return;
    el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0)";
    el.style.boxShadow = "0 8px 40px rgba(0,0,0,0.6)";
  }, []);
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ transition:"transform 0.12s ease, box-shadow 0.15s ease", transformStyle:"preserve-3d", willChange:"transform", boxShadow:"0 8px 40px rgba(0,0,0,0.6)", ...style }}>
      {children}
    </div>
  );
}

// ── Scroll reveal ─────────────────────────────────────────────────────────────
function Reveal({ children, delay=0, style={} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null); const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVis(true); }, { threshold:0.1 });
    if(ref.current) obs.observe(ref.current); return () => obs.disconnect();
  }, []);
  return <div ref={ref} style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(40px)", transition:`opacity 0.8s ${delay}ms ease, transform 0.8s ${delay}ms ease`, ...style }}>{children}</div>;
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:48 }}>
      <div style={{ height:1, width:36, background:"linear-gradient(to right, transparent, #e8b86d)" }} />
      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.25em", color:"#e8b86d", textTransform:"uppercase" }}>{text}</span>
      <div style={{ height:1, flex:1, background:"linear-gradient(to right, #e8b86d, transparent)" }} />
    </div>
  );
}

// ── LeetCode card ─────────────────────────────────────────────────────────────
function LeetCodeCard({ username }: { username: string }) {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`)
      .then(r => r.json())
      .then(d => setStats({ total: d.solvedProblem||0, easy: d.easySolved||0, medium: d.mediumSolved||0, hard: d.hardSolved||0 }))
      .catch(() => setStats({ total:"—", easy:"—", medium:"—", hard:"—" }));
  }, [username]);
  const tiers = [{ label:"Easy", key:"easy", color:"#4ade80", max:800 }, { label:"Medium", key:"medium", color:"#fbbf24", max:1700 }, { label:"Hard", key:"hard", color:"#f87171", max:700 }];
  return (
    <TiltCard glow="rgba(232,184,109,0.2)" style={{ borderRadius:20, background:"rgba(255,255,255,0.04)", backdropFilter:"blur(20px)", border:"1px solid rgba(232,184,109,0.15)", padding:"36px 40px" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:24 }}>
        <div style={{ display:"flex", alignItems:"center", gap:24 }}>
          <div style={{ position:"relative", width:96, height:96 }}>
            <svg width="96" height="96" viewBox="0 0 96 96">
              <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="7"/>
              <circle cx="48" cy="48" r="40" fill="none" stroke="#e8b86d" strokeWidth="7"
                strokeDasharray={`${2*Math.PI*40}`}
                strokeDashoffset={String(stats && stats.total !== '—' ? 2*Math.PI*40*(1-Math.min((Number(stats.total)||0)/3200,1)) : 2*Math.PI*40)}
                strokeLinecap="round" transform="rotate(-90 48 48)"
                style={{ transition:"stroke-dashoffset 1.4s ease", filter:"drop-shadow(0 0 6px #a78bfa)" }}/>
            </svg>
            <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:700, color:"#f0eeff", lineHeight:1 }}>{stats ? stats.total : "…"}</span>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:8, color:"#6b7280", marginTop:3, letterSpacing:"0.1em" }}>SOLVED</span>
            </div>
          </div>
          <div>
            <p style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"#f0eeff" }}>LeetCode</p>
            <a href={`https://leetcode.com/u/${username}/`} target="_blank" style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#e8b86d", letterSpacing:"0.06em" }}>@{username} ↗</a>
          </div>
        </div>
        <div style={{ flex:1, minWidth:200, display:"flex", flexDirection:"column", gap:12 }}>
          {tiers.map(t => (
            <div key={t.label}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:t.color }}>{t.label}</span>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#4b5563" }}>{stats ? stats[t.key] : "…"}</span>
              </div>
              <div style={{ height:4, background:"rgba(255,255,255,0.05)", borderRadius:4, overflow:"hidden" }}>
                <div style={{ height:"100%", borderRadius:4, background:t.color, width: stats && stats[t.key]!=="—" ? `${Math.min((stats[t.key]/t.max)*100,100)}%` : "0%", transition:"width 1.4s ease", boxShadow:`0 0 8px ${t.color}90` }} />
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
  const [winSize, setWinSize] = useState({ w:1440, h:900 });
  const [activeNav, setActiveNav] = useState("About");

  useEffect(() => {
    setWinSize({ w: window.innerWidth, h: window.innerHeight });
    const onScroll = () => setScrolled(window.scrollY > 50);
    const onMouse = e => setMouse({ x:e.clientX, y:e.clientY });
    const onResize = () => setWinSize({ w:window.innerWidth, h:window.innerHeight });
    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("mousemove", onMouse); window.removeEventListener("resize", onResize); };
  }, []);

  const scrollTo = id => { setActiveNav(id); document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior:"smooth" }); };
  const px = (mouse.x / winSize.w - 0.5) * 18;
  const py = (mouse.y / winSize.h - 0.5) * 10;

  return (
    <div style={{ fontFamily:"Georgia, serif", minHeight:"100vh", overflowX:"hidden", color:"#e2e8f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Mono:wght@300;400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:linear-gradient(#e8b86d,#c9933a)}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
        @keyframes orbit{from{transform:rotate(0deg) translateX(120px) rotate(0deg)}to{transform:rotate(360deg) translateX(120px) rotate(-360deg)}}
        @keyframes orbit2{from{transform:rotate(180deg) translateX(80px) rotate(-180deg)}to{transform:rotate(540deg) translateX(80px) rotate(-540deg)}}
        @keyframes glow-pulse{0%,100%{opacity:0.5;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}
        @keyframes hero-in{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
        @keyframes photo-float{0%,100%{transform:perspective(800px) rotateY(-4deg) rotateX(3deg) translateY(0)}50%{transform:perspective(800px) rotateY(4deg) rotateX(-2deg) translateY(-12px)}}
        .nav-btn:hover{color:#e8b86d !important}
        .skill-chip:hover{background:rgba(232,184,109,0.12) !important; border-color:#e8b86d !important; color:#e8b86d !important; transform:translateY(-3px) scale(1.05);}
        .proj-link:hover{opacity:1 !important; transform:translateY(-2px);}
        a{color:inherit;text-decoration:none}
      `}</style>

      <StarField />

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, height:60, padding:"0 52px", display:"flex", alignItems:"center", justifyContent:"space-between", background: scrolled?"rgba(2,5,16,0.85)":"transparent", backdropFilter: scrolled?"blur(20px)":"none", borderBottom: scrolled?"1px solid rgba(167,139,250,0.1)":"none", transition:"all 0.4s ease" }}>
        <button onClick={()=>scrollTo("About")} style={{ background:"none", border:"none", cursor:"pointer" }}>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:900, background:"linear-gradient(135deg, #e8b86d, #f5d08a)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:"0.06em" }}>SS</span>
        </button>
        <div style={{ display:"flex", gap:32 }}>
          {NAV.map(n => (
            <button key={n} className="nav-btn" onClick={()=>scrollTo(n)} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.14em", color: activeNav===n?"#e8b86d":"#475569", transition:"color 0.2s", borderBottom: activeNav===n?"1px solid #e8b86d":"1px solid transparent", paddingBottom:2 }}>
              {n.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="about" style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:"80px 52px 60px", position:"relative", overflow:"hidden", zIndex:10 }}>

        {/* Orbiting planet dots */}
        <div style={{ position:"absolute", right:"18%", top:"42%", width:0, height:0, zIndex:1, pointerEvents:"none" }}>
          <div style={{ width:10, height:10, borderRadius:"50%", background:"#38bdf8", boxShadow:"0 0 20px #38bdf8", animation:"orbit 8s linear infinite", position:"absolute" }} />
          <div style={{ width:6, height:6, borderRadius:"50%", background:"#f472b6", boxShadow:"0 0 14px #f472b6", animation:"orbit2 5s linear infinite", position:"absolute" }} />
        </div>

        {/* Left text */}
        <div style={{ flex:1, maxWidth:600, zIndex:10, animation:"hero-in 1s ease both" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:"#4ade80", boxShadow:"0 0 12px #4ade80", animation:"glow-pulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.18em", color:"#4ade80", whiteSpace:"nowrap" }}>AVAILABLE FOR INTERNSHIPS · 2026</span>
          </div>

          <div style={{ transform:`translate(${px*0.25}px,${py*0.15}px)`, transition:"transform 0.12s ease" }}>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(54px,8vw,108px)", fontWeight:900, lineHeight:0.92, letterSpacing:"-0.03em", marginBottom:24 }}>
              <span style={{ display:"block", color:"#f0eeff", textShadow:"0 0 60px rgba(167,139,250,0.2)" }}>Suhani</span>
              <span style={{ display:"block", background:"linear-gradient(135deg, #e8b86d 0%, #f5d08a 50%, #c9933a 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", filter:"drop-shadow(0 0 30px rgba(167,139,250,0.4))" }}>Singhania</span>
            </h1>
          </div>

          <p style={{ fontFamily:"'DM Mono',monospace", fontSize:13, color:"#64748b", lineHeight:1.9, maxWidth:460, marginBottom:40 }}>
            Building full-stack products & ML systems — 3rd year CS undergrad at{" "}
            <span style={{ color:"#e8b86d" }}>VIT Vellore</span>, class of 2027.
          </p>

          <div style={{ display:"flex", gap:14, marginBottom:52, flexWrap:"wrap" }}>
            <TiltCard style={{ borderRadius:4 }}>
              <button onClick={()=>scrollTo("Projects")} style={{ padding:"13px 30px", background:"linear-gradient(135deg, #e8b86d, #c9933a)", border:"none", color:"#06070f", cursor:"pointer", fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.14em", fontWeight:600, borderRadius:4, boxShadow:"0 0 30px rgba(232,184,109,0.4)" }}>
                VIEW PROJECTS ↗
              </button>
            </TiltCard>
            <TiltCard style={{ borderRadius:4 }}>
              <a href={data.contact.resume} target="_blank" style={{ display:"block", padding:"13px 30px", background:"transparent", border:"1px solid rgba(232,184,109,0.3)", color:"#e8b86d", fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.14em", borderRadius:4 }}>
                DOWNLOAD CV ↓
              </a>
            </TiltCard>
          </div>

          <div style={{ display:"flex", gap:44 }}>
            {[["2+","Yrs Coding"],["3","Live Projects"],["92%","ML Accuracy"]].map(([n,l]) => (
              <div key={l}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:32, fontWeight:700, background:"linear-gradient(135deg,#e8b86d,#f5d08a)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", lineHeight:1 }}>{n}</div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#334155", marginTop:5, letterSpacing:"0.1em" }}>{l.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: floating 3D photo card */}
        <div style={{ flex:"0 0 230px", marginLeft:52, zIndex:10, animation:"photo-float 6s ease-in-out infinite" }}>
          <div style={{ position:"relative", width:230, borderRadius:24, overflow:"hidden", border:"1px solid rgba(232,184,109,0.25)", boxShadow:"0 0 80px rgba(232,184,109,0.25), 0 0 40px rgba(201,147,58,0.15)" }}>
            {/* Gradient top strip */}
            <div style={{ height:3, background:"linear-gradient(to right, #e8b86d, #f5d08a, #c9933a)", position:"absolute", top:0, left:0, right:0, zIndex:2 }} />
            <img src={PHOTO} alt="Suhani Singhania" style={{ width:"100%", height:260, objectFit:"cover", objectPosition:"center 5%", display:"block" }} />
            {/* Glass overlay */}
            <div style={{ background:"rgba(2,5,16,0.8)", backdropFilter:"blur(16px)", borderTop:"1px solid rgba(232,184,109,0.15)", padding:"18px 20px" }}>
              <p style={{ fontFamily:"'Playfair Display',serif", fontSize:15, fontWeight:700, color:"#f0eeff", marginBottom:4 }}>Suhani Singhania</p>
              <p style={{ fontFamily:"'DM Mono',monospace", fontSize:10, background:"linear-gradient(to right,#e8b86d,#f5d08a)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:"0.08em", marginBottom:12 }}>CS @ VIT · FULL-STACK · ML</p>
              <div style={{ display:"flex", gap:8 }}>
                {[{l:"GitHub",h:data.contact.github},{l:"LinkedIn",h:data.contact.linkedin}].map(({l,h}) => (
                  <a key={l} href={h} target="_blank" style={{ fontFamily:"'DM Mono',monospace", fontSize:10, padding:"4px 12px", border:"1px solid rgba(232,184,109,0.2)", borderRadius:20, color:"#64748b", transition:"all 0.2s" }}
                    onMouseOver={e=>{e.currentTarget.style.borderColor="#e8b86d";e.currentTarget.style.color="#e8b86d";}}
                    onMouseOut={e=>{e.currentTarget.style.borderColor="rgba(232,184,109,0.2)";e.currentTarget.style.color="#64748b";}}>
                    {l}
                  </a>
                ))}
              </div>
            </div>
            {/* Corner accents */}
            <div style={{ position:"absolute", top:3, left:0, width:36, height:36, borderTop:"2px solid #e8b86d", borderLeft:"2px solid #e8b86d", borderRadius:"24px 0 0 0", pointerEvents:"none" }} />
            <div style={{ position:"absolute", bottom:0, right:0, width:36, height:36, borderBottom:"2px solid #c9933a", borderRight:"2px solid #c9933a", borderRadius:"0 0 24px 0", pointerEvents:"none" }} />
          </div>
        </div>

        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:100, background:"linear-gradient(to top, #020510, transparent)", pointerEvents:"none" }} />
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ padding:"110px 52px", position:"relative", zIndex:10 }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <Reveal><SectionLabel text="Experience" /></Reveal>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {data.experience.map((exp,i) => (
              <Reveal key={i} delay={i*120}>
                <TiltCard glow={`${exp.color}25`} style={{ borderRadius:18, background:"rgba(255,255,255,0.03)", backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.06)", padding:"32px 38px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:18, flexWrap:"wrap", gap:8 }}>
                    <div>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{ width:8, height:8, borderRadius:"50%", background:exp.color, boxShadow:`0 0 10px ${exp.color}` }} />
                        <p style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"#f0eeff" }}>{exp.role}</p>
                      </div>
                      <p style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:exp.color, marginTop:4, marginLeft:18 }}>{exp.company}</p>
                    </div>
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#334155", background:"rgba(255,255,255,0.04)", padding:"3px 12px", borderRadius:20 }}>{exp.period}</span>
                  </div>
                  {exp.bullets.map((b,j) => (
                    <div key={j} style={{ display:"flex", gap:12, alignItems:"flex-start", marginLeft:18, marginBottom:8 }}>
                      <span style={{ color:exp.color, fontSize:11, marginTop:4, flexShrink:0 }}>▸</span>
                      <span style={{ fontFamily:"Georgia,serif", fontSize:14, color:"#64748b", lineHeight:1.75 }}>{b}</span>
                    </div>
                  ))}
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding:"110px 52px", position:"relative", zIndex:10 }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <Reveal><SectionLabel text="Projects" /></Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:18 }}>
            {data.projects.map((p,i) => (
              <Reveal key={i} delay={i*100}>
                <TiltCard glow={p.glow} style={{ borderRadius:20, background:"rgba(255,255,255,0.03)", backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.06)", padding:"28px", position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", top:0, right:0, width:100, height:100, background:`radial-gradient(circle at top right, ${p.glow}, transparent 70%)`, pointerEvents:"none" }} />
                  <div style={{ fontSize:30, marginBottom:12 }}>{p.icon}</div>
                  <p style={{ fontFamily:"'Playfair Display',serif", fontSize:17, fontWeight:700, color:"#f0eeff", marginBottom:6 }}>{p.name}</p>
                  <p style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:p.color, letterSpacing:"0.06em", marginBottom:12 }}>{p.stack}</p>
                  <p style={{ fontFamily:"Georgia,serif", fontSize:13, color:"#64748b", lineHeight:1.8, marginBottom:20 }}>{p.desc}</p>
                  <div style={{ display:"flex", gap:8 }}>
                    {p.github && <a href={p.github} target="_blank" className="proj-link" style={{ fontFamily:"'DM Mono',monospace", fontSize:10, padding:"5px 14px", border:`1px solid ${p.color}60`, borderRadius:20, color:p.color, opacity:0.75, transition:"all 0.2s" }}>⌥ GitHub</a>}
                    {p.live && <a href={p.live} target="_blank" className="proj-link" style={{ fontFamily:"'DM Mono',monospace", fontSize:10, padding:"5px 14px", background:p.color, borderRadius:20, color:"#020510", fontWeight:600, opacity:0.85, transition:"all 0.2s" }}>↗ Live</a>}
                  </div>
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:`linear-gradient(to right, transparent, ${p.color}, transparent)`, opacity:0.6 }} />
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEETCODE ── */}
      <section id="leetcode" style={{ padding:"0 52px 110px", position:"relative", zIndex:10 }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <Reveal><SectionLabel text="DSA · Competitive Programming" /></Reveal>
          <Reveal delay={100}><LeetCodeCard username={data.leetcode} /></Reveal>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding:"0 52px 110px", position:"relative", zIndex:10 }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <Reveal><SectionLabel text="Skills" /></Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>
            {data.skills.map((sk,i) => (
              <Reveal key={sk.cat} delay={i*80}>
                <TiltCard glow={`${sk.color}18`} style={{ borderRadius:16, background:"rgba(255,255,255,0.025)", backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.05)", padding:"26px 28px" }}>
                  <p style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.2em", color:sk.color, marginBottom:16, textTransform:"uppercase" }}>{sk.cat}</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                    {sk.items.map((item,j) => (
                      <span key={j} className="skill-chip" style={{ fontFamily:"'DM Mono',monospace", fontSize:12, padding:"5px 14px", borderRadius:20, border:"1px solid rgba(255,255,255,0.07)", color:"#64748b", background:"rgba(255,255,255,0.03)", cursor:"default", transition:"all 0.2s" }}>{item}</span>
                    ))}
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding:"0 52px 100px", position:"relative", zIndex:10 }}>
        <div style={{ maxWidth:640, margin:"0 auto", textAlign:"center" }}>
          <Reveal><SectionLabel text="Contact" /></Reveal>
          <Reveal delay={100}>
            <TiltCard glow="rgba(232,184,109,0.15)" style={{ borderRadius:24, background:"rgba(255,255,255,0.03)", backdropFilter:"blur(30px)", border:"1px solid rgba(232,184,109,0.12)", padding:"60px 48px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(139,92,246,0.06), transparent 70%)", pointerEvents:"none" }} />
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(32px,4.5vw,54px)", fontWeight:900, lineHeight:1.1, marginBottom:14 }}>
                <span style={{ color:"#f0eeff" }}>Let's build</span><br />
                <span style={{ background:"linear-gradient(135deg,#e8b86d,#f5d08a,#c9933a)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>something stellar.</span>
              </h2>
              <p style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:"#334155", marginBottom:36, lineHeight:1.8 }}>Open to internships, collabs & exciting ideas.</p>
              <a href={`mailto:${data.contact.email}`}
                style={{ display:"inline-block", padding:"14px 42px", background:"linear-gradient(135deg,#e8b86d,#c9933a)", color:"#06070f", borderRadius:4, fontFamily:"'DM Mono',monospace", fontSize:12, letterSpacing:"0.15em", fontWeight:600, textDecoration:"none", boxShadow:"0 0 40px rgba(232,184,109,0.3)", transition:"transform 0.2s,box-shadow 0.2s" }}
                onMouseOver={e=>{e.currentTarget.style.transform="scale(1.05)";e.currentTarget.style.boxShadow="0 0 60px rgba(232,184,109,0.5)";}}
                onMouseOut={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 0 40px rgba(232,184,109,0.3)";}}>
                SAY HELLO →
              </a>
              <div style={{ display:"flex", justifyContent:"center", gap:36, marginTop:44 }}>
                {[{l:"GITHUB",h:data.contact.github},{l:"LINKEDIN",h:data.contact.linkedin},{l:"RESUME",h:data.contact.resume}].map(({l,h}) => (
                  <a key={l} href={h} target="_blank" style={{ fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.14em", color:"#1e293b", transition:"color 0.2s, letter-spacing 0.3s" }}
                    onMouseOver={e=>{e.currentTarget.style.color="#e8b86d";e.currentTarget.style.letterSpacing="0.22em";}}
                    onMouseOut={e=>{e.currentTarget.style.color="#1e293b";e.currentTarget.style.letterSpacing="0.14em";}}>{l}</a>
                ))}
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      <footer style={{ padding:"20px 52px", borderTop:"1px solid rgba(255,255,255,0.03)", textAlign:"center", zIndex:10, position:"relative" }}>
        <p style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#0f172a", letterSpacing:"0.1em" }}>© 2026 SUHANI SINGHANIA · CRAFTED AMONG THE STARS ✦</p>
      </footer>
    </div>
  );
}
