export type TourScene = {
  id: string;
  image: number;
  eyebrow: string;
  title: string;
  caption: string;
};

export const tourScenes: TourScene[] = [
  {
    id: 'exterior',
    image: require('../../assets/tour-images/01-exterior.jpg'),
    eyebrow: 'Sankhali, Bicholim',
    title: 'Ravindra Bhavan',
    caption: 'A state-of-the-art cultural centre set on a 30,000 sq.m. campus by the Department of Art & Culture, Goa.',
  },
  {
    id: 'lobby',
    image: require('../../assets/tour-images/02-lobby.jpg'),
    eyebrow: 'Arrival',
    title: 'The Foyer',
    caption: 'A sweeping entrance foyer connects the exhibition space, snack room and grand auditorium.',
  },
  {
    id: 'auditorium-stage',
    image: require('../../assets/tour-images/03-auditorium-stage.jpg'),
    eyebrow: 'Manoharbuva Shirgaonkar Sabhagraha',
    title: 'The Grand Auditorium',
    caption: 'A full-scale proscenium stage built for theatre, classical music and dance.',
  },
  {
    id: 'auditorium-seats',
    image: require('../../assets/tour-images/04-auditorium-seats.jpg'),
    eyebrow: 'Seating',
    title: 'Every Seat, a Front Row',
    caption: 'Tiered red-velvet seating wraps the stage, holding hundreds of guests for a single performance.',
  },
];

export type AmenityIcon =
  | 'auditorium'
  | 'theatre'
  | 'library'
  | 'parking'
  | 'exhibition'
  | 'snacks'
  | 'training'
  | 'service';

export const amenities: { icon: AmenityIcon; title: string; description: string }[] = [
  { icon: 'auditorium', title: 'Grand Auditorium', description: 'Lobby, VIP rooms, snack area, exhibition space and storage.' },
  { icon: 'theatre', title: 'Open Air Theatre', description: 'Stage, seating, control room, green rooms and storage.' },
  { icon: 'library', title: 'Library (Nagar Vachanalay)', description: 'Book storage and comfortable reading seating.' },
  { icon: 'parking', title: 'Ample Parking', description: 'VIP and public parking with well-designed driveways.' },
  { icon: 'exhibition', title: 'Exhibition Area', description: 'Purpose-built display space connected to the lobby.' },
  { icon: 'snacks', title: 'Snack Room', description: 'Central refreshment area for guests, exhibitors and staff.' },
  { icon: 'training', title: 'Training Room & Dormitory', description: 'Dormitories, training rooms, pantry and VIP suites.' },
  { icon: 'service', title: 'Service Block', description: 'Generator, transformer and water tanks for uninterrupted events.' },
];

// Council/committee membership is admin-editable — see src/lib/supabase.ts
// fetchCouncil() and the admin portal's Council section, not static data here.

export const contact = {
  name: 'Ravindra Bhavan Sankhali',
  address: '2432, Desai Nagar, Harvale, Goa 403505',
  phone: '0832-2424031 / 2424032',
  bookingPhone: '+91 74998 44824',
  email: 'ravindrabhavansankhali@gmail.com',
};
