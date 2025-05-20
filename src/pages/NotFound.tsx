
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <NavBar />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
          <p className="text-2xl font-medium mb-6">Halaman tidak ditemukan</p>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Maaf, halaman yang Anda cari tidak ditemukan atau telah dipindahkan.
          </p>
          <Button onClick={() => navigate("/")}>Kembali ke Beranda</Button>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
