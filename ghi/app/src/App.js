import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ListCustomers from './ListCustomers';
import AddCustomer from './AddCustomer';
import ListSales from './ListSales';
import ListSalespeople from './ListSalespeople'
import NewSale from './NewSale';
import AddSalesperson from './AddSalesperson';
import SalespersonHistory from './SalespersonHistory';
import ListAutomobiles from './ListAutomobiles';
import ListModels from './ListModels';
import ListManufacturers from './ListManufacturers';
import CreateManufacturer from './CreateManufacturer';

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
          <Route path="saleshistory">
            <Route path="" element={<SalespersonHistory />} />
          </Route>
          <Route path="automobiles">
            <Route path="" element={<ListAutomobiles />} />
          </Route>
          <Route path="models">
            <Route path="" element={<ListModels />} />
          </Route>
          <Route path="manufacturers">
            <Route path="" element={<ListManufacturers />} />
          </Route>
          <Route path="manufacturers">
            <Route path="new" element={<CreateManufacturer />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
