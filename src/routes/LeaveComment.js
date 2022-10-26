import { Form } from "react-router-dom";

export default function LeaveComment() {
  return (
    <Form method="post">
      <div className="form-floating mb-3">
        <textarea className="form-control" id="comment-input" name="comment" />
        <label htmlFor="comment-input">Leave a comment here</label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </Form>
  );
}
