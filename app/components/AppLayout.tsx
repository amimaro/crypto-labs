import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="bg-slate-200 h-full">
      <div className="container mx-auto h-full flex flex-col gap-6 pt-4 px-4">
        <AppHeader />
        <main>{children}</main>
        <AppFooter />
      </div>
    </div>
  );
}
