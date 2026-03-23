// DEPRECATED - Use /src/data/topics.ts instead for multiple topics
// This file is kept for backward compatibility only

import { getTopicBySlug } from './topics';

// Backward compatibility export
export const presentSimpleQuestions = getTopicBySlug('present-simple')?.questions || [];

