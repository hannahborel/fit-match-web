// Web app utility for handling invitation context storage

export interface InvitationContext {
  leagueId: string;
  timestamp: number;
  source: 'deep_link' | 'web_fallback';
}

const INVITATION_STORAGE_KEY = 'fitmatch_invitation';
const INVITATION_EXPIRY_HOURS = 24;

/**
 * Store invitation context in localStorage and cookies
 */
export const storeInvitationContext = (
  leagueId: string, 
  source: 'deep_link' | 'web_fallback' = 'web_fallback'
): void => {
  try {
    const context: InvitationContext = {
      leagueId,
      timestamp: Date.now(),
      source,
    };
    
    // Store in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(INVITATION_STORAGE_KEY, JSON.stringify(context));
    }
    
    // Store in cookies for server-side access
    const cookieValue = encodeURIComponent(JSON.stringify(context));
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + (INVITATION_EXPIRY_HOURS * 60 * 60 * 1000));
    
    document.cookie = `${INVITATION_STORAGE_KEY}=${cookieValue}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
    
    console.log('Stored invitation context:', context);
  } catch (error) {
    console.error('Failed to store invitation context:', error);
  }
};

/**
 * Retrieve stored invitation context
 */
export const getInvitationContext = (): InvitationContext | null => {
  try {
    if (typeof window === 'undefined') {
      return null;
    }
    
    const stored = localStorage.getItem(INVITATION_STORAGE_KEY);
    if (!stored) {
      return null;
    }
    
    const context: InvitationContext = JSON.parse(stored);
    
    // Check if invitation context has expired
    const now = Date.now();
    const expiryMs = INVITATION_EXPIRY_HOURS * 60 * 60 * 1000;
    
    if (now - context.timestamp > expiryMs) {
      // Clear expired context
      clearInvitationContext();
      return null;
    }
    
    return context;
  } catch (error) {
    console.error('Failed to retrieve invitation context:', error);
    return null;
  }
};

/**
 * Clear stored invitation context
 */
export const clearInvitationContext = (): void => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(INVITATION_STORAGE_KEY);
    }
    
    // Clear cookie
    document.cookie = `${INVITATION_STORAGE_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    
    console.log('Cleared invitation context');
  } catch (error) {
    console.error('Failed to clear invitation context:', error);
  }
};

/**
 * Check if there's a pending invitation that should be handled
 */
export const hasPendingInvitation = (): boolean => {
  const context = getInvitationContext();
  return context !== null;
};

/**
 * Get the league ID from pending invitation
 */
export const getPendingLeagueId = (): string | null => {
  const context = getInvitationContext();
  return context?.leagueId || null;
};

/**
 * Handle pending invitation by clearing it and returning the league ID
 */
export const handlePendingInvitation = (): string | null => {
  const context = getInvitationContext();
  if (context) {
    clearInvitationContext();
    return context.leagueId;
  }
  return null;
};
