import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Toaster }       from "sonner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider>
        <div className="h-screen overflow-hidden">
          {children}
        </div>
      </ThemeProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{ style: { fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: "14px" } }}
      />
    </>
  );
}