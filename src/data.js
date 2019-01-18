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
  }
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
  }
];

export {
  users,
  posts
}