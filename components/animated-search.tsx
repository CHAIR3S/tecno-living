'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export function AnimatedSearch() {
  const router = useRouter();
  const [displayText, setDisplayText] = useState('');
  const [isFirstPhrase, setIsFirstPhrase] = useState(true);

  useEffect(() => {
    const phrases = ['Campus 2', 'Tu hogar ideal'];
    const texts = isFirstPhrase ? 'Campus 2' : 'Tu hogar ideal';
    let charIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      if (charIndex < texts.length) {
        setDisplayText(texts.slice(0, charIndex + 1));
        charIndex++;
        timeoutId = setTimeout(type, 80);
      } else {
        timeoutId = setTimeout(() => {
          setIsFirstPhrase(false);
          charIndex = 0;
          setDisplayText('');
        }, 2000);
      }
    };

    // Start typing after a delay
    timeoutId = setTimeout(type, 500);

    return () => clearTimeout(timeoutId);
  }, [isFirstPhrase]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/habitaciones');
  };

  return (
    <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-24">
      <div className="flex gap-3 bg-card rounded-full shadow-lg p-1.5 border border-border">
        <div className="flex-1 flex items-center gap-3 px-6">
          <Search className="text-muted-foreground" size={20} />
          <input
            type="text"
            value={displayText}
            readOnly
            placeholder="Ubicación, precio..."
            className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground py-3 text-lg cursor-default"
            style={{
              caretColor: 'transparent',
            }}
          />
          <span className="text-foreground opacity-70 animate-pulse">|</span>
        </div>
        <Button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-apple-blue-dark rounded-full px-8 h-12 font-semibold"
        >
          Buscar
        </Button>
      </div>
    </form>
  );
}
