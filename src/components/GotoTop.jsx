import { FaArrowUp } from "react-icons/fa";

const GotoTop = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  return (
    <div>
         <button className="fixed bottom-10 right-10 bg-custompurple hover:scale-95 text-xl duration-100 text-white font-bold py-2 px-2 rounded-full" onClick={scrollToTop}>
         <FaArrowUp />
                  </button>
    </div>
  )
}

export default GotoTop