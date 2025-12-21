// types
export interface Category {
  id: number;
  category: string;
}

export interface PublicationItem {
  id: number;
  header: string;
  date: string;
  description: string;
  author?: string;
  image?: string;
}

export interface PublicationsGroup {
  id: number;
  category: string;
  publications: PublicationItem[];
}

const Categories: Category[] = [
  {
    id: 1,
    category: "Articles",
  },
  { id: 2, category: "Newsletters" },
  { id: 3, category: "Official Letters" },
  { id: 4, category: "Podcasts" },
];


const Publication: PublicationsGroup[] = [
        {
    id: 1,
    category: "Articles",
    publications: [
      {
        id: 11,
        header: "Article 1",
        date: "Thurs, 13th Feb 2025",
        author: "ACUSA Media Writers",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere maiores voluptates dolor? Eius, odio. Quam neque odio totam reiciendis, ducimus perferendis quis libero autem dolor voluptates fuga voluptatem, ratione nam deserunt repellendus maiores rerum! Libero perspiciatis eos laudantium hic error!",
        image: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 12,
        header: "Article 1",
        date: "Thurs, 13th Feb 2025",
        author: "ACUSA Media Writers",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere maiores voluptates dolor? Eius, odio. Quam neque odio totam reiciendis, ducimus perferendis quis libero autem dolor voluptates fuga voluptatem, ratione nam deserunt repellendus maiores rerum! Libero perspiciatis eos laudantium hic error!",
     //    image: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 13,
        header: "Article 31",
        date: "Thurs, 13th Feb 2025",
        author: "ACUSA Media Writers",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere maiores voluptates dolor? Eius, odio. Quam neque odio totam reiciendis, ducimus perferendis quis libero autem dolor voluptates fuga voluptatem, ratione nam deserunt repellendus maiores rerum! Libero perspiciatis eos laudantium hic error!",
        image: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 14,
        header: "Article 51",
        date: "Thurs, 13th Feb 2025",
        author: "ACUSA Media Writers",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere maiores voluptates dolor? Eius, odio. Quam neque odio totam reiciendis, ducimus perferendis quis libero autem dolor voluptates fuga voluptatem, ratione nam deserunt repellendus maiores rerum! Libero perspiciatis eos laudantium hic error!",
        image: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 15,
        header: "Article 61",
        date: "Thurs, 13th Feb 2025",
        author: "ACUSA Media Writers",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere maiores voluptates dolor? Eius, odio. Quam neque odio totam reiciendis, ducimus perferendis quis libero autem dolor voluptates fuga voluptatem, ratione nam deserunt repellendus maiores rerum! Libero perspiciatis eos laudantium hic error!",
     //    image: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 16,
        header: "Article 71",
        date: "Thurs, 13th Feb 2025",
        author: "ACUSA Media Writers",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere maiores voluptates dolor? Eius, odio. Quam neque odio totam reiciendis, ducimus perferendis quis libero autem dolor voluptates fuga voluptatem, ratione nam deserunt repellendus maiores rerum! Libero perspiciatis eos laudantium hic error!",
        image: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
  },
  {
    id: 2,
    category: "Newsletters",
    publications: [
      {
        id: 21,
        header: "Newsletter Edition 2 - February 2025",
        date: "Sunday, 1st of March, 2025",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere maiores voluptates dolor? Eius, odio. Quam neque odio totam reiciendis, ducimus perferendis quis libero autem dolor voluptates fuga voluptatem, ratione nam deserunt repellendus maiores rerum! Libero perspiciatis eos laudantium hic error!",
        image: "/public/Gallery/newsletter.png",
        author: 'OFFICE OF THE ACUSA P.R.O 2024/2025'
      },
      {
        id: 22,
        header: "Article 22",
        date: "Thurs, 13th Feb 2025",
        author: 'OFFICE OF THE ACUSA P.R.O 2024/2025',
        description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere maiores voluptates dolor? Eius, odio. Quam neque odio totam reiciendis, ducimus perferendis quis libero autem dolor voluptates fuga voluptatem, ratione nam deserunt repellendus maiores rerum! Libero perspiciatis eos laudantium hic error!",
        image: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
  },
  {
    id: 3,
    category: "Official Letters",
    publications: [
      {
        id: 21,
        header: "Article 1",
        date: "Thurs, 13th Feb 2025",
        author: "ACUSA Media Writers",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere maiores voluptates dolor? Eius, odio. Quam neque odio totam reiciendis, ducimus perferendis quis libero autem dolor voluptates fuga voluptatem, ratione nam deserunt repellendus maiores rerum! Libero perspiciatis eos laudantium hic error!",
        image: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 22,
        header: "Article 1",
        date: "Thurs, 13th Feb 2025",
        author: "ACUSA Media Writers",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere maiores voluptates dolor? Eius, odio. Quam neque odio totam reiciendis, ducimus perferendis quis libero autem dolor voluptates fuga voluptatem, ratione nam deserunt repellendus maiores rerum! Libero perspiciatis eos laudantium hic error!",
        image: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 23,
        header: "Article 1",
        date: "Thurs, 13th Feb 2025",
        author: "ACUSA Media Writers",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere maiores voluptates dolor? Eius, odio. Quam neque odio totam reiciendis, ducimus perferendis quis libero autem dolor voluptates fuga voluptatem, ratione nam deserunt repellendus maiores rerum! Libero perspiciatis eos laudantium hic error!",
        image: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
  },
  {
    id: 4,
    category: "Podcasts",
    publications: [
      {
        id: 21,
        header: "Article 1",
        date: "Thurs, 13th Feb 2025",
        author: "ACUSA Media Writers",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere maiores voluptates dolor? Eius, odio. Quam neque odio totam reiciendis, ducimus perferendis quis libero autem dolor voluptates fuga voluptatem, ratione nam deserunt repellendus maiores rerum! Libero perspiciatis eos laudantium hic error!",
        image: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 22,
        header: "Article 1",
        date: "Thurs, 13th Feb 2025",
        author: "ACUSA Media Writers",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere maiores voluptates dolor? Eius, odio. Quam neque odio totam reiciendis, ducimus perferendis quis libero autem dolor voluptates fuga voluptatem, ratione nam deserunt repellendus maiores rerum! Libero perspiciatis eos laudantium hic error!",
        image: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 23,
        header: "Article 1",
        date: "Thurs, 13th Feb 2025",
        author: "ACUSA Media Writers",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere maiores voluptates dolor? Eius, odio. Quam neque odio totam reiciendis, ducimus perferendis quis libero autem dolor voluptates fuga voluptatem, ratione nam deserunt repellendus maiores rerum! Libero perspiciatis eos laudantium hic error!",
        image: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
  },
]

export {Categories, Publication}