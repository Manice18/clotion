import Footer from "./_components/footer";
import Heading from "./_components/heading";
import Heros from "./_components/heros";

const MarketingPage = () => {
  return (
    <div className="flex min-h-full flex-col dark:bg-[#1F1F1F]">
      <div className="flex flex-1 flex-col items-center justify-center gap-y-8 px-6 text-center md:justify-start">
        <Heading />
        <Heros />
      </div>
      <Footer />
    </div>
  );
};

export default MarketingPage;
