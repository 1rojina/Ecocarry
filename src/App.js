import { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useAppDispatch } from './redux/store';
import { fetchData } from './redux/items/asynAction';

import Header from './components/Header';
import Drawer from './components/Drawer';

import AppContext from './context';

import Home from './pages/Home';
import Favorites from './pages/Favorite';
import Orders from './pages/Orders';
import Footer from './pages/Footer';
import NotFound from './pages/NotFound';

import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const { categoryId } = useSelector((state) => state.filter);

  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);

  // Using useCallback to memoize the getData function
  const getData = useCallback(async () => {
    dispatch(fetchData(categoryId));
  }, [dispatch, categoryId]);

  // useEffect with getData as a dependency
  useEffect(() => {
    getData();
  }, [getData]);

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <AppContext.Provider
      value={{
        setCartOpened,
      }}
    >
      <div className="App clear">
        <div>
          <Drawer onClose={() => setCartOpened(false)} opened={cartOpened} />
        </div>

        <Routes>
          <Route
            path="/"
            element={<Header onClickCart={() => setCartOpened(true)} />}
          >
            <Route
              index={true}
              element={
                <Home
                  searchValue={searchValue}
                  onChangeSearchInput={onChangeSearchInput}
                />
              }
            />
            <Route path="favorites" element={<Favorites />} />
            <Route path="orders" element={<Orders />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;