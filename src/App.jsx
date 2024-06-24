import { BrowserRouter } from "react-router-dom";
import { Router } from "./modules/router/Router";
import queryClient from "./modules/service/reactQuery";
import { QueryClientProvider } from "react-query";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
