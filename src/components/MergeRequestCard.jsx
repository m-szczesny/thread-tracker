import { Card, Collapse, Typography, Row, Col } from "antd";
import { hasReplies } from "../helpers/helper";
import { ThreadCard } from "./ThreadCard";

const { Panel } = Collapse;
const { Text } = Typography;

export const MergeRequestCard = ({
  mergeRequest,
  currentUser
}) => {
  const { title, web_url, discussions, author } = mergeRequest;
  const repliesReceived = hasReplies(discussions, currentUser);

  const cardTitle = (
    <Row>
      <Col span={12}>
        <a
          target="_blank"
          rel="noreferrer"
          href={web_url}
        >
          {title}
        </a>
      </Col>
      <Col span={12}>
        <Text>Created by {author.name}</Text>
      </Col>
    </Row>
  );

  const panelHeader = (
    <Row>
      <Col>
        <Text>{discussions.length} pending threads</Text>
      </Col>
      {repliesReceived && (
        <Col>
          <Text className="ml-sm" type="warning">
            You got some replies!
          </Text>
        </Col>
      )}
    </Row>
  );

  return (
        <Card title={cardTitle}>
          <Collapse bordered={false}>
            <Panel header={panelHeader}>
              {discussions.map((discussion) => (
                <ThreadCard
                  key={discussion.id}
                  thread={discussion}
                  mergeRequest={mergeRequest}
                />
              ))}
            </Panel>
          </Collapse>
        </Card>
  );
};
