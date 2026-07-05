import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import type { QuizResult } from '../services/api';
import type { Quiz as QuizType } from '../types';
import { Loader2 } from 'lucide-react';

const Quiz: React.FC = () => {
  const [quizzes, setQuizzes] = useState<QuizType[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const data = await api.getQuizzes();
      setQuizzes(data);
    } catch (err) {
      console.error('Failed to fetch quizzes', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (quizId: number, option: string) => {
    setAnswers(prev => ({ ...prev, [quizId]: option }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(answers).length < quizzes.length) {
      alert('Neural link incomplete. Please provide all data points (answer all questions).');
      return;
    }

    try {
      setLoading(true);
      const quizResult = await api.submitQuiz({ answers });
      setResult(quizResult);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Submission failed', err);
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setResult(null);
    fetchQuizzes();
  };

  const decodeHtml = (html: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  if (loading && !result) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin text-white" size={32} />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-24 px-12 fade-in">
      <Link to="/" className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 hover:text-white transition-colors mb-12 block">
        ← Back to Home
      </Link>
      
      <div className="mb-24 border-b border-white/[0.05] pb-12">
        <h1 className="text-5xl font-black italic tracking-tighter text-white uppercase mb-4">Intelligence Test</h1>
      </div>

      {result ? (
        <div className="space-y-16">
          <div className="p-16 border border-white/[0.05] rounded-3xl text-center space-y-6">
            <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Calibration Result</div>
            <div className="text-9xl font-black text-white italic tracking-tighter">{result.percentage}%</div>
            <p className="text-xs text-slate-500 uppercase tracking-widest leading-loose italic">
              {result.percentage >= 90 ? 'Interstellar Command Readiness Verified.' : 
               result.percentage >= 70 ? 'Competency Threshold Met.' : 
               'Sub-Optimal Performance. Recalibration Required.'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            {result.feedback.map((f, index) => (
              <div key={index} className="p-10 border border-white/[0.05] rounded-3xl flex justify-between items-center group hover:bg-white/[0.02]">
                <p className="text-xl font-bold text-white max-w-2xl leading-snug">{decodeHtml(f.question)}</p>
                <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${f.correct ? 'text-green-500' : 'text-red-500'}`}>
                  {f.correct ? 'Verified' : 'Error'}
                </span>
              </div>
            ))}
          </div>

          <button onClick={resetQuiz} className="btn-festival w-full py-8 text-sm tracking-[0.3em]">Restart Calibration</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-24">
          {quizzes.map((quiz, index) => (
            <div key={quiz.id} className="space-y-10">
              <div className="flex gap-8">
                <span className="text-xs font-black text-gray-700 tabular-nums">0{index + 1}</span>
                <p className="text-3xl font-bold text-white/90 leading-tight">{decodeHtml(quiz.question)}</p>
              </div>
              
              <div className="grid grid-cols-1 gap-3 pl-16">
                {quiz.options.map((option) => (
                  <label 
                    key={option} 
                    className={`px-10 py-6 rounded-2xl border transition-all cursor-pointer text-sm font-bold tracking-widest uppercase flex items-center gap-4
                      ${answers[quiz.id] === option 
                        ? 'bg-white text-black border-white' 
                        : 'bg-white/[0.02] border-white/[0.05] text-gray-500 hover:border-white/30'}`}
                  >
                    <input type="radio" name={`quiz-${quiz.id}`} value={option} checked={answers[quiz.id] === option} onChange={() => handleOptionChange(quiz.id, option)} className="hidden" />
                    <div className={`w-3 h-3 rounded-full border-2 ${answers[quiz.id] === option ? 'border-black bg-black' : 'border-gray-500'}`} />
                    {decodeHtml(option)}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button type="submit" className="btn-festival w-full py-8 text-sm tracking-[0.3em] mt-12">Submit Neural Patterns</button>
        </form>
      )}
    </div>
  );
};

export default Quiz;
