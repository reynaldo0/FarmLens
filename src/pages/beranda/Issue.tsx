import { issues } from "../../data/homeData";

export default function IssuesSection() {
    return (
        <section className="relative overflow-hidden bg-linear-to-tr from-green-50 via-emerald-50 to-white pt-20 pb-32 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl mb-4">
                        <span className="bg-linear-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                            Isu Global & Urgensi Ketahanan Pangan
                        </span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Mengapa urban farming dan teknologi AI menjadi solusi krusial untuk masa depan pangan kita
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {issues.map((issue, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100"
                        >
                            <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${issue.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <issue.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-800">
                                {issue.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {issue.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
