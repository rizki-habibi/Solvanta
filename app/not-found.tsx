import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{minHeight:"100vh",display:"grid",placeItems:"center",padding:24,background:"#080b13",color:"#f3f6fc",fontFamily:"system-ui"}}>
      <section style={{maxWidth:460,textAlign:"center"}}>
        <div style={{color:"#8df5ce",fontWeight:700,letterSpacing:3,fontSize:12}}>SOLVANTA / 404</div>
        <h1 style={{fontSize:38,margin:"14px 0"}}>Halaman tidak ditemukan</h1>
        <p style={{color:"#8f9bb0",lineHeight:1.7}}>Halaman yang kamu cari belum tersedia atau alamatnya berubah.</p>
        <Link href="/" style={{display:"inline-block",marginTop:12,padding:"11px 16px",borderRadius:9,background:"#8df5ce",color:"#07130f",fontWeight:700,textDecoration:"none"}}>Kembali ke ringkasan</Link>
      </section>
    </main>
  );
}
