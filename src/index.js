import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Contact from "./routes/Contact";
import Index from "./routes/Index";
import Root from "./routes/Root";
import {
  deleteComment,
  fetchCommentsForPost,
  fetchPost,
  fetchPosts,
  saveComment,
  updatePost,
} from "./api";
import Post from "./routes/Post";
import Comments from "./Comments";
import LeaveComment from "./routes/LeaveComment";
import { toast } from "react-toastify";
import EditPost from "./routes/EditPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Index />,
        loader() {
          return fetchPosts();
        },
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/posts/:id", // :id is a dynamic segment
        loader({ params }) {
          return fetchPost(params.id);
        },
        element: <Post />,
        children: [
          // the "index" route of the parent post route
          {
            path: "/posts/:id",
            element: <p>Make some new friends 💬</p>,
          },
          {
            path: "/posts/:id/comments",
            loader({ params }) {
              return fetchCommentsForPost(params.id);
            },
            element: <Comments />,
          },
          {
            path: "/posts/:id/comments/new",
            element: <LeaveComment />,
            action({ request, params }) {
              return request.formData().then((formData) => {
                return saveComment(formData.get("comment"), params.id).then(
                  () => {
                    toast.success("Your comment was successfully posted.");
                    return redirect(`/posts/${params.id}/comments`);
                  }
                );
              });
            },
          },
        ],
      },
      {
        path: "/comments/:commentId/destroy",
        action({ request, params }) {
          return request.formData().then((formData) => {
            return deleteComment(params.commentId).then(() => {
              toast.success("Your comment was deleted.");

              const postId = formData.get("postId");
              return redirect(`/posts/${postId}/comments`);
            });
          });
        },
      },
      {
        path: "/posts/:postId/edit",
        element: <EditPost />,
        loader({ params }) {
          return fetchPost(params.postId);
        },
        action({ request, params }) {
          return request.formData().then((formData) => {
            return updatePost(
              params.postId,
              formData.get("title"),
              formData.get("body")
            ).then(
              () => {
                toast.success("You successfully updated the post.");
              },
              () => {
                toast.error("Uh oh!");
              }
            );
          });
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
