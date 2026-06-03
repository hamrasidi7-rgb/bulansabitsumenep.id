import AdminSidebar from "./AdminSidebar";

export default function AdminShell({
  children,
  nama,
}: {
  children: React.ReactNode;
  nama?: string;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar nama={nama} />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
