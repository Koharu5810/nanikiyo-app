import "@/styles/base/sanitize.css";
import "@/styles/base/global.css";
import "@/styles/layout.css";
import { AppLayout } from "./components/layout/AppLayout";
import { WeatherOutfitContainer } from "@/containers/WeatherOutfitContainer";

function App() {
  return (
    <AppLayout>
      <WeatherOutfitContainer />
    </AppLayout>
  );
}

export default App;
