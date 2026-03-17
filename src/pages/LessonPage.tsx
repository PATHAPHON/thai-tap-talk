import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X, ImageIcon, Check, XCircle } from "lucide-react";

interface Question {
  id: number;
  type: "fill-blank" | "multiple-choice";
  thai: string;
  phonetic: string;
  instruction: string;
  options: string[];
  correctIndex: number;
}

const questions: Question[] = [
  {
    id: 1,
    type: "fill-blank",
    thai: "....... ผมชื่อ ปฐพล สร้อยเสนา",
    phonetic: "....... phom chue Pathaphon Soisena",
    instruction: "Fill in the blank",
    options: ["Hello", "Goodbye"],
    correctIndex: 0,
  },
  {
    id: 2,
    type: "multiple-choice",
    thai: "สวัสดี",
    phonetic: "sa-wat-dee",
    instruction: "What does this mean?",
    options: ["Hello", "Thank you", "Goodbye", "Sorry"],
    correctIndex: 0,
  },
  {
    id: 3,
    type: "fill-blank",
    thai: "ขอบคุณ .......  ",
    phonetic: "khob khun .......",
    instruction: "Fill in the blank",
    options: ["ครับ (khrap)", "ไม่ (mai)"],
    correctIndex: 0,
  },
];

const LessonPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentQ];
  const progress = ((currentQ + (showResult ? 1 : 0)) / questions.length) * 100;

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === question.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="animate-pop-in text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-foreground">Lesson Complete!</h2>
          <p className="text-muted-foreground mt-2">
            You scored {score}/{questions.length}
          </p>
          <div className="mt-6 space-y-3 w-full">
            <div className="card-warm p-3 flex items-center justify-between">
              <span className="text-sm text-foreground">XP Earned</span>
              <span className="font-bold text-secondary">+{score * 10} XP</span>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="mt-8 w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl active:scale-95 transition-transform"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center gap-3 px-4 py-3">
        <button onClick={() => navigate("/")} className="active:scale-90 transition-transform">
          <X className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <ImageIcon className="w-6 h-6 text-primary" />
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col px-6 pt-4">
        <h3 className="text-lg font-bold text-foreground">{question.instruction}</h3>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center animate-pop-in">
            <p className="text-xl font-bold text-primary font-thai leading-relaxed">
              {question.thai}
            </p>
            <p className="text-sm text-muted-foreground mt-2">{question.phonetic}</p>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3 pb-8">
          {question.options.map((option, idx) => {
            let optionStyle = "bg-card border-2 border-border";
            if (showResult && idx === question.correctIndex) {
              optionStyle = "bg-success/10 border-2 border-success";
            } else if (showResult && idx === selected && idx !== question.correctIndex) {
              optionStyle = "bg-destructive/10 border-2 border-destructive";
            } else if (selected === idx) {
              optionStyle = "bg-primary/10 border-2 border-primary";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showResult}
                className={`w-full py-4 px-6 rounded-xl text-base font-semibold text-foreground transition-all active:scale-[0.98] ${optionStyle}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && idx === question.correctIndex && (
                    <Check className="w-5 h-5 text-success" />
                  )}
                  {showResult && idx === selected && idx !== question.correctIndex && (
                    <XCircle className="w-5 h-5 text-destructive" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        {showResult && (
          <button
            onClick={handleNext}
            className="w-full py-4 mb-8 bg-primary text-primary-foreground font-bold rounded-xl active:scale-95 transition-transform animate-slide-up"
          >
            {currentQ < questions.length - 1 ? "Next" : "Finish"}
          </button>
        )}
      </div>
    </div>
  );
};

export default LessonPage;
