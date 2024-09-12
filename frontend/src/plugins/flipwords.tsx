
import { FlipWords } from "../components/ui/flip-words.jsx";

export function FlipWordsDemo() {
  const words = ["bed allotment", "request appointments", "check health reports"];

  return (
    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight ">
      Everything you need in one place: <br />
      <div className="flex flex-col items-start justify-start lg:items-center lg:justify-center mt-4">
        {/* Set a min-height to ensure the container height remains consistent */}
        <div className="relative" style={{ minHeight: '2.5em' }}>
          <FlipWords
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white"
            words={words}
          />
        </div>
      </div>
    </div>
  );
}
