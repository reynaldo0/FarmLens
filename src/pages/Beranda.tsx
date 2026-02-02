import HeroSection from "./beranda/Hero";
import IssuesSection from "./beranda/Issue";
import MarketplaceShowcaseSection from "./beranda/Marketplace";
import MarketplaceTipsSection from "./beranda/MarketplaceTips";
import SdgsSection from "./beranda/Sdgs";
import StepsSection from "./beranda/Steps";

export default function Beranda() {
    return (
        <div>
            <HeroSection />
            <IssuesSection />
            <StepsSection />
            <SdgsSection />
            <MarketplaceShowcaseSection />
            <MarketplaceTipsSection />
        </div>
    );
}
