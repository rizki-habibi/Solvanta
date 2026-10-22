"use client";

import { useMemo, useState } from "react";
import {
  Activity, ArrowDownLeft, ArrowUpRight, Bell, BookOpen, Check, ChevronDown,
  CircleHelp, Clock3, Coins, Command, FileCheck2, FileClock, Fingerprint,
  Gauge, KeyRound, LayoutDashboard, LockKeyhole, Menu, MoreHorizontal,
  Plus, Search, Settings2, Shield, ShieldCheck, SlidersHorizontal, Users,
  Wallet, WalletCards, Zap
} from "lucide-react";

type Role = "Super Admin" | "Treasury Owner" | "Approver" | "Operator" | "Auditor" | "Viewer";
const roles: Role[] = ["Super Admin", "Treasury Owner", "Approver", "Operator", "Auditor", "Viewer"];
const roleInfo: Record<Role, { description: string; permissions: string[]; blocked: string[] }> = {
  "Super Admin": { description: "Kelola anggota, role, dan konfigurasi workspace.", permissions: ["Kelola anggota", "Atur role", "Konfigurasi", "Lihat audit log"], blocked: [] },
  "Treasury Owner": { description: "Kelola treasury dan ajukan transaksi untuk persetujuan.", permissions: ["Lihat saldo", "Buat proposal", "Atur batas", "Lihat laporan"], blocked: ["Atur role"] },
  "Approver": { description: "Tinjau proposal dan setujui sesuai kebijakan.", permissions: ["Lihat saldo", "Tinjau proposal", "Setujui transaksi", "Lihat audit log"], blocked: ["Atur role", "Ubah kebijakan"] },
  "Operator": { description: "Siapkan escrow dan proposal transaksi.", permissions: ["Buat escrow", "Buat proposal", "Lihat status"], blocked: ["Setujui transaksi", "Atur role"] },
  "Auditor": { description: "Akses baca untuk pemeriksaan dan jejak aktivitas.", permissions: ["Lihat transaksi", "Lihat audit log", "Ekspor laporan"], blocked: ["Buat transaksi", "Setujui transaksi", "Atur role"] },
  "Viewer": { description: "Akses baca terbatas ke informasi workspace.", permissions: ["Lihat ringkasan", "Lihat status"], blocked: ["Buat transaksi", "Setujui transaksi", "Atur role"] }
};
const navGroups = [
  { label: "WORKSPACE", items: [{ name: "Ringkasan", icon: LayoutDashboard }, { name: "Escrow", icon: WalletCards, count: "08" }, { name: "Treasury", icon: Coins }, { name: "Transaksi", icon: ArrowUpRight }, { name: "Persetujuan", icon: FileCheck2, count: "03" }] },
  { label: "KEAMANAN", items: [{ name: "Anggota & Role", icon: Users }, { name: "Permission", icon: LockKeyhole }, { name: "Audit Log", icon: Activity }] },
  { label: "PREFERENSI", items: [{ name: "Pengaturan", icon: Settings2 }, { name: "Dokumentasi", icon: BookOpen }] }
];
const escrows = [
  { name: "Design Sprint #24", id: "ESC-0028", party: "Studio North", amount: "2.40 SOL", status: "Menunggu", cls: "pending", date: "22 Okt 2026" },
  { name: "Smart Contract Review", id: "ESC-0027", party: "Audit Labs", amount: "8.00 SOL", status: "Disetujui", cls: "approved", date: "21 Okt 2026" },
  { name: "Frontend Milestone", id: "ESC-0026", party: "Pixel Foundry", amount: "1.75 SOL", status: "Ditinjau", cls: "review", date: "20 Okt 2026" },
  { name: "Protocol Research", id: "ESC-0025", party: "Research Guild", amount: "4.20 SOL", status: "Disetujui", cls: "approved", date: "19 Okt 2026" }
];
const activities = [
  { icon: Check, color: "green", title: "Proposal ditandatangani", detail: "Smart Contract Review", time: "12 menit lalu" },
  { icon: Users, color: "blue", title: "Role diperbarui", detail: "Auditor · akses baca", time: "48 menit lalu" },
  { icon: ArrowDownLeft, color: "amber", title: "Escrow dibuat", detail: "Design Sprint #24", time: "2 jam lalu" },
  { icon: ShieldCheck, color: "green", title: "Pemeriksaan kebijakan", detail: "Tidak ada konflik role demo", time: "Kemarin" }
];

