import { Header } from '@/components/Header';

export default function Page() {
  return (
    <>
      <Header />
      <main className="hero">
        <div className="container">
          <div className="hero-card">
            <div className="kicker">NestKeeper</div>
            <h1>A simple daily home checklist for your household helper.</h1>
            <p>Scan a permanent QR code, complete today&apos;s tasks, and view friendly household guidance.</p>
            <div className="nav">
              <a className="btn" href="/home/karl-rosie">Open Helper View</a>
              <a className="btn secondary" href="/admin">Open Admin</a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
