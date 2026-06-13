export type Task = {
  id: string;
  title: string;
  category: 'House' | 'Kitchen & Food' | 'Bathrooms' | 'Laundry' | 'Plants' | 'Communication' | 'Friday Only';
  frequency: 'daily' | 'friday';
  guidance: string;
};

export type Guide = { category: string; items: string[] };

export const family = {
  name: 'Karl & Rosie',
  helperName: 'Lovely helper',
  slug: 'karl-rosie',
};

export const tasks: Task[] = [
  { id: 'general-cleaning', title: 'General cleaning and tidying', category: 'House', frequency: 'daily', guidance: 'Thank you. Please also check that things are put away properly and not left on the sides.' },
  { id: 'balcony-clean', title: 'Check balcony is clean', category: 'House', frequency: 'daily', guidance: 'Thank you. Please check the balcony floor and surfaces are safe and tidy.' },
  { id: 'food-dates', title: 'Check food dates in the fridge', category: 'Kitchen & Food', frequency: 'daily', guidance: 'Thank you. If any food is close to going out of date, please send Karl or Rosie a quick message.' },
  { id: 'food-expiry-message', title: 'Send a message if any food is close to going out of date', category: 'Kitchen & Food', frequency: 'daily', guidance: 'Thank you. A quick photo or message is perfect.' },
  { id: 'toilet-roll', title: 'Check all toilets have toilet roll', category: 'Bathrooms', frequency: 'daily', guidance: 'Thank you. Please make sure every bathroom has toilet roll available.' },
  { id: 'bathroom-towels', title: 'Check all bathrooms have clean towels', category: 'Bathrooms', frequency: 'daily', guidance: 'Thank you. Please make sure clean towels are ready in each bathroom.' },
  { id: 'wash-clothes', title: 'Wash clothes and towels', category: 'Laundry', frequency: 'daily', guidance: 'Thank you. Please use fresh towels each day where needed.' },
  { id: 'dry-clothes', title: 'Ensure clothes are fully dry before putting away', category: 'Laundry', frequency: 'daily', guidance: 'Thank you. Please only put clothes away when fully dry.' },
  { id: 'put-away-clothes', title: 'Put away clean clothes', category: 'Laundry', frequency: 'daily', guidance: 'Thank you. Please put clean clothes away neatly.' },
  { id: 'no-clothes-overnight', title: 'Ensure clothes are not left out overnight', category: 'Laundry', frequency: 'daily', guidance: 'Thank you. Please check this before finishing for the day.' },
  { id: 'water-plants', title: 'Water plants', category: 'Plants', frequency: 'daily', guidance: 'Thank you. Please water plants as needed and avoid overwatering.' },
  { id: 'four-pm-message', title: 'If Karl and Rosie are not home by 4:00pm, send a message to ask when they expect to be home so Leo can have dinner if needed', category: 'Communication', frequency: 'daily', guidance: 'Thank you. This helps us make sure Leo has dinner at the right time.' },
  { id: 'check-stock', title: 'Check cleaning supplies and household stock levels', category: 'Communication', frequency: 'daily', guidance: 'Thank you. Please check cleaning products, toiletries, toilet roll, and daily supplies.' },
  { id: 'stock-low-message', title: 'Send a message if supplies are running low', category: 'Communication', frequency: 'daily', guidance: 'Thank you. Please tell us as soon as stock is low.' },
  { id: 'remove-bedding', title: 'Remove all bedding', category: 'Friday Only', frequency: 'friday', guidance: 'Thank you. Friday is bedding day.' },
  { id: 'wash-bedding', title: 'Wash bedding', category: 'Friday Only', frequency: 'friday', guidance: 'Thank you. Please wash bedding on Friday.' },
  { id: 'fresh-bedding', title: 'Put fresh bedding on all beds', category: 'Friday Only', frequency: 'friday', guidance: 'Thank you. Fresh bedding on all beds is really appreciated.' },
];

export const guidance: Guide[] = [
  { category: 'Food', items: ['Use older food before opening new food.', 'Fruit is expensive, please check with Rosie before giving lots to the boys.', 'Put small 500ml water bottles in the fridge.', 'Wash fruit before putting it in the fridge.', 'Do not wrap fruit or vegetables in cling film.', 'Keep raw meat separate from other food.', 'Use sensible portions and make sure there is enough food for you as well.'] },
  { category: 'Bathrooms', items: ['Fill the bath using the shower head because it is filtered.', 'Keep toilet roll in every bathroom.', 'Keep clean towels in every bathroom.', 'Boys must wash hands before eating.', 'Be gentle when helping the boys in the bathroom.'] },
  { category: 'Laundry', items: ['Wash clothes and towels daily.', 'Use a fresh towel each day.', 'Make sure clothes are fully dry before putting away.', 'Do not leave clothes out overnight.'] },
  { category: 'Home', items: ['Put things away, not on the sides.', 'Check balcony is clean.', 'Do not stand on worktops; use a chair.', 'Keep an eye on the boys belongings to avoid losing them.'] },
  { category: 'General', items: ['If unsure, please ask.', 'Work at your own pace.', 'Please try to finish by the evening so the family can use the living room.', 'Thank you, we really appreciate your help.'] },
];
