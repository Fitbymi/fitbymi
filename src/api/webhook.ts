// Webhook utility for form submissions
//export const WEBHOOK_URL = 'https://hook.us2.make.com/mcx5rwagqxiivslvcjiu5bh7hnebl2wk';
export const WEBHOOK_URL = 'https://hook.us2.make.com/yshghs9hcctp6rf9441iohitc3g9pzp5';

/**
 * Send contact form data to webhook
 */
export const submitContactForm = async (
  name: string,
  email: string,
  phone: string,
  message: string
): Promise<boolean> => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'contact',
        name,
        email,
        phone,
        message,
      }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Failed to submit contact form:', error);
    return false;
  }
};

/**
 * Request a guide through webhook
 */
export const requestGuide = async (
  email: string,
  name: string,
  guideType: 'abdominal' | 'glutes'
): Promise<boolean> => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'guide',
        guideType,
        name,
        email,
      }),
    });
    
    return response.ok;
  } catch (error) {
    console.error(`Failed to request ${guideType} guide:`, error);
    return false;
  }
};

/**
 * Subscribe to newsletter through webhook
 */
export const subscribeToNewsletter = async (
  email: string,
  name: string = ''
): Promise<boolean> => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'newsletter',
        newsletterType: 'subscribe',
        email,
        name,
      }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Failed to subscribe to newsletter:', error);
    return false;
  }
};

/**
 * Unsubscribe from newsletter through webhook
 */
export const unsubscribeFromNewsletter = async (
  email: string
): Promise<boolean> => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'newsletter',
        newsletterType: 'unsubscribe',
        email,
      }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Failed to unsubscribe from newsletter:', error);
    return false;
  }
};