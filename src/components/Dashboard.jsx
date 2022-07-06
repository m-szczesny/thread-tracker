import { Typography, Button, Row, Col, Spin } from "antd";
import { MergeRequestCard } from "./MergeRequestCard";
import { useDashboardData } from "../hooks/useDashboardData";

const { Title, Text } = Typography;

export const Dashboard = ({ setSetupReady }) => {
  const [user, projectData, mergeRequestsToCheck, isLoading, refreshDashboardData] = useDashboardData();

  return (
    <Spin spinning={isLoading}>
      <Row>
        <Col span={12}>
          <Title>ThreadTracker</Title>
        </Col>
        <Col span={4}>
          <Button onClick={() => refreshDashboardData(user, projectData)}>Refresh</Button>
        </Col>
        <Col span={4}>
          <Button onClick={() => setSetupReady(false)}>Reset setup</Button>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Text>
            Welcome {user.name}. You have ongoing threads on{" "}
            {mergeRequestsToCheck.length} merge requests.
          </Text>
        </Col>
      </Row>
      {mergeRequestsToCheck.map((mr) => (
        <MergeRequestCard
          key={mr.id}
          mergeRequest={mr}
          currentUser={user}
        />
      ))}
    </Spin>
  );
};
