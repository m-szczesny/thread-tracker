import { Dashboard } from "./Dashboard";
import { Setup } from "./Setup";

export const Home = ({ setupReady, setSetupReady }) => (setupReady ? (
    <Dashboard setSetupReady={setSetupReady} />
  ) : (
    <Setup setSetupReady={setSetupReady} />
  ))