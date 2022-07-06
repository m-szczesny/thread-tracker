import { Card, Typography, Collapse } from "antd";
import { ThreadComment } from "./ThreadComment";

const { Text } = Typography;
const { Panel } = Collapse;

export const ThreadCard = ({ thread, mergeRequest }) => {
  const { notes } = thread;
  const lastNote = notes.at(-1);
  return (
    <Card type="inner" bordered={false}>
      <Text>
        <a
          target="_blank"
          rel="noreferrer"
          href={`${mergeRequest.web_url}#note_${lastNote.id}`}
        >
          Last comment by {lastNote.author.name}
        </a>
      </Text>
      <Collapse bordered={false}>
        <Panel header={`See ${notes.length} comments`}>
          {notes.map((note) => (
            <ThreadComment comment={note} key={note.id} />
          ))}
        </Panel>
      </Collapse>
    </Card>
  );
};
