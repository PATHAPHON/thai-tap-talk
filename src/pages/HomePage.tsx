import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Star, Check } from "lucide-react";
import ProgressHeader from "@/components/ProgressHeader";

interface LessonNode {
  id: number;
  title: string;
  thaiTitle: string;
  status: "completed" | "active" | "locked";
  offsetX: number;
}

const lessons: LessonNode[] = [
  { id: 1, title: "Food", thaiTitle: "ทักทาย", status: "completed", offsetX: 0 },
  { id: 2, title: "Numbers", thaiTitle: "ตัวเลข", status: "completed", offsetX: -30 },
  { id: 3, title: "Greetings", thaiTitle: "อาหาร", status: "active", offsetX: -50 },
  { id: 4, title: "Family", thaiTitle: "ครอบครัว", status: "locked", offsetX: -20 },
  { id: 5, title: "Colors", thaiTitle: "สี", status: "locked", offsetX: 20 },
  { id: 6, title: "Animals", thaiTitle: "สัตว์", status: "locked", offsetX: 50 },
  { id: 7, title: "Travel", thaiTitle: "ท่องเที่ยว", status: "locked", offsetX: 30 },
];

const HomePage = () => {
  const navigate = useNavigate();

  const handleNodeClick = (lesson: LessonNode) => {
    if (lesson.status !== "locked") {
      navigate(`/lesson/${lesson.id}`);
    }
  };

  return (
    <div className="min-h-screen pb-24">
      <ProgressHeader />

      {/* Unit Banner */}
      <div className="mx-4 mt-4 bg-primary rounded-2xl p-4 animate-pop-in">
        <h2 className="text-primary-foreground font-bold text-lg">Unit 1: Basics</h2>
        <p className="text-primary-foreground/80 text-sm mt-1">
          Learn Thai greetings and introductions
        </p>
      </div>

      {/* Lesson Path */}
      <div className="flex flex-col items-center gap-6 py-8 px-4">
        {lessons.map((lesson, i) => (
          <div
            key={lesson.id}
            className="flex flex-col items-center animate-slide-up"
            style={{
              transform: `translateX(${lesson.offsetX}px)`,
              animationDelay: `${i * 0.05}s`,
            }}
          >
            <button
              onClick={() => handleNodeClick(lesson)}
              disabled={lesson.status === "locked"}
              className={`lesson-node relative ${
                lesson.status === "completed"
                  ? "lesson-node-completed"
                  : lesson.status === "active"
                  ? "lesson-node-active ring-4 ring-primary/30 animate-bounce-soft"
                  : "lesson-node-locked"
              }`}
            >
              {lesson.status === "completed" ? (
                <Check className="w-7 h-7 text-primary-foreground" />
              ) : lesson.status === "active" ? (
                <Star className="w-7 h-7 text-primary-foreground" />
              ) : (
                <Lock className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
            <span
              className={`mt-2 text-xs font-semibold ${
                lesson.status === "locked" ? "text-muted-foreground" : "text-foreground"
              }`}
            >
              {lesson.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
