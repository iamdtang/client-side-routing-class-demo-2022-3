import { Form, useLoaderData } from "react-router-dom";

export default function EditPost() {
  const post = useLoaderData();

  return (
    <>
      <h1>Edit</h1>
      <Form method="post">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            defaultValue={post.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">
            Body
          </label>
          <textarea
            className="form-control"
            id="body"
            rows="3"
            name="body"
            defaultValue={post.body}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </Form>
    </>
  );
}
