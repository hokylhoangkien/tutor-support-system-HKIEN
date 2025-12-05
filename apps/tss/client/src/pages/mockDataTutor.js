
const getRandomAvatar = (seed) => `https://i.pravatar.cc/150?u=${seed}`;
const firstNames = [
  "Lionel",
  "Cristiano",
  "Taylor",
  "Son",
  "Elon",
  "Bill",
  "Mark",
  "Lisa",
  "Hideo",
  "Sana",
  "Jennie",
  "Robert",
];
const lastNames = [
  "Messi",
  "Ronaldo",
  "Swift",
  "Heung-min",
  "Musk",
  "Gates",
  "Zuckerberg",
  "Manoban",
  "Kojima",
  "Minatozaki",
  "Kim",
  "Downey Jr.",
];
const subjects = [
  "Computer Science",
  "Software Engineering",
  "Data Science",
  "Artificial Intelligence",
  "Machine Learning",
  "Cyber Security",
  "Web Development",
  "Cloud Computing",
];

function generateRandomTutors (count){
  return Array.from({ length: count }, (_, i ) => {
    const randomFirst = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLast = lastNames[Math.floor(Math.random() * lastNames.length)];
    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];

    const randomRating = (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);
    const randomReviews = (Math.random() * (5.0 - 0.5) + 0.5).toFixed(1) + "k";

    const uniqueSeed = `${randomFirst}${i}${Math.random()}`;

    return {
      avatar: getRandomAvatar(uniqueSeed),
      id: i + 1,
      name: `${randomFirst} ${randomLast}`,
      rating: randomRating,
      reviews: randomReviews,
      subject: randomSubject,
      seed: uniqueSeed,
      info: [
        "Ph.D. in Applied Mathematics — University of Melbourne, Australia (2018)",
        "M.Sc. in Mathematical Modeling — HCMUT (2014)",
        "B.Sc. in Applied Science — HCMUT (2012)",
        "Certified Online Teaching Professional (Coursera, 2022)"
      ],
      teachingCourses: generateCourses(uniqueSeed)

    };
  });
}

const generateCourses = (seed) => {
  return [1, 2, 3].map((num) => ({
    id: num,
    title: `Calculus ${num}`,
    code: `H${num}.801`,
    mode: "Offline",
    rating: 3.9,
    reviewCount: "1.3K",
    image: `https://picsum.photos/seed/${seed}math${num}/400/250`
  }));
};

let listTutor = generateRandomTutors(100);
listTutor.unshift({
  avatar: "https://api.builder.io/api/v1/image/assets/TEMP/5cd3fd5bfb85afe958c3abdecd2c9da7b63e3c15?width=308",
  id: 0,
  name: `Mai Đức Trung`,
  rating: 5.0,
  reviews: "100k",
  subject: "Software Engineering",
  seed: 0,
  info: [
    "Ph.D. in Applied Mathematics — University of Melbourne, Australia (2018)",
    "M.Sc. in Mathematical Modeling — HCMUT (2014)",
    "B.Sc. in Applied Science — HCMUT (2012)",
    "Certified Online Teaching Professional (Coursera, 2022)"
  ],
  teachingCourses: generateCourses(0)
});
export default function getById(id){
  if (id === -1 )
    return listTutor;
  return listTutor[id]
};

