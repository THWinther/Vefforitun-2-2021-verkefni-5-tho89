// TODO sækja og setja upp react router -- KOMIÐ?

import { Layout } from './components/layout/Layout';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { Index } from './pages/Index';
import { NewsPage } from './pages/News';
import { NotFound } from './pages/NotFound';



export default function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Index} />
          <Route path='/id/:id' component={NewsPage}/>
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    </Layout>
  );
}
