import {
  posts,
  users,
  comments,
} from './data';

import uuidv4 from 'uuid/v4';

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
        // published: false, set null bc not mandatory
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
    comments: () => comments,
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
  Mutation: {
    createUser(parent, { email, name, age }) {
      const emailTaken = users.some((user) => user.email === email);

      if (emailTaken) {
        throw new Error('Email taken');
      }

      const user = {
        id: uuidv4(),
        name,
        email,
        age,
      };

      users.push(user);

      return user;
    },
    createPost(parent, { title, body, published, author }) {
      const userExists = users.some((user) => user.id === author);

      if (!userExists) {
        throw new Error('User not found');
      }

      const post = {
        id: uuidv4(),
        title,
        body,
        published,
        author,
      };

      posts.push(post);

      return post;
    },
    createComment(parent, { text, author, post }) {
      const userExists = users.some((user) => user.id === author);
      const postExists = posts.some((post) => post.id === post && post.published);

      if (!userExists) {
        throw new Error('Unable to found a user');
      }

      if (!postExists) {
        throw new Error('Unable to found a post');
      }

      const comment = {
        id: uuidv4(),
        text,
        author,
        post,
      };

      comments.push(comment);

      return comment;
    },
  },
  // Relational data
  Post: {
    // returns author's posts
    author(parent) {
      return users.find((user) => user.id === parent.author);
    },
    // returns all comments belonging to that post
    comments(parent) {
      return comments.filter((comment) => comment.post === parent.id);
    },
  },
  User: {
    // returns the posts by author
    posts(parent) {
      return posts.filter((post) => post.author === parent.id);
    },
    // returns all comments belonging to that user
    comments(parent) {
      return comments.filter((comment) => comment.author === parent.id);
    },
  },
  Comment: {
    // returns the user who wrote the comment
    author(parent) {
      return users.find((user) => user.id === parent.author);
    },
    // get the post belonging to the comment
    post(parent) {      
      return posts.find((post) => post.id === parent.post);
    },
  },
};