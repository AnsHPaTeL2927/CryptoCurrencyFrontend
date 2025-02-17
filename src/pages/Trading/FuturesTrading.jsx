import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import { Alert } from '../../components/ui/Alerts';
import {
  ChevronDown, ChevronUp, Settings, BarChart2, Clock,
  TrendingUp, TrendingDown, DollarSign, AlertCircle, X,
  BookOpen, Shield, Sliders, Percent
} from 'lucide-react';

const TRADING_PAIRS = [
  { symbol: 'BTC-USDT', name: 'Bitcoin', price: '43,567.89', change: '+2.34' },
  { symbol: 'ETH-USDT', name: 'Ethereum', price: '2,345.67', change: '-1.23' },
  { symbol: 'SOL-USDT', name: 'Solana', price: '123.45', change: '+5.67' },
  { symbol: 'XRP-USDT', name: 'Ripple', price: '0.5678', change: '+3.21' },
  { symbol: 'ADA-USDT', name: 'Cardano', price: '1.234', change: '-0.98' }
];

const FututreTrading = () => {
  // State management
  const [selectedPair, setSelectedPair] = useState('BTC-USDT');
  const [leverage, setLeverage] = useState(20);
  const [orderType, setOrderType] = useState('limit');
  const [positionSide, setPositionSide] = useState('long');
  const [marginType, setMarginType] = useState('cross');
  const [sliderValue, setSliderValue] = useState(0);
  const [showRiskWarning, setShowRiskWarning] = useState(true);
  const [orderForm, setOrderForm] = useState({
    price: '',
    size: '',
    stopLoss: '',
    takeProfit: ''
  });

  const [activePositions, setActivePositions] = useState([
    {
      symbol: 'BTC-USDT',
      side: 'LONG',
      size: '0.5',
      leverage: '20x',
      entryPrice: '42,350.65',
      markPrice: '43,567.89',
      pnl: '+586.23',
      roe: '+13.45%',
      liqPrice: '38,234.56',
      margin: '1,234.56'
    }
  ]);

  const [openOrders, setOpenOrders] = useState([
    {
      symbol: 'BTC-USDT',
      type: 'LIMIT',
      side: 'LONG',
      price: '41,234.56',
      size: '0.3',
      leverage: '20x',
      time: '2024-02-17 14:30:25'
    }
  ]);

  // Order book data
  const [orderBook, setOrderBook] = useState({
    asks: [
      { price: '43,575.50', size: '0.245', total: '10,675.99' },
      { price: '43,574.25', size: '0.532', total: '23,181.50' },
      { price: '43,573.00', size: '0.876', total: '38,169.95' },
      { price: '43,571.75', size: '1.234', total: '53,767.54' },
      { price: '43,570.50', size: '2.456', total: '107,008.55' }
    ],
    bids: [
      { price: '43,569.25', size: '0.345', total: '15,031.39' },
      { price: '43,568.00', size: '0.654', total: '28,493.47' },
      { price: '43,566.75', size: '0.987', total: '42,999.38' },
      { price: '43,565.50', size: '1.543', total: '67,221.57' },
      { price: '43,564.25', size: '3.234', total: '140,876.58' }
    ]
  });

  // Handle form changes
  const handleFormChange = (field, value) => {
    setOrderForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-base-200 p-4">
      {/* Top Navigation Bar */}
      <div className="navbar bg-base-100 rounded-box mb-4">
        <div className="flex-1">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost m-1">
              {selectedPair} <ChevronDown className="ml-2" />
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52">
              {TRADING_PAIRS.map(pair => (
                <li key={pair.symbol}>
                  <button 
                    onClick={() => setSelectedPair(pair.symbol)}
                    className="flex justify-between"
                  >
                    <span>{pair.symbol}</span>
                    <span className={pair.change.startsWith('+') ? 'text-success' : 'text-error'}>
                      {pair.change}%
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="stats shadow ml-4">
            <div className="stat">
              <div className="stat-title">Mark Price</div>
              <div className="stat-value text-lg">43,567.89</div>
            </div>
            <div className="stat">
              <div className="stat-title">24h Change</div>
              <div className="stat-value text-lg text-success">+2.34%</div>
            </div>
            <div className="stat">
              <div className="stat-title">24h Volume</div>
              <div className="stat-value text-lg">1.23B</div>
            </div>
          </div>
        </div>
        <div className="flex-none gap-2">
          <button className="btn btn-ghost btn-circle">
            <Settings />
          </button>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="/api/placeholder/40/40" alt="User" />
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52">
              <li><a>Profile</a></li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Risk Warning Alert */}
      {showRiskWarning && (
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          {/* <AlertDescription>
            Futures trading involves substantial risk. Please trade responsibly and never risk more than you can afford to lose.
          </AlertDescription> */}
          <button 
            className="btn btn-ghost btn-sm ml-auto"
            onClick={() => setShowRiskWarning(false)}
          >
            <X size={16} />
          </button>
        </Alert>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* Left Column - Order Book & Recent Trades */}
        <div className="col-span-2 space-y-4">
          <Card>
            <CardHeader className="p-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Order Book</CardTitle>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-xs">
                    <Sliders size={14} />
                  </label>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52">
                    <li><a>Precision: 0.1</a></li>
                    <li><a>Precision: 0.01</a></li>
                    <li><a>Precision: 0.001</a></li>
                  </ul>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {/* Asks */}
              <div className="space-y-1">
                {orderBook.asks.map((ask, i) => (
                  <div key={i} className="grid grid-cols-3 text-xs">
                    <span className="text-error">{ask.price}</span>
                    <span className="text-right">{ask.size}</span>
                    <span className="text-right opacity-60">{ask.total}</span>
                  </div>
                ))}
              </div>

              {/* Current Price */}
              <div className="text-center py-2 my-2 bg-base-300 rounded-lg">
                <span className="text-lg font-bold">43,567.89</span>
                <span className="text-success text-xs ml-2">+2.34%</span>
              </div>

              {/* Bids */}
              <div className="space-y-1">
                {orderBook.bids.map((bid, i) => (
                  <div key={i} className="grid grid-cols-3 text-xs">
                    <span className="text-success">{bid.price}</span>
                    <span className="text-right">{bid.size}</span>
                    <span className="text-right opacity-60">{bid.total}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Recent Trades</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] overflow-y-auto">
              <div className="space-y-2">
                {Array(10).fill(0).map((_, i) => (
                  <div key={i} className="grid grid-cols-3 text-xs">
                    <span className={i % 2 === 0 ? 'text-success' : 'text-error'}>
                      43,{567 + i}.89
                    </span>
                    <span className="text-right">0.{234 + i}</span>
                    <span className="text-right opacity-60">14:30:2{i}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center Column - Chart & Trading Interface */}
        <div className="col-span-7 space-y-4">
          {/* Trading Chart Card */}
          <Card>
            <CardContent className="p-4">
              <div className="h-[500px] bg-base-300 rounded-lg flex items-center justify-center">
                <span className="text-base-content/60">Advanced Chart Component Here</span>
              </div>
              <div className="flex justify-between mt-4">
                <div className="btn-group">
                  <button className="btn btn-sm">1m</button>
                  <button className="btn btn-sm btn-active">5m</button>
                  <button className="btn btn-sm">15m</button>
                  <button className="btn btn-sm">1h</button>
                  <button className="btn btn-sm">4h</button>
                  <button className="btn btn-sm">1d</button>
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-sm btn-ghost">
                    <BarChart2 size={16} />
                  </button>
                  <button className="btn btn-sm btn-ghost">
                    <Settings size={16} />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trading Interface Card */}
          <Card>
            <CardContent className="p-4">
              {/* Position Type & Margin Mode */}
              <div className="flex justify-between mb-4">
                <div className="tabs tabs-boxed">
                  <a 
                    className={`tab ${positionSide === 'long' ? 'tab-active text-success' : ''}`}
                    onClick={() => setPositionSide('long')}
                  >
                    Long
                  </a>
                  <a 
                    className={`tab ${positionSide === 'short' ? 'tab-active text-error' : ''}`}
                    onClick={() => setPositionSide('short')}
                  >
                    Short
                  </a>
                </div>
                <div className="tabs tabs-boxed">
                  <a 
                    className={`tab ${marginType === 'cross' ? 'tab-active' : ''}`}
                    onClick={() => setMarginType('cross')}
                  >
                    Cross
                  </a>
                  <a 
                    className={`tab ${marginType === 'isolated' ? 'tab-active' : ''}`}
                    onClick={() => setMarginType('isolated')}
                  >
                    Isolated
                  </a>
                </div>
              </div>

              {/* Leverage Selector */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Leverage: {leverage}x</span>
                  <button className="btn btn-xs btn-ghost">
                    Max
                  </button>
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={leverage}
                  onChange={(e) => setLeverage(parseInt(e.target.value))}
                  className="range range-primary"
                  step="1"
                />
                <div className="w-full flex justify-between text-xs px-2 mt-1">
                  <span>1x</span>
                  <span>20x</span>
                  <span>50x</span>
                  <span>100x</span>
                </div>
              </div>

              {/* Order Type Tabs */}
              <Tabs defaultValue="limit" className="mb-4">
                <TabsList className="w-full">
                  <TabsTrigger value="limit" className="flex-1">Limit</TabsTrigger>
                  <TabsTrigger value="market" className="flex-1">Market</TabsTrigger>
                  <TabsTrigger value="stop" className="flex-1">Stop</TabsTrigger>
                  <TabsTrigger value="trailing" className="flex-1">Trailing</TabsTrigger>
                </TabsList>

                {/* Limit Order Form */}
                <TabsContent value="limit">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Price</span>
                        <span className="label-text-alt">USDT</span>
                      </label>
                      <input
                        type="number"
                        placeholder="0.00"
                        className="input input-bordered"
                        value={orderForm.price}
                        onChange={(e) => handleFormChange('price', e.target.value)}
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Size</span>
                        <span className="label-text-alt">BTC</span>
                      </label>
                      <input
                        type="number"
                        placeholder="0.00"
                        className="input input-bordered"
                        value={orderForm.size}
                        onChange={(e) => handleFormChange('size', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Order Cost Calculator */}
                  <div className="grid grid-cols-4 gap-2 mt-4 text-sm">
                    <div>
                      <span className="text-base-content/60">Cost:</span>
                      <span className="ml-2">1,234.56 USDT</span>
                    </div>
                    <div>
                      <span className="text-base-content/60">Margin:</span>
                      <span className="ml-2">61.73 USDT</span>
                    </div>
                    <div>
                      <span className="text-base-content/60">Fees:</span>
                      <span className="ml-2">1.23 USDT</span>
                    </div>
                    <div>
                      <span className="text-base-content/60">Max Size:</span>
                      <span className="ml-2">2.5 BTC</span>
                    </div>
                  </div>

                  {/* Position Size Slider */}
                  <div className="mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Size</span>
                      <div className="flex gap-2">
                        {[25, 50, 75, 100].map((value) => (
                          <button
                            key={value}
                            className="btn btn-xs"
                            onClick={() => setSliderValue(value)}
                          >
                            {value}%
                          </button>
                        ))}
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderValue}
                      onChange={(e) => setSliderValue(parseInt(e.target.value))}
                      className="range range-xs"
                    />
                  </div>

                  {/* TP/SL Settings */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Take Profit</span>
                        <span className="label-text-alt">USDT</span>
                      </label>
                      <input
                        type="number"
                        placeholder="0.00"
                        className="input input-bordered"
                        value={orderForm.takeProfit}
                        onChange={(e) => handleFormChange('takeProfit', e.target.value)}
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Stop Loss</span>
                        <span className="label-text-alt">USDT</span>
                      </label>
                      <input
                        type="number"
                        placeholder="0.00"
                        className="input input-bordered"
                        value={orderForm.stopLoss}
                        onChange={(e) => handleFormChange('stopLoss', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <button 
                      className="btn btn-success btn-lg"
                      onClick={() => console.log('Long position')}
                    >
                      Long
                      <span className="text-xs ml-2">43,567.89</span>
                    </button>
                    <button 
                      className="btn btn-error btn-lg"
                      onClick={() => console.log('Short position')}
                    >
                      Short
                      <span className="text-xs ml-2">43,567.89</span>
                    </button>
                  </div>
                </TabsContent>

                {/* Market Order Form */}
                <TabsContent value="market">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Size</span>
                      <span className="label-text-alt">BTC</span>
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="input input-bordered"
                    />
                  </div>
                  {/* Copy similar structure from limit order form */}
                </TabsContent>

                {/* Stop Order Form */}
                <TabsContent value="stop">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Trigger Price</span>
                        <span className="label-text-alt">USDT</span>
                      </label>
                      <input
                        type="number"
                        placeholder="0.00"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Order Price</span>
                        <span className="label-text-alt">USDT</span>
                      </label>
                      <input
                        type="number"
                        placeholder="0.00"
                        className="input input-bordered"
                      />
                    </div>
                  </div>
                  {/* Copy similar structure from limit order form */}
                </TabsContent>

                {/* Trailing Stop Form */}
                <TabsContent value="trailing">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Callback Rate</span>
                        <span className="label-text-alt">%</span>
                      </label>
                      <input
                        type="number"
                        placeholder="1.0"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Activation Price</span>
                        <span className="label-text-alt">USDT</span>
                      </label>
                      <input
                        type="number"
                        placeholder="0.00"
                        className="input input-bordered"
                      />
                    </div>
                  </div>
                  {/* Copy similar structure from limit order form */}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Positions & Orders */}
        <div className="col-span-3 space-y-4">
          {/* Account Summary Card */}
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Account Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="stats stats-vertical shadow w-full">
                <div className="stat">
                  <div className="stat-title">Total Balance</div>
                  <div className="stat-value text-lg">10,234.56 USDT</div>
                  <div className="stat-desc">↗︎ 2.34% (24h)</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Available Margin</div>
                  <div className="stat-value text-lg">8,765.43 USDT</div>
                  <div className="stat-desc">85.64% of balance</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Used Margin</div>
                  <div className="stat-value text-lg">1,469.13 USDT</div>
                  <div className="stat-desc">14.36% of balance</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Positions Card */}
          <Card>
            <CardHeader className="p-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Active Positions</CardTitle>
                <div className="badge badge-primary">1 Position</div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {activePositions.map((position, index) => (
                <div key={index} className="card bg-base-300 mb-4">
                  <div className="card-body p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="card-title text-sm">
                        {position.symbol}
                        <span className={`badge ${position.side === 'LONG' ? 'badge-success' : 'badge-error'} ml-2`}>
                          {position.side}
                        </span>
                      </h3>
                      <div className="flex gap-2">
                        <button className="btn btn-xs btn-ghost">
                          <Settings size={12} />
                        </button>
                        <button className="btn btn-xs btn-ghost">
                          <X size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-base-content/60">Size:</span>
                        <span>{position.size} BTC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-base-content/60">Leverage:</span>
                        <span>{position.leverage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-base-content/60">Entry Price:</span>
                        <span>{position.entryPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-base-content/60">Mark Price:</span>
                        <span>{position.markPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-base-content/60">PnL:</span>
                        <span className="text-success">{position.pnl}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-base-content/60">ROE:</span>
                        <span className="text-success">{position.roe}</span>
                      </div>
                    </div>
                    <div className="divider my-2"></div>
                    <div className="flex justify-between text-sm">
                      <span className="text-base-content/60">Liq. Price:</span>
                      <span className="text-error">{position.liqPrice}</span>
                    </div>
                  </div>
                </div>
              ))}

              {activePositions.length === 0 && (
                <div className="text-center text-base-content/60 py-8">
                  No active positions
                </div>
              )}
            </CardContent>
          </Card>

          {/* Open Orders Card */}
          <Card>
            <CardHeader className="p-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Open Orders</CardTitle>
                <div className="badge badge-primary">1 Order</div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {openOrders.map((order, index) => (
                <div key={index} className="card bg-base-300 mb-4">
                  <div className="card-body p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="card-title text-sm">
                        {order.symbol}
                        <span className={`badge ${order.side === 'LONG' ? 'badge-success' : 'badge-error'} ml-2`}>
                          {order.side}
                        </span>
                      </h3>
                      <button className="btn btn-xs btn-ghost">
                        <X size={12} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-base-content/60">Type:</span>
                        <span>{order.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-base-content/60">Price:</span>
                        <span>{order.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-base-content/60">Size:</span>
                        <span>{order.size} BTC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-base-content/60">Leverage:</span>
                        <span>{order.leverage}</span>
                      </div>
                    </div>
                    <div className="text-xs text-base-content/60 mt-2">
                      {order.time}
                    </div>
                  </div>
                </div>
              ))}

              {openOrders.length === 0 && (
                <div className="text-center text-base-content/60 py-8">
                  No open orders
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FututreTrading;