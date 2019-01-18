const users = [{
    id: '1',
    name: 'Robert',
    email: 'robert@example.com',
    age: 22,
  },
  {
    id: '2',
    name: 'Anna',
    email: 'anna@example.com',
    age: 32,
  },
  {
    id: '3',
    name: 'Sarah',
    email: 'sarah@example.com',
  },
];

const posts = [{
    id: '10',
    title: 'GraphQL',
    body: 'This is about GraphQL',
    published: true,
    author: '1',
  },
  {
    id: '11',
    title: 'Data Science',
    body: 'This is about Data Science',
    published: false,
    author: '2',
  },
  {
    id: '12',
    title: 'TypeScript',
    body: 'This is about TypeScript',
    published: false,
    author: '3',
  },
];

const comments = [{
    id: '13',
    text: 'Very interesting',
    author: '3',
    post: '10',
  },
  {
    id: '24',
    text: 'Thank you for the info',
    author: '3',
    post: '10',
  },
  {
    id: '35',
    text: 'I\'m wainting for the next article',
    author: '1',
    post: '11',
  },
  {
    id: '43',
    text: 'I don\'t agree',
    author: '2',
    post: '13',
  },
];

export {
  users,
  posts,
  comments,
}