'use client';

// Simple client-side email sender using EmailJS REST API
// Configure these env vars in .env.local:
// NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
// NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
// NEXT_PUBLIC_EMAILJS_TEMPLATE_CUSTOMER=...
// NEXT_PUBLIC_EMAILJS_TEMPLATE_BUSINESS=...

type BookingEmailPayload = {
  customerEmail: string;
  customerName: string;
  businessEmail?: string;
  car: string;
  dates: string;
  locations: string;
  services: string;
  total: string;
};

const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

function getEnv(name: string): string | undefined {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (process as any)?.env?.[name] || (globalThis as any)?.process?.env?.[name];
  } catch {
    return undefined;
  }
}

async function sendEmail(templateId: string, toEmail: string, payload: BookingEmailPayload) {
  const serviceId = getEnv('NEXT_PUBLIC_EMAILJS_SERVICE_ID');
  const publicKey = getEnv('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY');
  if (!serviceId || !publicKey || !templateId) {
    console.warn('EmailJS env vars missing. Skipping email send.');
    return { ok: false, skipped: true } as const;
  }
  const body = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: {
      to_email: toEmail,
      to_name: payload.customerName,
      customer_email: payload.customerEmail,
      customer_name: payload.customerName,
      car: payload.car,
      dates: payload.dates,
      locations: payload.locations,
      services: payload.services,
      total: payload.total,
      business_email: payload.businessEmail || 'info@ramservis.az',
    },
  };
  const res = await fetch(EMAILJS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return { ok: res.ok } as const;
}

export async function sendBookingEmails(payload: BookingEmailPayload) {
  const customerTemplate = getEnv('NEXT_PUBLIC_EMAILJS_TEMPLATE_CUSTOMER');
  const businessTemplate = getEnv('NEXT_PUBLIC_EMAILJS_TEMPLATE_BUSINESS');

  const businessEmail = payload.businessEmail || 'info@ramservis.az';

  const [toCustomer, toBusiness] = await Promise.all([
    customerTemplate ? sendEmail(customerTemplate, payload.customerEmail, payload) : Promise.resolve({ ok: false, skipped: true } as const),
    businessTemplate ? sendEmail(businessTemplate, businessEmail, payload) : Promise.resolve({ ok: false, skipped: true } as const),
  ]);

  return { toCustomer, toBusiness };
}


