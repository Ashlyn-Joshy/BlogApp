# BlogApp

The blog application allows users to write and share blog posts or articles on various topics. Users can easily create, edit, and delete their own blog posts while browsing through and reading posts from others. The platform provides a space for interaction through comments and likes, encouraging user engagement. 

## Deployment

To deploy this project run
```
git clone https://github.com/Ashlyn-Joshy/BlogApp.git
```
Enter into the project folder.

Create .env file inside the Backend folder
```
PORT=8080
Mongodb_Database=yourDatabaseUrl
JWT_secret=yourJWTsecretKey
```
Install backend dependencies using 
```
cd backend
npm i
```
Run the backend 
```
npm run start
```

After this open new terminal and run these commands
```
cd frontend
npm i
npm start
```

## Features

### For All Users (No Registration Required):
- **View All Blogs:** Browse through a collection of blogs posted by various users.
- **View Single Blog:** Click on any blog to see the full content along with user comments.
- **View User Data:** Check out the blogs posted by a specific user and the comments they’ve left on other blogs.
### For Registered/Logged-In Users:
- **Like/Dislike Blogs:** Registered users can like or dislike any blog.
- **Like/Dislike Comments:** You can also like or dislike reviews/comments posted by other users.
- **Create New Blog:** Write and post your own blog to share your thoughts with the community.
- **Edit or Delete Blog:** Only the owner of a blog can edit or delete their posts.
- **Delete Comments:** Users have control over the reviews they post and can delete them if necessary.

## Technologies Used

- **Back-end :** Node JS, Express JS
- **Database :** MongoDB, MongoDB Atlas, Mongoose
- **Authentication :** JSON Web Token, Bcrypt, Validator
- **Front-end :** React JS, React Router DOM, TailwindCSS
