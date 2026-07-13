import "./App.css";
import Count from "./Component/Count";
import List from "./Component/List";
import Parent from "./Component/Parent";
import UnControl from "./Component/UnControl";

function App() {

  return <>
  
  <h2>This is a example of Dom</h2>
  <Count name="ibrar" />

  <h2>This is an about props key</h2>
  <List/>
  <h2>This is an uncontrol and useRef </h2>
  <UnControl/>
  <h2>This is an example of lift the State ,  that child can Transfer the data child to nearest ancestor</h2>
<Parent/>  
  </>;
}

export default App;
