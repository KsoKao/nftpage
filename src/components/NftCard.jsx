import { FaChessRook } from "react-icons/fa";
import { Link } from "react-router-dom";

const NftCard = ({ tokenId, metadata, mintedNfts }) => {
  return (
    <div className="rounded-2xl relative bg-gray-800 pb-4">
      {parseInt(mintedNfts) < tokenId && (
        <div className="text-white absolute bg-black bg-opacity-50 w-full h-full rounded-2xl flex justify-center items-center text-4xl font-bold">
          Not Minted
        </div>
      )}
      <img className="rounded-t-2xl" src={metadata.image} alt="NFT" />
      <div className="mt-4 text-xl font-bold flex items-center px-4 text-gray-300">
        Da Den Bu
        <div className="bg-main w-6 h-6 rounded-full flex justify-center items-center ml-2 text-gray-950">
          <FaChessRook size={16} />
        </div>
      </div>
      <div className="mt-4 text-2xl font-bold px-4"># {tokenId}</div>
      <div className="mt-4 text-xl  flex justify-end items-center px-4">
        <Link to={`/${tokenId}`}>
          <button
            className="bg-gray-50 text-gray-950 px-4 py-2 rounded-xl hover:bg-gray-500"
            disabled={parseInt(mintedNfts) < tokenId}
            onClick={() => console.log("nft card")}
          >
            Detail
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NftCard;
