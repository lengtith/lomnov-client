import { createRoot } from "react-dom/client";
import "./styles.css";
import InputField from "./components/inputfield/InputField";
// import Button from './components/Button';

const Demo = () => (
  <div>
    <h1>Testing UI Components</h1>
    {/* <Button>  helo </Button> */}
  </div>
);

const container = document.getElementById("app");

const root = createRoot(container!);
root.render(<Demo />);
