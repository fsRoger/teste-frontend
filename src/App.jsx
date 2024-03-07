import './App.css';
import products from './dados.js';
import ProductList from './Components/ProductList.jsx';
function App() {
  return (
    <div className="App">
      <ProductList products={products} />
    </div>
  );
}

export default App;