const { ApolloServer, gql } = require("apollo-server");

let blogs = [
  { id: 1, title: "blog1", body: "body of blog 1", date: "23-4-2022" },
  { id: 2, title: "blog2", body: "body of blog 2", date: "23-4-2022" },
  { id: 3, title: "blog3", body: "body of blog 3", date: "23-4-2022" },
];
let posts = [
  { id: 1, title: "post1", body: "body of post 1", date: "23-4-2022" },
  { id: 2, title: "post2", body: "body of post 2", date: "23-4-2022" },
];

const schema = `
    type Blog {
        id: ID! 
        title: String!
        body: String!
        date:String!
    }

    type Posts {
        id: ID! 
        title: String!
        body: String!
        date:String!
    }


    type Query {
        allBlogs (last: Int): [Blog]
        allPosts (last: Int): [Posts]
    }

    type Mutation {
        deleteBlog (id: ID): [Blog]
    createBlog (id: ID, title: String, body: String, date:String):[Blog]
    deletePosts (id: ID): [Posts]
    createPosts (id: ID, title: String, body: String, date:String):[Posts]
    }
`;

const typeDefs = gql(schema);

const resolvers = {
  Query: {
    allBlogs: (_, { last }) => {
      if (!last) return blogs;
      if (last) return blogs.slice(last);
    },
    allPosts: (_, { last }) => {
      if (!last) return posts;
      if (last) return posts.slice(last);
    },
  },
  Mutation: {
    deleteBlog: (_, { id }) => {
      blogs = blogs.filter((blog) => blog.id !== id);
      return blogs;
    },
    createBlog: (_, { id, title, body, date }) => {
      blogs.push({
        id: id,
        title: title,
        body: body,
        date: date,
      });

      return blogs;
    },
    deletePost: (_, { id }) => {
      posts = posts.filter((post) => post.id !== id);
      return posts;
    },
    createPost: (_, { id, title, body, date }) => {
      posts.push({
        id: id,
        title: title,
        body: body,
        date: date,
      });

      return posts;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(4001).then(({ url }) => {
  console.log("url: ", url);
});
