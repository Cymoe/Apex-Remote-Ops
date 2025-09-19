// Conversation state management types

export enum ConversationStage {
  GREETING = 'greeting',
  COLLECTING_NAME = 'collecting_name',
  COLLECTING_EMAIL = 'collecting_email',
  QUALIFYING_REVENUE = 'qualifying_revenue',
  QUALIFYING_CAPITAL = 'qualifying_capital',
  QUALIFYING_TIME = 'qualifying_time',
  QUALIFYING_REASON = 'qualifying_reason',
  TRANSFORMATION_QUESTIONS = 'transformation_questions',
  PRICE_DISCUSSION = 'price_discussion',
  CLOSING = 'closing'
}

export interface ProspectData {
  name?: string;
  email?: string;
  revenue?: number;
  revenueRange?: string;
  capital?: number;
  capitalRange?: string;
  timeCommitment?: boolean;
  whyApex?: string;
  businessType?: string;
  transformationGoals?: string;
}

export interface ConversationFlags {
  isReturningVisitor: boolean;
  showsWarriorMentality: boolean;
  hasAskedAboutProgram: boolean;
  hasObjectedToPrice: boolean;
  isBeingEvasive: boolean;
  seemsConfused: boolean;
}

export interface AttemptTracking {
  [key: string]: number; // Track attempts for each field
}

export interface ConversationState {
  conversationId: string;
  stage: ConversationStage;
  collectedData: ProspectData;
  attemptCounts: AttemptTracking;
  flags: ConversationFlags;
  qualificationScore?: number;
  lastUpdateTime: Date;
  messageCount: number;
}

// Function calling schema for OpenAI
export const extractProspectDataFunction = {
  name: 'extract_prospect_data',
  description: 'Extract and validate prospect information from the conversation',
  parameters: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The prospect\'s name (if provided)',
      },
      email: {
        type: 'string',
        description: 'The prospect\'s email address (must contain @)',
      },
      revenue: {
        type: 'number',
        description: 'Monthly revenue in dollars (numeric value only)',
      },
      revenueVague: {
        type: 'string',
        description: 'Vague revenue description if no specific number given',
      },
      capital: {
        type: 'number',
        description: 'Available capital in dollars (numeric value only)',
      },
      capitalVague: {
        type: 'string',
        description: 'Vague capital description if no specific number given',
      },
      timeCommitment: {
        type: 'boolean',
        description: 'Whether they confirmed 40+ hours per week availability',
      },
      isConfused: {
        type: 'boolean',
        description: 'Whether the user seems confused by the question',
      },
      isEvasive: {
        type: 'boolean',
        description: 'Whether the user is being evasive or avoiding the question',
      },
      showsGrit: {
        type: 'boolean',
        description: 'Whether the user shows warrior mentality or overcame adversity',
      },
    },
  },
};

// Validation rules
export const VALIDATION_RULES = {
  name: {
    minLength: 1,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  revenue: {
    min: 0,
    qualifyingMin: 5000,
  },
  capital: {
    min: 0,
    qualifyingMin: 10000,
  },
  maxAttempts: {
    default: 3,
    email: 4,
    revenue: 5,
  },
};

// Response validation
export interface ResponseValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateEmail(email: string): boolean {
  return VALIDATION_RULES.email.pattern.test(email);
}

export function validateName(name: string): boolean {
  return (
    name.length >= VALIDATION_RULES.name.minLength &&
    name.length <= VALIDATION_RULES.name.maxLength &&
    VALIDATION_RULES.name.pattern.test(name)
  );
}