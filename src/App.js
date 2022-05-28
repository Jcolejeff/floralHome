import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import { getFlowers, createFlower, buyFlower, increaseQuantity } from "./utils/marketplace";
import { login, accountBalance } from "./utils/near";

function App() {
  const account = window.walletConnection.account();
  const [balance, setBalance] = useState();
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(false);
  const getBalance = useCallback(async () => {
    if (account.accountId) {
      setBalance(await accountBalance());
      await getFlower();
      console.log(flowers);
    }
  }, [account]);

  useEffect(() => {
    if (!account.accountId) {
      login();
    }
  }, []);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  const addFlower = async (data) => {
    try {
      setLoading(true);
      await createFlower(data);
      await getFlower();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getFlower = async () => {
    try {
      setLoading(true);
      const flowers = await getFlowers();
      console.log(typeof(flowers[0].quantity));
      setFlowers(flowers);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const buyFlowers = async (id, price)=>{
    try {
      setLoading(true)
      await buyFlower({id, price});
      await getFlower()
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  }

  const quantityEdit = async (flower) => {
    try {
      setLoading(true);
      const { id } = flower;
      console.log(id);
      await increaseQuantity({id});
      await getFlower();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {loading ? (
        <p
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          Loading...
        </p>
      ) : (
        <>
          <Navbar balance={balance} />
          <Body
            address={account.accountId}
            addFlower={addFlower}
            flowers={flowers}
            buyFlowers={buyFlowers}
            increaseQuantity={quantityEdit}
          />
        </>
      )}
    </>
  );
}

export default App;
