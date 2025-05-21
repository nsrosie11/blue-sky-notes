
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { NotepadText } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <NavBar />
      <main className="flex-1 flex flex-col">
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <NotepadText className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Catat Pikiranmu Setiap Hari
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Daily Notes adalah aplikasi catatan harian sederhana yang membantu kamu mengorganisir pikiran, ide, dan kegiatan sehari-hari.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="text-base">
                <Link to="/login">Masuk</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">
              Fitur Utama
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-secondary/50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Catatan Pribadi</h3>
                <p className="text-gray-600">
                  Buat dan kelola catatan pribadi kamu dengan mudah. Semua disimpan dengan aman di cloud.
                </p>
              </div>
              <div className="bg-secondary/50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Pencarian Cepat</h3>
                <p className="text-gray-600">
                  Temukan catatan dengan cepat menggunakan fitur pencarian realtime yang responsif.
                </p>
              </div>
              <div className="bg-secondary/50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Desain Minimalis</h3>
                <p className="text-gray-600">
                  Interface bersih dan minimalis yang memudahkan kamu fokus pada apa yang penting.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Daily Notes. Dibuat dengan ❤️
        </div>
      </footer>
    </div>
  );
};

export default Index;
