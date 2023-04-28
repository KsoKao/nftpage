import axios from "axios";
import { useEffect, useState } from "react";
import NftCard from "./NftCard";

const Nfts = ({ page, mintedNfts }) => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [nfts, setNfts] = useState();

  const getNfts = async (p) => {
    try {
      setNfts();

      let nftArray = [];

      for (let i = 0; i < 10; i++) {
        const tokenId = i + 1 + (p - 1) * 10;

        let response = await axios.get(
          `${process.env.REACT_APP_JSON_URL}/${tokenId}.json`
        );

        nftArray.push({ tokenId, metadata: response.data });
      }

      setNfts(nftArray);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickPage = (p) => () => {
    if (selectedPage === p) return;

    setSelectedPage(p);

    getNfts(p);
  };

  const pageComp = () => {
    let pageArray = [];

    for (let i = 0; i < page; i++) {
      pageArray.push(
        <button
          key={i}
          className={`ml-4 text-2xl font-bold hover:text-white ${
            i + 1 === selectedPage ? "text-white" : "text-gray-400"
          }`}
          onClick={onClickPage(i + 1)}
        >
          {i + 1} <span className="text-base">페이지</span>
        </button>
      );
    }

    return pageArray;
  };

  useEffect(() => {
    console.log(nfts);
  }, [nfts]);

  useEffect(() => {
    getNfts(1);
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto mt-8 pb-40">
      <div>{pageComp()}</div>
      <div className="mt-8">
        {nfts ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 justify-items-center gap-8">
            {nfts.map((v, i) => {
              return (
                <NftCard
                  key={i}
                  tokenId={v.tokenId}
                  metadata={v.metadata}
                  mintedNfts={mintedNfts}
                />
              );
            })}
          </div>
        ) : (
          <div>로딩중입니다...</div>
        )}
      </div>
    </div>
  );
};

export default Nfts;
