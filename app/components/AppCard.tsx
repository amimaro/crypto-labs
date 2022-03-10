type AppCardProps = {
  children: React.ReactNode;
};

export default function AppCard({ children }: AppCardProps) {
  return (
    <div className="border-2 border-slate-300 rounded-md px-4 py-2 w-full">
      {children}
    </div>
  );
}
