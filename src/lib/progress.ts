import { supabase } from '@/auth/supabase';

export interface TestResult {
  level: string;
  unit: number;
  score: number;
  totalQuestions: number;
  percentage: number;
}

export interface ProgressRecord {
  id: string;
  user_id: string;
  level: string;
  unit: number;
  score: number;
  total_questions: number;
  percentage: number;
  completed_at: string;
  created_at: string;
}

/**
 * Save test result to database
 * Safely returns without crashing if user not authenticated
 */
export async function saveTestResult(result: TestResult) {
  try {
    // Safely check session first
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session?.user) {
      console.warn('Cannot save test result - no authenticated session');
      throw new Error('User not authenticated');
    }

    const user = session.user;

    const { data, error } = await supabase
      .from('test_progress')
      .upsert(
        {
          user_id: user.id,
          level: result.level,
          unit: result.unit,
          score: result.score,
          total_questions: result.totalQuestions,
          percentage: result.percentage,
          completed_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id,level,unit',
        }
      )
      .select()
      .single();

    if (error) {
      console.error('Error saving test result:', error);
      throw error;
    }

    return data;
  } catch (err: any) {
    console.error('Error in saveTestResult:', err.message);
    throw err;
  }
}

/**
 * Get all progress records for current user
 * Safely returns empty array if no session exists
 */
export async function getUserProgress() {
  try {
    // Safely check session first instead of calling getUser() directly
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session?.user) {
      console.log('No session for progress fetch - returning empty array');
      return [];
    }

    const user = session.user;

    const { data, error } = await supabase
      .from('test_progress')
      .select('*')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false });

    if (error) {
      console.error('Error fetching progress:', error);
      return [];
    }

    return data as ProgressRecord[];
  } catch (err: any) {
    console.error('Error in getUserProgress:', err.message);
    return [];
  }
}

/**
 * Check if a specific unit test is completed
 */
export async function isUnitCompleted(level: string, unit: number) {
  const progress = await getUserProgress();
  return progress.some(p => p.level === level && p.unit === unit);
}

/**
 * Get completion status for all units in a level
 */
export async function getLevelCompletion(level: string) {
  const progress = await getUserProgress();
  const levelProgress = progress.filter(p => p.level === level);

  return {
    completed: levelProgress.length,
    records: levelProgress,
  };
}

/**
 * Get user's statistics by level
 */
export async function getStatsByLevel() {
  const progress = await getUserProgress();

  const stats: { [key: string]: { completed: number; averageScore: number } } =
    {};

  const levels = [
    'Beginner',
    'Elementary',
    'Pre-Intermediate',
    'Intermediate',
    'Upper-Intermediate',
  ];

  levels.forEach(level => {
    const levelProgress = progress.filter(p => p.level === level);
    const avgScore =
      levelProgress.length > 0
        ? Math.round(
            levelProgress.reduce((sum, p) => sum + p.percentage, 0) /
              levelProgress.length
          )
        : 0;

    stats[level] = {
      completed: levelProgress.length,
      averageScore: avgScore,
    };
  });

  return stats;
}

/**
 * Get total completion percentage
 */
export async function getTotalProgress() {
  const progress = await getUserProgress();
  const totalUnits = 14 + 12 + 12 + 12 + 12; // 62 total units
  const percentage = Math.round((progress.length / totalUnits) * 100);

  return {
    completed: progress.length,
    total: totalUnits,
    percentage,
  };
}
