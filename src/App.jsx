import { BrowserRouter } from "react-router-dom";
import { Router } from "./modules/router/Router";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./modules/service/reactQuery";

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