export default function Home() {
  const [role, setRole] = useState<Role>("Super Admin");
  const [activeNav, setActiveNav] = useState("Ringkasan");
  const [showNotice, setShowNotice] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [escrowName, setEscrowName] = useState("");
  const [amount, setAmount] = useState("");
  const [created, setCreated] = useState<string[]>([]);
  const [mobileNav, setMobileNav] = useState(false);
  const access = roleInfo[role];
  const canCreate = useMemo(() => ["Super Admin", "Treasury Owner", "Operator"].includes(role), [role]);

  function createDemoEscrow() {
    if (!escrowName.trim() || !amount.trim()) return;
    setCreated((old) => [escrowName.trim() + " · " + amount.trim() + " SOL", ...old]);
    setEscrowName(""); setAmount(""); setShowCreate(false); setShowNotice(true);
  }

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark">S</div><div><div className="brand-name">solvanta</div><div className="brand-sub">Treasury protocol</div></div></div>
        <div className="nav-label">Menu utama</div>
        {navGroups.map((group) => <div key={group.label}><div className="nav-label">{group.label}</div>{group.items.map(({name, icon: Icon, count}) => <button key={name} className={`nav-item ${activeNav === name ? "active" : ""}`} onClick={() => { setActiveNav(name); setMobileNav(false); }}><Icon size={16}/><span>{name}</span>{count && <span className="nav-count">{count}</span>}</button>)}</div>)}
        <div className="side-bottom">
          <div className="network-card"><div className="network-status"><span className="network-dot"/><span>Solana Devnet</span><ChevronDown size={13} style={{marginLeft:"auto"}}/></div><div className="network-note">Mode pengembangan · data demo</div></div>
          <div className="profile"><div className="avatar">RH</div><div><div className="profile-name">Workspace Owner</div><div className="profile-role">{role}</div></div><MoreHorizontal size={17} style={{marginLeft:"auto",color:"#718097"}}/></div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="breadcrumb"><button className="mobile-menu secondary-btn" onClick={() => setMobileNav(!mobileNav)}><Menu size={15}/></button> Workspace <span style={{margin:"0 9px",color:"#4f5c70"}}>/</span> <strong>{activeNav}</strong></div>
          <div className="top-actions"><div className="pill"><span className="network-dot"/> DEVNET</div><button className="secondary-btn" onClick={() => {setShowNotice(true);}} aria-label="Notifikasi"><Bell size={15}/></button><button className="wallet-btn" onClick={() => setShowNotice(true)}><Wallet size={15}/> Hubungkan wallet</button></div>
        </header>
        {mobileNav && <div className="panel" style={{marginTop:12}}>{navGroups.flatMap(g=>g.items).map(({name,icon:Icon})=><button key={name} className="nav-item" onClick={()=>{setActiveNav(name);setMobileNav(false)}}><Icon size={15}/>{name}</button>)}</div>}
        <div className="page-head"><div><div className="eyebrow">Treasury, with clarity</div><h1>{activeNav === "Ringkasan" ? "Ringkasan workspace" : activeNav}</h1><p className="subtitle">Pantau escrow, kelola otorisasi, dan pastikan setiap tindakan punya jejak yang jelas.</p></div><button className="primary-btn" onClick={() => canCreate ? setShowCreate(true) : setShowNotice(true)}><Plus size={15}/> Buat escrow</button></div>

        <div className="role-banner"><div className="role-icon"><Fingerprint size={17}/></div><div className="role-copy"><strong>Simulasi akses berbasis role</strong><span>{access.description}</span></div><label htmlFor="role" style={{fontSize:10,color:"#7f8da4"}}>Lihat sebagai</label><select id="role" className="role-select" value={role} onChange={(e) => setRole(e.target.value as Role)}>{roles.map(r=><option key={r}>{r}</option>)}</select></div>

        <section className="stats">
          <div className="stat-card"><div className="stat-top">Total treasury <span className="stat-icon"><Coins size={15}/></span></div><div className="stat-value">128.45 SOL</div><div className="stat-foot"><span className="positive">↗ 8.2%</span> <span style={{color:"#718097"}}>vs. periode lalu</span></div></div>
          <div className="stat-card"><div className="stat-top">Escrow aktif <span className="stat-icon"><WalletCards size={15}/></span></div><div className="stat-value">08</div><div className="stat-foot">4 perlu perhatian</div></div>
          <div className="stat-card"><div className="stat-top">Menunggu approval <span className="stat-icon"><Clock3 size={15}/></span></div><div className="stat-value">03</div><div className="stat-foot">Rata-rata review 24 menit</div></div>
          <div className="stat-card"><div className="stat-top">Kontrol akses <span className="stat-icon"><ShieldCheck size={15}/></span></div><div className="stat-value">06 <span style={{fontSize:12,color:"#8290a5"}}>roles</span></div><div className="stat-foot">Permission eksplisit per role</div></div>
        </section>

        <section className="content-grid">
          <div className="panel"><div className="panel-head"><div><h2 className="panel-title">Escrow terbaru</h2><p className="panel-subtitle">Status milestone dan dana yang sedang dikelola</p></div><button className="text-link" onClick={()=>setActiveNav("Escrow")}>Lihat semua ↗</button></div>
            <div className="table-wrap"><table><thead><tr><th>Escrow</th><th>Nilai</th><th>Status</th><th>Tanggal</th></tr></thead><tbody>{created.map((item,i)=><tr key={item+i}><td><div className="asset-name"><span className="token-icon"><WalletCards size={14}/></span><div>{item.split(" · ")[0]}<div className="muted" style={{fontSize:9,marginTop:4}}>ESC-DEMO-{created.length-i}</div></div></div></td><td>{item.split(" · ")[1]} SOL</td><td><span className="status pending"><span className="status-dot"/>Demo dibuat</span></td><td className="muted">Baru saja</td></tr>)}{escrows.map(e=><tr key={e.id}><td><div className="asset-name"><span className="token-icon"><WalletCards size={14}/></span><div>{e.name}<div className="muted" style={{fontSize:9,marginTop:4}}>{e.id} · {e.party}</div></div></div></td><td>{e.amount}</td><td><span className={`status ${e.cls}`}><span className="status-dot"/>{e.status}</span></td><td className="muted">{e.date}</td></tr>)}</tbody></table></div>
          </div>
          <div className="panel"><div className="panel-head"><div><h2 className="panel-title">Aktivitas terbaru</h2><p className="panel-subtitle">Jejak aktivitas workspace</p></div><button className="text-link" onClick={()=>setActiveNav("Audit Log")}>Audit log ↗</button></div><div className="activity-list">{activities.map((a,i)=>{const Icon=a.icon;return <div className="activity" key={i}><div className={`activity-icon ${a.color}`}><Icon size={14}/></div><div><div className="activity-text"><strong>{a.title}</strong><br/>{a.detail}</div><div className="activity-time">{a.time}</div></div></div>})}</div></div>
        </section>

        <section className="panel"><div className="panel-head"><div><h2 className="panel-title">Role & permission</h2><p className="panel-subtitle">Ringkasan hak akses berdasarkan role yang dipilih</p></div><button className="secondary-btn" onClick={()=>setActiveNav("Permission")}><SlidersHorizontal size={14}/> Matriks lengkap</button></div>
          <div className="permission-grid">{roles.slice(0,3).map((r)=>{const ri=roleInfo[r];return <div className="permission-card" key={r}><div className="permission-card-head"><div className="permission-avatar"><Shield size={15}/></div><div><div className="permission-name">{r}</div><div className="permission-level">{ri.permissions.length} izin contoh</div></div></div><div className="permission-items">{ri.permissions.slice(0,3).map(p=><span className="permission-tag allowed" key={p}>{p}</span>)}{ri.blocked.slice(0,2).map(p=><span className="permission-tag denied" key={p}>− {p}</span>)}</div></div>})}</div>
          <div className="callout"><CircleHelp size={15} style={{flex:"none",marginTop:1}}/><span><strong>Catatan keamanan:</strong> role selector ini hanya demonstrasi antarmuka. Otorisasi produksi wajib diverifikasi server-side dan di program Solana melalui signer, account constraints, dan kebijakan multisig; jangan mengandalkan pemeriksaan UI.</span></div>
        </section>

        <footer className="footer"><span>© 2026 Solvanta Protocol · Prototype v0.1</span><span style={{display:"flex",gap:15,alignItems:"center"}}><span><span className="network-dot" style={{display:"inline-block",marginRight:6}}/> Semua sistem demo</span><span>Dokumentasi</span></span></footer>
      </main>

      {showCreate && <div role="dialog" aria-modal="true" aria-labelledby="modal-title" style={{position:"fixed",inset:0,zIndex:10,background:"#02040bcc",display:"grid",placeItems:"center",padding:18}}><div className="panel" style={{width:"100%",maxWidth:430,boxShadow:"0 25px 100px #0009"}}><div className="panel-head"><div><div className="eyebrow">Demo interaction</div><h2 id="modal-title" className="panel-title" style={{fontSize:20,marginTop:8}}>Buat escrow baru</h2><p className="panel-subtitle">Masukkan detail untuk melihat alur UI.</p></div><button className="secondary-btn" onClick={()=>setShowCreate(false)}>Tutup</button></div><form onSubmit={(e)=>{e.preventDefault();createDemoEscrow()}} style={{display:"grid",gap:14}}><label style={{fontSize:11,color:"#9ba9bd"}}>Nama proyek<input required value={escrowName} onChange={e=>setEscrowName(e.target.value)} placeholder="Contoh: Audit smart contract" style={{display:"block",marginTop:7,width:"100%",padding:12,borderRadius:8,border:"1px solid #2b3548",background:"#0a0f19",color:"white",outline:"none"}}/></label><label style={{fontSize:11,color:"#9ba9bd"}}>Jumlah (SOL)<input required type="number" min="0.001" step="0.001" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="2.50" style={{display:"block",marginTop:7,width:"100%",padding:12,borderRadius:8,border:"1px solid #2b3548",background:"#0a0f19",color:"white",outline:"none"}}/></label><button className="primary-btn" type="submit"><Plus size={15}/> Tambahkan ke demo</button><p style={{fontSize:10,color:"#f7c875",margin:0}}>Tidak ada transaksi blockchain yang dikirim.</p></form></div></div>}
      {showNotice && <div role="status" style={{position:"fixed",right:20,bottom:20,zIndex:20,maxWidth:340,padding:"15px 17px",background:"#151e2b",border:"1px solid #8df5ce44",borderRadius:12,boxShadow:"0 15px 50px #0008"}}><div style={{display:"flex",gap:10,alignItems:"flex-start"}}><div className="stat-icon"><Zap size={15}/></div><div><strong style={{fontSize:12}}>Mode prototype</strong><p style={{fontSize:11,color:"#9aa9bd",lineHeight:1.5,margin:"6px 0 10px"}}>Aksi ini belum terhubung ke wallet atau blockchain. Integrasi autentikasi dan program on-chain akan ditambahkan pada tahap berikutnya.</p><button className="text-link" onClick={()=>setShowNotice(false)}>Mengerti</button></div></div></div>}
    </div>
  );
}