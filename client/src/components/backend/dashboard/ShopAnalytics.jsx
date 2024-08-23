import { GoDotFill } from "react-icons/go";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { analytics } from "../../../data/analytics";

const ShopAnalytics = () => {
  return (
    <div className="shop-analytics">
             <div className="shop-header">
                        <h3>Shop Analytics</h3>
                        <div className="analytics-wrap">
                                 <div className="wrap-inner">
                                           <span className="customers"><GoDotFill /></span>
                                           <p>Customers</p>
                                 </div>
                                 <div className="wrap-inner">
                                             <span className="orders"><GoDotFill /></span>
                                             <p>Orders</p>
                                 </div>
                        </div>
             </div>

             <div className="shop-graph">
                    <ResponsiveContainer width="100%" height="100%">
                           <LineChart width={500} height={300} data={analytics} >
                                <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.5} />
                                        <XAxis dataKey="month" stroke="#d3d3d3" axisLine={false} tick={{ fill: '#999', fontSize: 13 }} />
                                       <YAxis  width={26} stroke="#d3d3d3" axisLine={false} tick={{ fill: '#999', fontSize: 11 }} />
                                      <Tooltip    cursor={{ stroke: "#d3d3d3", strokeDasharray: "3 3",
  }} />
                                      {/* <Legend /> */}
                                      <Line type="monotone"  dot={false} dataKey="customers" stroke="#03DFD8" />
                                      <Line type="monotone" dot={false} dataKey="orders" stroke="#F7A103" />
                            </LineChart>
                   </ResponsiveContainer>
             </div>
    </div>
  )
}

export default ShopAnalytics