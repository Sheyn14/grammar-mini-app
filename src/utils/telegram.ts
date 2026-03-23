// Initialize Telegram WebApp
export const initTelegramApp = () => {
  if (typeof window === 'undefined') return null;

  // Access the Telegram WebApp API
  const tg = (window as any).Telegram?.WebApp;

  if (tg) {
    // Initialize the app
    tg.ready();
    // Expand to fullscreen
    tg.expand();
    // Set header color
    tg.setHeaderColor('#0098ea');
  }

  return tg;
};

// Send result data to bot (for future integration)
export const sendResultsToBot = async (studentName: string, score: number, total: number) => {
  const tg = (window as any).Telegram?.WebApp;
  if (!tg) return;

  try {
    // This will be connected to your Telegram bot backend later
    const data = {
      user_id: tg.initDataUnsafe?.user?.id,
      username: tg.initDataUnsafe?.user?.username,
      name: studentName,
      score: score,
      total: total,
      percentage: Math.round((score / total) * 100),
      timestamp: new Date().toISOString(),
    };

    console.log('Quiz completed:', data);
    // Later: send to your bot/backend API
    // await fetch('/api/quiz-results', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
  } catch (error) {
    console.error('Failed to send results:', error);
  }
};

// Get user info from Telegram
export const getTelegramUser = () => {
  if (typeof window === 'undefined') return null;
  const tg = (window as any).Telegram?.WebApp;
  return tg?.initDataUnsafe?.user || null;
};
