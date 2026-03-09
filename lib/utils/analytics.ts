// Analytics Tracking Utilities
// Client-side tracking for page views, interactions, and conversions

type EventType =
  | "page_view"
  | "form_start"
  | "form_step"
  | "form_complete"
  | "phone_click"
  | "button_click"
  | "cta_click";

type AnalyticsEvent = {
  event_type: EventType;
  page_path: string;
  page_title?: string;
  event_data?: Record<string, any>;
};

// Generate or retrieve session ID
function getSessionId(): string {
  const SESSION_KEY = "dd_session_id";
  const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

  let session = sessionStorage.getItem(SESSION_KEY);
  const lastActivity = sessionStorage.getItem("dd_last_activity");

  // Check if session expired
  if (session && lastActivity) {
    const timeSinceLastActivity = Date.now() - parseInt(lastActivity);
    if (timeSinceLastActivity > SESSION_DURATION) {
      session = null; // Session expired
    }
  }

  // Generate new session if needed
  if (!session) {
    session = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem(SESSION_KEY, session);
  }

  // Update last activity
  sessionStorage.setItem("dd_last_activity", Date.now().toString());

  return session;
}

// Detect device type
function getDeviceType(): "mobile" | "tablet" | "desktop" {
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

// Parse user agent for browser and OS
function parseUserAgent(): { browser: string; os: string } {
  const ua = navigator.userAgent;

  let browser = "Unknown";
  let os = "Unknown";

  // Detect browser
  if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Edg")) browser = "Edge";

  // Detect OS
  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iOS") || ua.includes("iPhone") || ua.includes("iPad"))
    os = "iOS";

  return { browser, os };
}

// Get UTM parameters from URL
function getUtmParams(): {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
} {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
  };
}

// Track analytics event
export async function trackEvent(event: AnalyticsEvent): Promise<void> {
  if (typeof window === "undefined") return;

  try {
    const sessionId = getSessionId();
    const { browser, os } = parseUserAgent();
    const deviceType = getDeviceType();
    const utmParams = getUtmParams();

    const payload = {
      session_id: sessionId,
      event_type: event.event_type,
      page_path: event.page_path,
      page_title: event.page_title || document.title,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      device_type: deviceType,
      browser,
      os,
      screen_width: window.innerWidth,
      screen_height: window.innerHeight,
      event_data: event.event_data || null,
      ...utmParams,
    };

    // Send to API endpoint
    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    // Silently fail - don't disrupt user experience
    console.debug("Analytics tracking failed:", error);
  }
}

// Track page view
export function trackPageView(pagePath?: string, pageTitle?: string): void {
  if (typeof window === "undefined") return;

  trackEvent({
    event_type: "page_view",
    page_path: pagePath || window.location.pathname,
    page_title: pageTitle || document.title,
  });
}

// Track phone click
export function trackPhoneClick(phoneNumber: string): void {
  trackEvent({
    event_type: "phone_click",
    page_path: window.location.pathname,
    event_data: { phone_number: phoneNumber },
  });
}

// Track button/CTA click
export function trackButtonClick(
  buttonLabel: string,
  buttonLocation?: string,
): void {
  trackEvent({
    event_type: "button_click",
    page_path: window.location.pathname,
    event_data: {
      button_label: buttonLabel,
      button_location: buttonLocation,
    },
  });
}

// Track form start
export function trackFormStart(formName: string): void {
  trackEvent({
    event_type: "form_start",
    page_path: window.location.pathname,
    event_data: { form_name: formName },
  });
}

// Track form step progression
export function trackFormStep(
  formName: string,
  step: number,
  stepName: string,
): void {
  trackEvent({
    event_type: "form_step",
    page_path: window.location.pathname,
    event_data: {
      form_name: formName,
      step,
      step_name: stepName,
    },
  });
}

// Track form completion
export function trackFormComplete(
  formName: string,
  formData?: Record<string, any>,
): void {
  trackEvent({
    event_type: "form_complete",
    page_path: window.location.pathname,
    event_data: {
      form_name: formName,
      ...formData,
    },
  });
}

// Track CTA click
export function trackCtaClick(ctaText: string, ctaDestination?: string): void {
  trackEvent({
    event_type: "cta_click",
    page_path: window.location.pathname,
    event_data: {
      cta_text: ctaText,
      cta_destination: ctaDestination,
    },
  });
}

// Initialize session tracking
export function initializeAnalytics(): void {
  if (typeof window === "undefined") return;

  // Track initial page view
  trackPageView();

  // Track session
  const sessionId = getSessionId();
  const utmParams = getUtmParams();
  const deviceType = getDeviceType();

  // Update session data
  fetch("/api/analytics/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      session_id: sessionId,
      landing_page: window.location.pathname,
      referrer: document.referrer || null,
      device_type: deviceType,
      ...utmParams,
    }),
  }).catch(() => {
    // Silently fail
  });
}
