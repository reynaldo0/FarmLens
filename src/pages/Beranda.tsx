import CtaSection from "./beranda/CTA";
import HeroSection from "./beranda/Hero";
import IssuesSection from "./beranda/Issue";
import SdgsSection from "./beranda/Sdgs";
import StepsSection from "./beranda/Steps";
import MarketplaceShowcaseSection from "./Marketplace";

export default function Beranda() {
    return (
        <div>
            <HeroSection />
            <IssuesSection />
            <StepsSection />
            <SdgsSection />
            <MarketplaceShowcaseSection />
            <CtaSection />
        </div>
    );
}
