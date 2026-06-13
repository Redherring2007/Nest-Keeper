import { Header } from '@/components/Header';
import { MaidApp } from '@/components/MaidApp';

export default function HomePage() {
  return (
    <>
      <Header />
      <MaidApp />
      <footer className="footer">NestKeeper · Thank you for everything you do</footer>
    </>
  );
}
