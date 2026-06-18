export const invitationData = {
  personName: "Shraddha",
  eventDateLabel: "19th July 2026",
  eventDateTimeLabel: "19 July 2026, 11:30 AM",
  eventDateISO: "2026-07-19T11:30:00+05:30",
  hosts: "Sekhar & Sudha",
  verse: {
    text: "I praise You because I am fearfully and wonderfully made; Your works are wonderful, I know that full well.",
    reference: "Psalm 139:14",
  },
  hero: {
    titlePrefix: "By God's Grace",
    subtitleLine1: "We joyfully invite you to celebrate",
    subtitleLine2: "the Half Saree Function of",
    image: "/images/hero/hero-main.jpg",
  },
  family: {
    photo: "/images/family/family-main.jpg",
    blessing:
      "Blessed with the grace of God, we joyfully invite you to celebrate this special milestone in our daughter Shraddha's life.",
  },
  timeline: {
    dateLabel: "19 July 2026",
    events: [
      {
        icon: "church",
        time: "11:30 AM",
        title: "Opening Prayer",
        description: "Seeking God's blessings to begin the celebration",
      },
      {
        icon: "users",
        time: "12:00 PM",
        title: "Welcome & Blessing",
        description: "Family and friends come together in joy",
      },
      {
        icon: "award",
        time: "12:30 PM",
        title: "Family Felicitation",
        description: "Honoring our loved ones",
      },
      {
        icon: "utensils",
        time: "01:00 PM",
        title: "Lunch",
        description: "A feast of love and togetherness",
      },
      {
        icon: "camera",
        time: "02:00 PM",
        title: "Photography & Fellowship",
        description: "Capturing precious memories",
      },
    ],
  },
  gallery: [
    { src: "/images/gallery/gallery-01.jpg", alt: "Shraddha childhood portrait" },
    { src: "/images/gallery/gallery-02.jpg", alt: "Family blessing moment" },
    { src: "/images/gallery/gallery-03.jpg", alt: "Celebration smile" },
    { src: "/images/gallery/gallery-04.jpg", alt: "Family together" },
    { src: "/images/gallery/gallery-05.jpg", alt: "Memories with parents" },
    { src: "/images/gallery/gallery-06.jpg", alt: "Joyful gathering" },
  ],
  venue: {
    name: "Sree Conventions",
    subtitle: "Function Halls in Vizag",
    address: "Visakhapatnam, Andhra Pradesh",
    prayerStart: "11:30 AM",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Sree+Conventions+Function+Hall+Vizag",
    mapEmbedQuery: "Sree Conventions Function Hall Vizag",
  },
  contact: {
    whatsappNumber: "601137912235",
  },
  thankYou: {
    photo: "/images/thankyou/thankyou-main.jpg",
    familyLabel: "Sekhar & Sudha Family",
    message:
      "Thank you for celebrating this special day with us. God bless you.",
  },
  seo: {
    title: "Shraddha's Half Saree Function | 19 July 2026",
    description:
      "By God's Grace, we joyfully invite you to celebrate the Half Saree Function of Shraddha on 19 July 2026 at Sree Conventions, Vizag.",
    image: "/images/hero/hero-main.jpg",
  },
};

export type BlessingMessage = {
  id: number;
  name: string;
  message: string;
};