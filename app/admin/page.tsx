import { Header } from '@/components/Header';
import { AdminApp } from '@/components/AdminApp';

export default function AdminPage() {
  return (
    <>
      <Header />
      <AdminApp />
      <footer className="footer">MVP admin · Database and login come next</footer>
    </>
  );
}
