import { Navbar }       from "@/components/layout/Navbar";
import { Footer }       from "@/components/layout/Footer";
import { PWAInstaller } from "@/components/ui/PWAInstaller";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <PWAInstaller />
    </>
  );
}