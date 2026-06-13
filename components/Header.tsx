import Link from 'next/link';

export function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="brand">
          <div className="logo">NK</div>
          <div>
            <div>NestKeeper</div>
            <div className="small">Meaningful help. Made simple.</div>
          </div>
        </div>
        <nav className="nav">
          <Link className="pill" href="/home/karl-rosie">Helper View</Link>
          <Link className="pill" href="/admin">Admin</Link>
        </nav>
      </div>
    </header>
  );
}
