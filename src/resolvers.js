import {
  posts,
  users,
} from './data';

export default {
  Query: {
    // parent, usefull for relational data. Name : arguments contains the info we need, ctx, info
    me() {
      return {
        id: '122MK22',
        name: 'Assitan',
        email: 'rerer@gmail.com',
        age: '29'
      };
    },
    post() {
      return {
        id: '2E3D',
        title: 'Les oiseaux',
        body: 'Lorem Ipsum',
        // published: false, renvoie null car pas obligatoire
      };
    },
    users(parent, {
      query
    }) {
      if (!query) {
        return users;
      }

      // Filter users by their name
      return users.filter((user) => {
        return user.name.toLowerCase().includes(query.toLowerCase());
      });
    },
    posts(parent, {
      query
    }) {
      if (!query) {
        return posts;
      }

      // Filter posts by their title or body
      return posts.filter((post) => {
        const isTitleMatch = post.title.toLowerCase().includes(query.toLowerCase());
        const isBodyMatch = post.body.toLowerCase().includes(query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
    },
    hello: (parent, {
      name,
      email
    }) => `Hello ${name || 'World'}. Your email : ${email}`,
    add(parent, {
      numbers
    }) {
      if (numbers.length === 0) {
        return 0;
      }

      // Sum value of an array
      return numbers.reduce((acc, curr) => acc + curr);
    },
    grades: () => [1, 23, 4, 6],
    height: () => 1.74,
    isNice: () => true,
  },
  // Relational data
  Post: {
    author(parent) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
  },
  User: {
    posts(parent) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },
  },
};