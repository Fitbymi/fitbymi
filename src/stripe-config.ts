export interface Product {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
}

// Ensure Stripe is initialized with the live API key
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing Stripe public key');
}

export const products: Product[] = [
  {
    id: 'prod_SG1UWIK3PV3QxM',
    priceId: 'price_1RLVRsCL7GDM85rzmXQjnwn4',
    name: '1:1 posing',
    description: '1:1 in person or virtual sessions, competition prep guidance, posing techniques analysis, presentation feedback, stage presence training.',
    mode: 'payment',
  },
  {
    id: 'prod_SG1Sk7PleXRgvG',
    priceId: 'price_1RLVQ2CL7GDM85rzZ8Kugc6v',
    name: 'Six-pack abdominal program',
    description: 'Core focuses routines, fat loss strategies, abdominal circuit training, meal planning for definition, progress tracking tools, adaptable to all fitness levels.',
    mode: 'payment',
  },
  {
    id: 'prod_SG1QPx5FPi86Rj',
    priceId: 'price_1RLVNgCL7GDM85rzWgGMJCK7',
    name: 'Booty-building program',
    description: 'Specialized glute training, progressive overload plan, form correction tutorials, equipment options for home/gym, complementary nutrition tips, weekly program adjustments, app access to track progress.',
    mode: 'payment',
  },
  {
    id: 'prod_SG1N3NdD4esDMH',
    priceId: 'price_1RLVL4CL7GDM85rzBv108TTx',
    name: 'Combo Package: Workout + Nutrition',
    description: 'Complete workout plan, full nutrition guidance, weekly check-ins, direct coach messaging, body composition analysis, priority support.',
    mode: 'subscription',
  },
  {
    id: 'prod_SG1LOOOFt4jZec',
    priceId: 'price_1RLVJCCL7GDM85rztQjBApQW',
    name: 'Nutrition only',
    description: 'Customized meal plan, macro calculation, nutrition education, grocery shopping guide, recipe database access, supplementation recommendation.',
    mode: 'subscription',
  },
  {
    id: 'prod_SG1JjNgIywzd5S',
    priceId: 'price_1RLVGXCL7GDM85rz8IfXyVdZ',
    name: 'Workout only',
    description: 'Personalized workout plan, weekly program check-in, video exercise tutorials, progress tracking tools, access to workout library.',
    mode: 'subscription',
  },
];