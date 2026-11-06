import { Navbar } from "@/components/features/landing/navbar/Navbar";
import { Footer } from "@/components/marketing/Footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (<><Navbar /><main id="main" className="relative flex-1">{children}</main><Footer /></>);
}
