import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import AppHeader from "@/components/AppHeader";

const QUESTIONS = [
  {
    question: "How often do you go out of your way to talk to new people at a group event?",
    min: "Rarely",
    max: "Frequently",
    maxValue: 100,
    step: 1,
    defaultValue: 50,
  },
  {
    question: "How many nights a week do you spend out with friends?",
    min: "0",
    max: "7",
    maxValue: 7,
    step: 1,
    defaultValue: 3,
  },
  {
    question: "Do you find yourself talking with people similar or different to yourself?",
    min: "Similar",
    max: "Different",
    maxValue: 100,
    step: 1,
    defaultValue: 50,
  },
  {
    question: "How often do you talk to new people daily — at work, school, or around town?",
    min: "Rarely",
    max: "Frequently",
    maxValue: 100,
    step: 1,
    defaultValue: 50,
  },
];

const PersonalityTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(QUESTIONS.map((q) => q.defaultValue));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const q = QUESTIONS[currentQuestion];
  const isLastQuestion = currentQuestion === QUESTIONS.length - 1;
  const questionProgress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  const handleAnswerChange = (value: number[]) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentQuestion] = value[0];
      return next;
    });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      handleSubmit();
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/personality-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q1: answers[0],
          q2: answers[1],
          q3: answers[2],
          q4: answers[3],
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to save results");
      }
      await res.json();
      setIsComplete(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save results");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <AppHeader />
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">You're all set!</h1>
          <p className="text-muted-foreground mb-8 max-w-xs">
            We're finding your people. Your first group drops in the next cycle.
          </p>
          <Button
            onClick={() => navigate("/chats")}
            className="rounded-full px-8 h-12 text-base font-semibold"
          >
            Find My Group
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />

      {/* Step Progress */}
      <div className="px-6 pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Step 2 of 2</span>
          <span className="text-xs text-primary font-medium">Personality Quiz</span>
        </div>
        <Progress value={100} className="h-1.5" />
      </div>

      {/* Question Progress */}
      <div className="px-6 pt-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-0 px-2 py-0.5">
            Question {currentQuestion + 1} of {QUESTIONS.length}
          </Badge>
          <span className="text-xs text-muted-foreground">{Math.round(questionProgress)}%</span>
        </div>
        <Progress value={questionProgress} className="h-1" />
      </div>

      {/* Question Card */}
      <div className="flex-1 flex flex-col justify-center px-4 py-6">
        <div key={currentQuestion} className="bg-card rounded-2xl p-6 shadow-lg max-w-sm mx-auto w-full animate-fade-in">
          <p className="text-center font-semibold text-base mb-8 leading-relaxed">
            {q.question}
          </p>
          <Slider
            value={[answers[currentQuestion]]}
            onValueChange={handleAnswerChange}
            max={q.maxValue}
            step={q.step}
            className="my-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>{q.min}</span>
            <span className="text-primary font-semibold">{answers[currentQuestion]}</span>
            <span>{q.max}</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="max-w-sm mx-auto w-full mt-6 space-y-3">
          <Button
            onClick={handleNext}
            disabled={isSubmitting}
            className="w-full h-12 text-base font-semibold rounded-xl"
          >
            {isSubmitting ? "Saving..." : isLastQuestion ? "Submit" : "Next Question"}
          </Button>
          {currentQuestion > 0 && (
            <Button
              onClick={handleBack}
              variant="ghost"
              className="w-full h-10 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalityTest;
