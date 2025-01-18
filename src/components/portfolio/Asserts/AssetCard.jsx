/* eslint-disable react/prop-types */
import GradientButton from "../Common/GradientButton";
const AssetCard = ({ asset }) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <img
            src={asset.icon}
            alt={asset.symbol}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="text-xl font-bold">{asset.symbol}</h3>
            <p className="text-sm opacity-70">{asset.name}</p>
          </div>
        </div>
        <div className="divider my-2"></div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm opacity-70">Holdings</p>
            <p className="text-lg font-semibold">
              {asset.holdings} {asset.symbol}
            </p>
          </div>
          <div>
            <p className="text-sm opacity-70">Value</p>
            <p className="text-lg font-semibold">
              ${asset.value.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm opacity-70">Price</p>
            <p className="text-lg font-semibold">
              ${asset.price.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm opacity-70">24h Change</p>
            <p
              className={`text-lg font-semibold ${
                asset.change >= 0 ? "text-success" : "text-error"
              }`}
            >
              {asset.change}%
            </p>
          </div>
        </div>
        <div className="card-actions mt-4">
          <GradientButton className="flex-1">Trade</GradientButton>
          <button className="btn btn-outline flex-1">Details</button>
        </div>
      </div>
    </div>
  );
};
export default AssetCard;
