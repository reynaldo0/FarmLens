import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroModel from '../../components/models/Logo';
import { Suspense } from 'react';
import HeroModelLoader from '../../components/models/LogoLoader';

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-linear-to-br from-green-50 via-emerald-50 to-white pt-28 md:pt-32 pb-32">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-block">
                            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                                🌱 Mendukung SDGs 2: Zero Hunger
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
                            <span className="bg-linear-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                                FarmLens
                            </span>
                            <br />
                            Deteksi Dini Penyakit Tanaman untuk{' '}
                            <span className="relative">
                                <span className="relative z-10">Ketahanan Pangan</span>
                                <span className="absolute bottom-2 left-0 w-full h-3 bg-green-200 -rotate-1"></span>
                            </span>{' '}
                            Berkelanjutan
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            Platform berbasis AI yang membantu petani pemula dan pelaku urban farming mendeteksi penyakit tanaman secara dini,
                            meningkatkan produktivitas, dan mendukung ketahanan pangan mandiri.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/belajar"
                                className="group bg-linear-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
                            >
                                Mulai Belajar Bertani
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/kamus"
                                className="bg-white text-green-700 px-8 py-4 rounded-xl border-2 border-green-200 hover:border-green-300 hover:bg-green-50 transition-all"
                            >
                                Cek Tanamanmu
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-700">5+</div>
                                <div className="text-sm text-gray-600">Jenis Tanaman</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-700">AI</div>
                                <div className="text-sm text-gray-600">Teknologi</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-700">24/7</div>
                                <div className="text-sm text-gray-600">Akses Belajar</div>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:relative h-125">
                        <div className="absolute -inset-4 bg-linear-to-r from-green-400 to-emerald-400 rounded-3xl blur-2xl opacity-20"></div>

                        <div className="relative w-full h-full rounded-3xl overflow-hidden">
                            <Suspense fallback={<HeroModelLoader />}>
                                <HeroModel />
                            </Suspense>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
