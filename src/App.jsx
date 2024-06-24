import { BrowserRouter } from "react-router-dom";

import queryClient from "./modules/service/reactQuery";
import { QueryClientProvider } from "react-query";
import { Router } from "./modules/router/Router";

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
