import { Comment } from "antd";
import remarkEmoji from 'remark-emoji';
import ReactMarkdown from 'react-markdown';

export const ThreadComment = ({ comment }) => {
const { author, body, updated_at } = comment;
  return (
    <Comment
      author={author.name}
      content={
        <ReactMarkdown remarkPlugins={[remarkEmoji]}>
          {body}
        </ReactMarkdown>
      }
      datetime={updated_at}
    />
  );
};
