import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ListCustomers from './ListCustomers';
import AddCustomer from './AddCustomer';
import ListSales from './ListSales';
import ListSalespeople from './ListSalespeople'
import NewSale from './NewSale';
import AddSalesperson from './AddSalesperson';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="customers">
              <Route path="" element={<ListCustomers />} />
              <Route path="new" element={<AddCustomer />} />
          </Route>
          <Route path="sales">
            <Route path="" element={<ListSales />} />
            <Route path="new" element={<NewSale />} />
          </Route>
          <Route path="salespeople">
            <Route path="" element={<ListSalespeople />} />
            <Route path="new" element={<AddSalesperson />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
