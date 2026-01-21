import { steps } from "../../data/homeData";


export default function StepsSection() {
    return (
        <section className="bg-linear-to-br from-green-50 to-emerald-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl mb-4">
                        <span className="bg-linear-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                            Cara Kerja FarmLens
                        </span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Proses sederhana dalam 3 langkah untuk membantu tanaman Anda tetap sehat
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-linear-to-r from-green-300 via-emerald-400 to-green-300"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-center group hover:-translate-y-2">
                                {/* Step Number */}
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-green-600 to-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg">
                                    {step.step}
                                </div>

                                <div className="mt-6 mb-6 flex justify-center">
                                    <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-green-100 to-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <step.icon className="w-10 h-10 text-green-600" />
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
