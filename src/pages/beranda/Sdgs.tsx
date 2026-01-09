import { Target, Sprout } from 'lucide-react';

export default function SdgsSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
            <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-12 shadow-2xl relative overflow-hidden">

                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">

                    {/* Text */}
                    <div className="text-white space-y-6">
                        <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
                            SDGs Target 2.3
                        </span>

                        <h2 className="text-3xl md:text-4xl">
                            Mendukung Ketahanan Pangan Berkelanjutan
                        </h2>

                        <p className="text-green-50 text-lg leading-relaxed">
                            FarmLens berkomitmen meningkatkan produktivitas pertanian dan
                            pendapatan petani skala kecil melalui teknologi AI dan edukasi
                            pertanian modern.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Target className="w-6 h-6 text-green-200 flex-shrink-0" />
                                <div>
                                    <div className="font-semibold">Target 2.3</div>
                                    <div className="text-sm text-green-50">
                                        Meningkatkan produktivitas dan pendapatan petani kecil
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Sprout className="w-6 h-6 text-green-200 flex-shrink-0" />
                                <div>
                                    <div className="font-semibold">Urban Farming</div>
                                    <div className="text-sm text-green-50">
                                        Mendukung pertanian perkotaan yang berkelanjutan
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449"
                            alt="Sustainable Farming"
                            className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
